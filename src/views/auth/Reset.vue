<template>
  <div>
    <div class="text-center auth_title mb-10">
      {{ $tr("auth", "key_18") }}
    </div>
    <div class="d-flex justify-center">
      <v-progress-circular
          indeterminate
          color="smoke"
          width="2"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reset',
  components: {

  },
  data: () => ({

  }),
  methods: {
    startCheck(token) {
      this.$http.get(`${this.$serverApiLink}api/auth/password/${token}`).
      then(
          response => {
            this.$store.commit('setSnackBar', {
              code: 200,
              message: response.data.message
            });
            this.$router.push({name: 'Login'});
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.$router.push({name: 'Login'});
          }
      );
    }
  },
  mounted() {
    this.startCheck(this.$route.query.token);
  }
}
</script>