<template>
  <v-card flat tile>
    <v-card-title class="pa-0">
      <v-toolbar
          flat
          class="modal_bar"
      >
        <v-toolbar-title>
          {{ $tr('project', 'key_287') }}
        </v-toolbar-title>
        <v-spacer/>
        <v-btn
            icon
            @click="$emit('close')"
        >
          <CancelIcon/>
        </v-btn>
      </v-toolbar>
    </v-card-title>
    <v-divider/>
    <v-card-text class="pa-0">
      <v-container fluid>
        <v-row>
          <v-col
              v-for="(item, i) in colors"
              :key="`${i}_led_color`"
              cols="4"
              md="4"
              sm="4"
              class="text-center"
          >
            <v-avatar
                :color="item"
                size="80"
                style="cursor: pointer"
                @click="setColor(item)"
            >
              <DoneIcon
                  v-if="selected === item"
                  :style="`color: ${item === '#f5f5f5' ? '#000000' : '#ffffff'}; width: 24px; height: 24px`" :size="24"
              />
            </v-avatar>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import CancelIcon from "@/components/icons/CancelIcon";
import DoneIcon from "@/components/icons/DoneIcon";
export default {
  name: 'LedModal',
  components: {
    CancelIcon,
    DoneIcon
  },
  props: {
    color: {
      type: String,
      required: true
    }
  },
  data: () => ({
    selected: "#2D9CDB",
    colors: [
      "#f5f5f5",
      "#2D9CDB",
      "#9B51E0",
      "#27AE60",
      "#F2C94C",
      "#EB5757",
    ]
  }),
  methods: {
    setColor(value) {
      this.selected = value;
      this.$emit("select", value);
    }
  },
  mounted() {
    this.selected = this.color;
  }
}
</script>