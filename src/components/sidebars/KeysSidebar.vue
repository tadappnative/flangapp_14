<template>
  <div class="bar_padding">
    <PageBar :title="$tr('menu', 'key_25')" :preview="false"/>
    <v-list nav class="pt-0 pb-0">
      <v-subheader class="font-weight-medium smoke--text">
        {{ $tr('menu', 'key_33') }}
      </v-subheader>
      <v-list-item-group color="rgba(153, 162, 173, 1)">
        <v-list-item
            v-for="(item, index) in items"
            :key="'profile_navigation_'+index"
            :to="{name:item.to}" exact
        >
          <v-list-item-avatar class="null_border_radius" size="22">
            <div class="ios_icon list_icon" v-if="!index">
              <AppleLogoIcon :size="22"/>
            </div>
            <div class="android_icon list_icon" v-if="index === 1">
              <AndroidLogoIcon :size="22"/>
            </div>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="black--text" v-text="$tr('menu', item.name)"/>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
import AppleLogoIcon from "@/components/icons/AppleLogoIcon";
import AndroidLogoIcon from "@/components/icons/AndroidLogoIcon";
export default {
  name: 'KeysSidebar',
  components: {
    PageBar,
    AppleLogoIcon,
    AndroidLogoIcon
  },
  data: () => ({
    items: [
      {
        name: "key_34",
        to: "Keys",
      },
      {
        name: "key_35",
        to: "KeysAndroid"
      },
    ],
  }),
  watch: {

  },
  methods: {

  },
}
</script>