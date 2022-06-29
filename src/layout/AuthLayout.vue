<template>
  <v-app id="auth" v-if="$store.state.isStarted">
    <img
        :src="logoSvg"
        class="logo_auth"
        alt="Logo"
    />
    <v-main class="d-flex justify-center align-center align-self-center">
      <div style="width: 360px">
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Logo from "../assets/images/logosvg.svg";
export default {
  name: 'AuthLayout',
  components: {

  },
  data: () => ({
    logoSvg: Logo
  }),
  mounted() {

  }
}
</script>