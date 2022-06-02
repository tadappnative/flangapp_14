<template>
  <div class="d-flex justify-center align-center text-center" style="height: calc(100vh - 73px)">
    <div class="d-flex flex-column justify-center align-center">
      <div class="mb-6">
        <v-avatar :class="!isError ? 'primary--text' : 'danger--text'" :size="80" color="rgba(153, 162, 173, 0.10)">
          <slot name="icon"></slot>
        </v-avatar>
      </div>
      <div class="title mb-3">
        {{ title }}
      </div>
      <div class="body-2 smoke--text mb-12" v-html="subtitle"/>
      <div>
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EmptyState',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    isError: {
      type: Boolean
    }
  }
}
</script>
