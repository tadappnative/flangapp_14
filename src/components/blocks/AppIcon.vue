<template>
  <div
      v-if="image"
      class="app_icon"
      :style="`background-image: url('${image}'); width: ${size}px; height: ${size}px;`">

  </div>
  <div
      v-else
      :class="`app_icon d-flex justify-center align-center`"
      :style="`background: #fafafa;`">
    <RowIcon :size="size"/>
  </div>
</template>

<script>
import RowIcon from "@/components/icons/RowIcon";
import {config} from "@/config/config";

export default {
  name: 'AppIcon',
  props: {
    image: {
      type: String,
      required: false,
      default: ""
    },
    size: {
      type: Number,
      required: false,
      default: 80
    },
  },
  components: {
    RowIcon
  },
  data: () => ({
    config: config,
  })
}
</script>
