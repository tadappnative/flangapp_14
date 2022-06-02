<template>
  <div v-on:keyup.enter="signIn">
    <div class="text-center auth_title mb-10">
      {{ $tr("auth", "key_1") }}
    </div>
    <v-text-field
        :label="$tr('auth', 'key_5')"
        outlined
        color="primary"
        type="email"
        v-model="email"
    ></v-text-field>
    <v-text-field
        :label="$tr('auth', 'key_6')"
        outlined
        color="primary"
        :type="!showPassword ? 'password' : 'text'"
        v-model="password"
    >
      <template v-slot:append>
        <v-btn
            icon
            width="40"
            depressed
            height="40"
            color="smoke"
            @click="showPassword = !showPassword"
        >
          <v-icon v-text="!showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"/>
        </v-btn>
      </template>
    </v-text-field>
    <v-btn
        x-large
        depressed
        color="primary"
        block
        :loading="loading"
        @click="signIn"
    >
      {{ $tr("auth", "key_8") }}
    </v-btn>
    <template v-if="$store.state.config.google.enabled">
      <div class="mt-5 mb-5 caption text-uppercase smoke--text text-center">
        {{ $tr("auth", "key_7") }}
      </div>
      <v-btn
          x-large
          depressed
          color="black"
          block
          :light="$store.state.darkMode"
          :dark="!$store.state.darkMode"
          @click="googleIn"
      >
        <img :src="googleLogo" alt="Google" :width="34" class="mr-3"/>
        {{ $tr("auth", "key_20") }}
      </v-btn>
    </template>
    <div class="text-center mt-7 mb-2">
      <router-link to="/auth/forgot">
        {{ $tr("auth", "key_9") }}
      </router-link>
    </div>
    <div class="text-center smoke--text">
      {{ $tr("auth", "key_21") }}
      <router-link to="/auth/sign_up">{{ $tr("auth", "key_3") }}</router-link>
    </div>
  </div>
</template>

<script>
import gLogo from "@/assets/images/google_login.svg"
import Vue from "vue";
import GoogleAuth from "@/config/google_oAuth";
export default {
  name: 'Login',
  components: {

  },
  data: () => ({
    email: "",
    password: "",
    showPassword: false,
    googleLogo: gLogo,
    loading: false
  }),
  methods: {
    signIn() {
      this.loading = true;
      let params = new URLSearchParams();
      params.append('email', this.email );
      params.append('password', this.password );
      this.$http.post(`${this.$serverApiLink}api/auth/sign_in`, params)
        .then(
            response => {
              this.$store.commit('setUser', response.data.user);
              this.loading = false;
              this.$router.push({name: 'Apps'});
            }
        ).catch(
            error => {
              this.$store.commit('setSnackBar', {
                code: !error.response ? 408 : error.response.status,
                message: error.response.data.message
              });
              this.loading = false;
            }
      );
    },
    googleIn() {
      this.$store.commit('setLoading', true);
      this.$gAuth.signIn()
          .then(GoogleUser => {
            this.startGoogleLogin(GoogleUser.getAuthResponse().id_token);
          })
          .catch(error => {
            this.$store.commit('setLoading', false);
            console.log('error', error)
          })
    },
    startGoogleLogin(tokenID) {
      let params = new URLSearchParams();
      params.append('id_token', tokenID );
      this.$http.post(`${this.$serverApiLink}api/auth/google_in`, params)
          .then(
              response => {
                this.$store.commit('setUser', response.data.user);
                this.$store.commit('setLoading', false);
                this.$router.push({name: 'Apps'});
              }
          ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.$store.commit('setLoading', false);
          }
      );
    }
  },
  mounted() {
    console.log(this.$store.state.config.google.id);
    const gauthOption = {
      clientId: this.$store.state.config.google.id,
      scope: 'profile email',
      prompt: 'select_account'
    }
    Vue.use(GoogleAuth, gauthOption);
  },
}
</script>