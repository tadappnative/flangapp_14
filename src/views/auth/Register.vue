<template>
  <div v-on:keyup.enter="signUp">
    <div class="text-center auth_title mb-10">
      {{ $tr("auth", "key_3") }}
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
    <v-text-field
        :label="$tr('auth', 'key_10')"
        outlined
        color="primary"
        :type="!showRePassword ? 'password' : 'text'"
        v-model="rePassword"
    >
      <template v-slot:append>
        <v-btn
            icon
            width="40"
            depressed
            height="40"
            color="smoke"
            @click="showRePassword = !showRePassword"
        >
          <v-icon v-text="!showRePassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"/>
        </v-btn>
      </template>
    </v-text-field>
    <v-btn
        x-large
        depressed
        color="primary"
        block
        :loading="loading"
        @click="signUp"
    >
      {{ $tr("auth", "key_15") }}
    </v-btn>
    <div class="caption text-center smoke--text mt-7 mb-7">
      {{ $tr("auth", "key_11") }}
    </div>
    <div class="text-center">
      <router-link to="/">
        {{ $tr("auth", "key_16") }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  components: {

  },
  data: () => ({
    email: "",
    password: "",
    rePassword: "",
    showPassword: false,
    showRePassword: false,
    loading: false
  }),
  methods: {
    signUp() {
      this.loading = true;
      let params = new URLSearchParams();
      params.append('email', this.email );
      params.append('password', this.password );
      params.append('re_password', this.rePassword );
      this.$http.post(`${this.$serverApiLink}api/auth/sign_up`, params)
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
    }
  },
  mounted() {

  }
}
</script>