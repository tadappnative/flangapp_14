<template>
  <div
      class="footer_app"
      v-bind:style="{ right: full_width
        ? '0px'
        : $store.state.right_drawer ? '334px'
        : '0px', left: !$store.state.left_drawer ? '0' : '340px' }"
  >
    <v-divider/>
    <div
        class="d-flex justify-space-between align-center fill-height"
    >
      <div class="d-flex justify-space-between align-center justify-center" style="margin-left: 18px">
        <template v-if="success_alert">
          <v-icon
              color="success"
              class="mr-3"
          >
            mdi-check-circle
          </v-icon>
          <div class="body-2">
            {{ $tr('project', 'key_34') }}
          </div>
        </template>
      </div>
      <v-btn
          v-if="!hide_action"
          depressed
          color="primary"
          height="40"
          :loading="loading"
          :min-width="100"
          style="margin-right: 18px"
          @click="$emit('click')"
      >
        {{ !title ? $tr('project', 'key_33') : title }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    title: {
      type: String,
      required: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    hide_action: {
      type: Boolean
    },
    full_width: {
      type: Boolean
    },

  },
  data: () => ({
    success_alert: false
  }),
  methods: {
    showSuccessAlert() {
      this.success_alert = true;
      setTimeout(() => this.success_alert = false, 3000);
    }
  }
}
</script>
