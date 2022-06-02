<template>
  <div>
    <v-toolbar flat color="white" class="bar_page" height="72">
      <v-btn
          v-if="drawer"
          icon
          color="smoke"
          @click="setDrawer"
      >
        <MenuIcon/>
      </v-btn>
      <v-btn
          v-if="back"
          icon
          color="smoke"
          @click="$router.go(-1)"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
      <v-spacer/>
      <template v-if="preview">
        <v-btn
            icon
            color="smoke"
            @click="setPreview"
        >
          <ChevronRightIcon v-if="$store.state.right_drawer"/>
          <ChevronLeftIcon v-else/>
        </v-btn>
      </template>
      <slot name="actions"></slot>
      <template
          v-if="tabs"
          v-slot:extension
      >
        <v-tabs
            align-with-title
            v-model="tabModel"
            @change="$emit('onChange', tabModel)"
        >
          <v-tabs-slider color="primary"/>
          <v-tab
              v-for="(tab, i) in tabs"
              :key="`${i}_page_tab`"
          >
            {{ tab }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-divider/>
  </div>
</template>

<script>
import MenuIcon from "@/components/icons/MenuIcon";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
export default {
  name: 'PageBar',
  props: {
    title: {
      type: String
    },
    back: {
      type: Boolean,
      default: false
    },
    tabs: {
      type: Array
    },
    drawer: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: true
    },
  },
  components: {
    MenuIcon,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  data: () => ({
    tabModel: 0
  }),
  methods: {
    setDrawer() {
      let value = this.$store.state.left_drawer ? false : true;
      this.$store.commit('setLeftDrawer', value);
    },
    setPreview() {
      let value = this.$store.state.right_drawer ? false : true;
      this.$store.commit('setRightDrawer', value);
    }
  }
}
</script>
