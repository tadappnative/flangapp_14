<template>
  <div>
    <PageBar :title="$tr('admin', 'key_62')" :preview="false"/>
    <v-list nav class="pt-0 pb-0">
      <v-subheader class="font-weight-medium smoke--text">
        {{ $tr('admin', 'key_63') }}
      </v-subheader>
      <v-list-item-group color="rgba(153, 162, 173, 1)">
        <v-list-item
            v-for="(item, index) in items"
            :key="'support_admin_navigation_'+index"
            :to="{name:item.to}"
            exact
        >
          <v-list-item-avatar :color="item.color" size="12"/>
          <v-list-item-content>
            <v-list-item-title class="black--text" v-text="$tr('admin', item.name)"/>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
export default {
  name: 'SupportActionbar',
  components: {
    PageBar,
  },
  data: () => ({
    items: [
      {
        name: "key_57",
        to: "AdminTickets",
        color: "warning"
      },
      {
        name: "key_58",
        to: "PendingTickets",
        color: "smoke"
      },
      {
        name: "key_59",
        to: "ArchiveTickets",
        color: "success"
      },
    ],
  }),
  watch: {

  },
  methods: {

  },
}
</script>