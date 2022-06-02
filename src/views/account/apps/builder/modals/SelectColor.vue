<template>
  <v-card flat tile>
    <v-toolbar
        flat
        class="modal_bar"
    >
      <v-toolbar-title>
        {{ $tr('project', 'key_293') }}
      </v-toolbar-title>
      <v-spacer/>
      <v-btn
          icon
          @click="$emit('close')"
      >
        <CancelIcon/>
      </v-btn>
    </v-toolbar>
    <v-divider/>
    <v-container fluid class="pa-0">
      <v-color-picker
          flat
          dot-size="20"
          swatches-max-height="500px"
          width="500px"
          mode="hexa"
          hide-mode-switch
          v-model="hexa"
      ></v-color-picker>
    </v-container>
    <v-divider/>
    <v-container fluid class="text-right modal_background">
      <v-btn depressed @click="$emit('close')">
        {{ $tr('project', 'key_145') }}
      </v-btn>
      <v-btn :min-width="100" depressed color="primary" class="ml-3" @click="$emit('save', hexa)">
        {{ $tr('project', 'key_173') }}
      </v-btn>
    </v-container>
  </v-card>
</template>

<script>
import CancelIcon from "@/components/icons/CancelIcon";

export default {
  name: 'SelectColor',
  components: {
    CancelIcon
  },
  props: {
    color: {
      type: String,
      required: true
    }
  },
  data: () => ({
    hexa: "#ffffff"
  }),
  methods: {

  },
  beforeMount() {
    this.hexa = this.color;
  }
}
</script>