import Vue from 'vue';
import Vuex from 'vuex';
import Router from '../router';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isStarted: false,
    language: {
      values: [],
      list: []
    },
    admin_language: {
      list: [],
      status: false
    },
    header: null,
    config: {
      logo: "",
      google: {
        enabled: false,
        id: ""
      },
      stripe_key: "",
      ionic_icons: "",
      qr_preview: false
    },
    user: {
      email: '',
      login: false,
      token: {
        access: '',
        refresh: ''
      },
      admin: false
    },
    loading: false,
    snackbar: {
      status: false,
      message: []
    },
    darkMode: false,
    left_drawer: true,
    right_drawer: true,
    current_balance: 0,
    preview_agree: false,
    previewDevices: [],
    isQrPreview: false,
    runPreview: true
  },
  mutations: {
    setAuthTokens(state, value) {
      state.user.token = value;
    },
    setPreviewAgree(state, value) {
      state.preview_agree = value;
    },
    setCurrentBalance(state, value) {
      state.current_balance = value;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setUser(state, value) {
      state.user = value;
    },
    setEmail(state, value) {
      state.user.email = value;
    },
    setLanguage(state, value) {
      state.language = value;
    },
    setAdminLanguage(state, value) {
      state.admin_language.list = value;
      state.admin_language.status = true;
    },
    setLanguageHeader(state, value) {
      state.header = value;
    },
    setInitialStatus(state, status) {
      state.isStarted = status;
    },
    setConfig(state, value) {
      state.config = value;
    },
    setLogo(state, value) {
      state.config.logo = value;
    },
    setDarkMode(state, status) {
      state.darkMode = status;
    },
    setSnackBar(state, data) {
      let message
      if (data.code === 500) {
        message = ["Server is not available!"];
      } else if (data.code === 408) {
        message = ["No internet connection!"];
      } else {
        message = data.message;
      }
      state.snackbar = {
        status: true,
        message: message
      }
    },
    closeSnackBar(state) {
      state.snackbar.status = false;
    },
    setLeftDrawer(state, value) {
      state.left_drawer = value;
    },
    setRightDrawer(state, value) {
      state.right_drawer = value;
    },
    setPreviewDevices(state, value) {
      state.previewDevices = value;
    },
    setQrPreview(state, value) {
      state.isQrPreview = value;
    },
    pushPreviewDevices(state, value) {
      let check = state.previewDevices.find(device => device.id === value.id);
      if (!check) {
        state.previewDevices.push(value);
        let audio = new Audio(require('../assets/audio/connect.mp3'));
        audio.play();
      }
    },
    setRunPreview(state, value) {
      state.runPreview = value;
    },
  },
  actions: {
    logout({ commit }) {
      commit('setUser', {
        email: '',
        login: false,
        token: {
          access: '',
          refresh: ''
        },
        admin: false
      });
      Router.push({name: 'Login'});
    },
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      paths: ['darkMode', 'header', 'user', 'preview_agree']
    })
  ]
})
