<template>
  <div class="bar_padding">
    <PageBar :title="$tr('admin', 'key_10')" :preview="false"/>
    <v-list nav class="pt-0 pb-0">
      <v-subheader class="font-weight-medium smoke--text">
        {{ $tr('admin', 'key_11') }}
      </v-subheader>
      <v-list-item-group color="rgba(153, 162, 173, 1)">
        <v-list-item
            v-for="(item, index) in items"
            :key="'admin_navigation_'+index"
            :to="{name:item.to}" exact
        >
          <v-list-item-avatar class="null_border_radius" size="22">
            <div class="primary_icon list_icon">
              <FeedIcon v-if="!index" :size="22"/>
              <UsersIcon v-else-if="index === 1" :size="22"/>
              <ServicesIcon v-else-if="index === 2" :size="22"/>
              <MailStackIcon v-else-if="index === 3" :size="22"/>
              <MoneyTransferIcon v-else-if="index === 4" :size="22"/>
              <TagIcon v-else-if="index === 5" :size="22"/>
              <CreditCardIcon v-else-if="index === 6" :size="22"/>
              <GearIcon v-else-if="index === 7" :size="22"/>
            </div>
          </v-list-item-avatar>
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
import FeedIcon from "@/components/icons/FeedIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import ServicesIcon from "@/components/icons/ServicesIcon";
import MailStackIcon from "@/components/icons/MailStackIcon";
import MoneyTransferIcon from "@/components/icons/MoneyTransferIcon";
import TagIcon from "@/components/icons/TagIcon";
import GearIcon from "@/components/icons/GearIcon";
import CreditCardIcon from "@/components/icons/CreditCardIcon";
export default {
  name: 'AdminSidebar',
  components: {
    PageBar,
    FeedIcon,
    UsersIcon,
    ServicesIcon,
    MailStackIcon,
    MoneyTransferIcon,
    TagIcon,
    GearIcon,
    CreditCardIcon
  },
  data: () => ({
    items: [
      {
        name: "key_1",
        to: "Dashboard",
      },
      {
        name: "key_2",
        to: "Customers"
      },
      {
        name: "key_3",
        to: "AdminApps"
      },
      {
        name: "key_4",
        to: "AdminTickets"
      },
      {
        name: "key_8",
        to: "AdminTransactions"
      },
      {
        name: "key_9",
        to: "Plans"
      },
      {
        name: "key_94",
        to: "Methods"
      },
      {
        name: "key_6",
        to: "Settings"
      },
    ],
  }),
  watch: {

  },
  methods: {

  },
}
</script>