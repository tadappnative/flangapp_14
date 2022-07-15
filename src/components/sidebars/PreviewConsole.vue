<template>
  <div>
    <v-divider/>
    <div class="pa-2 text-center">
      <v-btn x-small text class="mr-2" :disabled="$store.state.runPreview" :loading="loading_1" @click="makeScreenshot">
        <v-icon size="12" left>mdi-camera</v-icon>
        {{ $tr("project", "key_336") }}
      </v-btn>
      <v-btn x-small text :disabled="$store.state.runPreview" :loading="loading_2" @click="makeReload">
        <v-icon size="12" left>mdi-refresh-circle</v-icon>
        {{ $tr("project", "key_337") }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewConsole',
  components: {

  },
  props: {

  },
  data: () => ({
    loading_1: false,
    loading_2: false
  }),
  methods: {
    makeScreenshot() {
      this.loading_1 = true;
      this.$emit("make_screenshot");
      setTimeout(() => this.loading_1 = false, 3000);
    },
    makeReload() {
      this.loading_2 = true;
      this.$emit("make_reload");
      setTimeout(() => this.loading_2 = false, 3000);
    }
  },
  mounted() {

  }
}
</script>