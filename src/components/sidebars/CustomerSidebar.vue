<template>
  <div>
    <PageBar :title="`${$tr('admin', 'key_70')}: ${$route.params.id}`" :preview="false"/>
    <v-list nav class="pt-0 pb-0">
      <v-subheader class="font-weight-medium smoke--text">
        {{ $tr('admin', 'key_71') }}
      </v-subheader>
      <v-list-item-group color="rgba(153, 162, 173, 1)">
        <v-list-item
            v-for="(item, index) in items"
            :key="'customer_admin_navigation_'+index"
            :to="{name:item.to}"
            exact
        >
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
  name: 'CustomerSidebar',
  components: {
    PageBar,
  },
  data: () => ({
    items: [
      {
        name: "key_72",
        to: "CustomerProfile"
      },
      {
        name: "key_3",
        to: "CustomerApps"
      },
      {
        name: "key_8",
        to: "CustomerTransactions"
      },
      {
        name: "key_77",
        to: "CustomerKey"
      },
      {
        name: "key_76",
        to: "CustomerKeyAndroid"
      },
      {
        name: "key_4",
        to: "CustomerTickets"
      },
    ],
  }),
  watch: {

  },
  methods: {

  },
}
</script>