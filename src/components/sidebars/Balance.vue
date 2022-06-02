<template>
  <div class="bar_padding">
    <v-divider/>
    <v-list-item
        style="padding-top: 7px; padding-bottom: 8px;"
        @click="$emit('open_deposit')"
    >
      <v-list-item-avatar>
        <v-progress-circular
            v-if="loading"
            :width="2"
            :size="37"
            color="smoke"
            indeterminate
        />
        <v-progress-circular
            v-else
            :width="2"
            :size="37"
            :color="balance > 0 ? 'success' : 'orange'"
            :value="100"
        >
          {{ balance }}
        </v-progress-circular>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="font-weight-medium">
          {{ $tr('menu', 'key_20') }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'Balance',
  components: {

  },
  props: {
    balance: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({

  }),
  methods: {

  },
  mounted() {

  }
}
</script>