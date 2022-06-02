<template>
  <div class="bar_padding">
    <PageBar :title="$tr('menu', 'key_4')" :preview="false"/>
    <v-list nav class="pt-0 pb-0">
      <v-subheader class="font-weight-medium smoke--text">
        {{ $tr('menu', 'key_29') }}
      </v-subheader>
      <v-list-item-group color="rgba(153, 162, 173, 1)">
        <v-list-item
            v-for="(item, index) in items"
            :key="'support_navigation_'+index"
            :to="{name:item.to}" exact
        >
          <v-list-item-avatar class="null_border_radius" size="22">
            <div class="primary_icon list_icon">
              <InboxIcon v-if="!index" :size="22"/>
              <ArchiveIcon v-if="index === 1" :size="22"/>
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
import InboxIcon from "@/components/icons/InboxIcon";
import ArchiveIcon from "@/components/icons/ArchiveIcon";
export default {
  name: 'SupportSidebar',
  components: {
    PageBar,
    InboxIcon,
    ArchiveIcon
  },
  data: () => ({
    items: [
      {
        name: "key_27",
        to: "Support",
      },
      {
        name: "key_28",
        to: "Archive"
      },
    ],
  }),
  watch: {

  },
  methods: {

  },
}
</script>