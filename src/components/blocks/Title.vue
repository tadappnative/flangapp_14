<template>
  <div class="font-weight-bold caption black--text mb-5 mt-2">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'Title',
  components: {

  },
  props: {
    title: {
      type: String,
      required: false
    },
  },
  data: () => ({

  }),
  methods: {

  },
}
</script>