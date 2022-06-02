import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import style from "./assets/css/app.css";
import axios from "axios";
import {getLocalValue} from "@/utils/local";
import {config} from "@/config/config";
import createAuthRefreshInterceptor from "axios-auth-refresh";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$tr = getLocalValue;
Vue.prototype.$serverApiLink = config.serverUrl;
Vue.config.ignoredElements = [/^ion-/];

function getAccessToken() {
  return store.state.user.token.access
}

function logout() {
  store.dispatch('logout').then(r => console.log('logout dispatch from Main. ' +r ));
  router.push({name: 'Login'}).then(r => console.log('logout access error from Main. ' +r));
}

function badRefreshToken(error) {
  console.log('Bad refresh JWT tokens' + error);
  logout()
}

const refreshAuthLogic = failedRequest =>
    axios.post(Vue.prototype.$serverApiLink + 'api/auth/refresh', {}, {headers: {Refresh: store.state.user.token.refresh}}).then(tokenRefreshResponse => {
      store.commit('setAuthTokens', tokenRefreshResponse.data.token);
      failedRequest.response.config.headers['Authorization'] = tokenRefreshResponse.data.token.access;
      return Promise.resolve();
    }).catch(error => {
      console.log(store.state.user.token.refresh)
      badRefreshToken(error);
      return Promise.reject('BAD REFRESH AUTH TOKEN');
    });

createAuthRefreshInterceptor(Vue.prototype.$http, refreshAuthLogic);

axios.interceptors.request.use(request => {
  request.headers['Authorization'] = getAccessToken();
  if (store.state.header) {
    request.headers['Accept-Language'] = store.state.header;
  }
  return request;
});

new Vue({
  router,
  store,
  vuetify,
  style,
  render: h => h(App)
}).$mount('#app')
