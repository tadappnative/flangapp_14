<template>
  <div class="bar_padding">
    <div class="pa-3" style="padding-bottom: 17px!important;">
      <v-btn
          block
          depressed
          class="danger_btn"
          large
          @click="logout"
      >
        {{ $tr("menu", "key_5") }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoutButton',
  components: {

  },
  data: () => ({

  }),
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  },
}
</script>