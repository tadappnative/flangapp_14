<template>
  <v-app>
    <v-overlay
        absolute
        :value="$store.state.loading"
        color="blue_dark"
        opacity="0.8"
        z-index="300"
    >
      <v-progress-circular
          indeterminate
          color="white"
          width="3"
      ></v-progress-circular>
    </v-overlay>
    <v-overlay
        absolute
        :value="!$store.state.isStarted"
        color="white"
        opacity="1"
        z-index="20"
    >
      <v-progress-circular
          indeterminate
          color="primary"
          width="3"
      ></v-progress-circular>
    </v-overlay>
    <template v-if="$store.state.isStarted">
      <router-view/>
    </template>
    <v-snackbar
        v-model="$store.state.snackbar.status"
    >
      <span v-for="(item, index) in $store.state.snackbar.message" :key="'error_' + index">
        {{ item }}<br/>
      </span>
      <template v-slot:action="{ attrs }">
        <v-btn
            color="#ffffff"
            plain
            v-bind="attrs"
            @click="$store.commit('closeSnackBar')"
        >
          OK
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {

  },
  beforeMount() {
    if (this.$store.state.darkMode) {
      this.$vuetify.theme.dark = true;
    }
  }
};
</script>
