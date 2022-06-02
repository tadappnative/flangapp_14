<template>
  <div class="d-flex justify-start align-center">
    <v-avatar
      :size="30"
      color="snow"
      class="mr-3"
    >
      <div
          class="smoke--text"
          style="width: 16px; height: 16px"
      >
        <LinkMiniIcon :size="16"/>
      </div>
    </v-avatar>
    <div class="body-2">
      {{ $tr('project', 'key_63') }}
    </div>
  </div>
</template>

<script>
import LinkMiniIcon from "@/components/icons/LinkMiniIcon";
export default {
  name: 'EmptyList',
  components: {
    LinkMiniIcon
  },
  methods: {

  }
}
</script>
