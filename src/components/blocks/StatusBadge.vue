<template>
  <div class="d-flex justify-start align-center">
    <div :class="status ? 'success--text' : 'orange--text'"  style="margin-right: 12px">
      <CheckCircleIcon :size="12" v-if="status"/>
      <ClockIcon :size="12" v-else/>
    </div>
    <div class="caption smoke--text" v-text="status ? $tr('project', 'key_19') : $tr('project', 'key_25')"/>
  </div>
</template>

<script>
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import ClockIcon from "@/components/icons/ClockIcon";
export default {
  name: 'StatusBadge',
  props: {
    status: {
      type: Boolean,
      required: true
    },
  },
  components: {
    CheckCircleIcon,
    ClockIcon
  },
  methods: {

  }
}
</script>
