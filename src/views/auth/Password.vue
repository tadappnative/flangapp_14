<template>
  <div>
    <div class="text-center auth_title mb-10">
      {{ $tr("auth", "key_4") }}
    </div>
    <v-text-field
        :label="$tr('auth', 'key_5')"
        outlined
        color="primary"
        type="email"
        v-model="email"
    ></v-text-field>
    <v-btn
        x-large
        depressed
        color="primary"
        block
        :loading="loading"
        @click="reset"
    >
      {{ $tr("auth", "key_22") }}
    </v-btn>
    <div class="text-center mt-7 mb-2">
      <router-link to="/">
        {{ $tr("auth", "key_16") }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Password',
  components: {

  },
  data: () => ({
    email: "",
    loading: false
  }),
  methods: {
    reset() {
      this.loading = true;
      let params = new URLSearchParams();
      params.append('email', this.email );
      this.$http.post(`${this.$serverApiLink}api/auth/reset`, params).
      then(
          response => {
            this.$store.commit('setSnackBar', {
              code: 200,
              message: response.data.message
            });
            this.$router.push({name: 'Login'});
            this.loading = false;
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