<template>
  <div>
    <v-navigation-drawer
        absolute
        width="66"
        style="padding-top: 8px; padding-bottom: 8px;"
        v-model="$store.state.left_drawer"
        hide-overlay
    >
      <div class="d-flex justify-center align-center flex-column mb-5">
        <img
            :src="$store.state.config.logo"
            height="34"
            alt="Logo"
            class="margin_menu"
        />
      </div>
      <div class="d-flex justify-center align-center flex-column">
        <v-tooltip
            right
            color="blue_dark"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                large
                exact
                color="success"
                v-bind="attrs"
                v-on="on"
                class="mb-5 margin_menu"
                @click="$emit('open_launcher')"
            >
              <AddIcon/>
            </v-btn>
          </template>
          <span>{{ $tr("menu", "key_31") }}</span>
        </v-tooltip>
        <div
            v-for="(item, index) in items"
            :key="'app_navigation_'+index"
        >
          <v-tooltip
              v-if="index !== 4"
              right
              color="blue_dark"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon
                  large
                  v-bind="attrs"
                  v-on="on"
                  class="mb-5 margin_menu"
                  :to="{name: item.to}"
              >
                <AppsIcon v-if="index === 0"/>
                <SendIcon v-else-if="index === 1"/>
                <KeySquareIcon v-else-if="index === 2"/>
                <MessagesIcon v-else-if="index === 3"/>
              </v-btn>
            </template>
            <span>{{ $tr("menu", item.name) }}</span>
          </v-tooltip>
          <v-tooltip
              v-if="index === 4 && $store.state.user.admin"
              right
              color="blue_dark"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon
                  large
                  v-bind="attrs"
                  v-on="on"
                  class="mb-5 margin_menu"
                  :to="{name: item.to}"
              >
                <DashboardIcon/>
              </v-btn>
            </template>
            <span>{{ $tr("menu", item.name) }}</span>
          </v-tooltip>
        </div>
      </div>
      <template v-slot:append>
        <div class="d-flex justify-center align-center flex-column" style="padding-bottom: 8px">
          <v-tooltip right color="blue_dark">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon
                  large
                  exact
                  v-bind="attrs"
                  v-on="on"
                  class="mb-6 margin_menu"
                  @click="toggleTheme"
              >
                <MoonIcon v-if="!$store.state.darkMode"/>
                <SunIcon v-else/>
              </v-btn>
            </template>
            <span v-text="!$store.state.darkMode ? $tr('menu', 'key_7') : $tr('menu', 'key_6')"/>
          </v-tooltip>
          <v-avatar
              color="smoke"
              :size="37"
              class="white--text"
              style="cursor: pointer"
              @click="$router.push({name: 'Profile'})"
          >
            <div style="padding-top: 2px">
              <UserIcon :size="22"/>
            </div>
          </v-avatar>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import AppsIcon from "@/components/icons/AppsIcon";
import SendIcon from "@/components/icons/SendIcon";
import KeySquareIcon from "@/components/icons/KeySquareIcon";
import MessagesIcon from "@/components/icons/MessagesIcon";
import AddIcon from "@/components/icons/AddIcon";
import SunIcon from "@/components/icons/SunIcon";
import MoonIcon from "@/components/icons/MoonIcon";
import UserIcon from "@/components/icons/UserIcon";
import DashboardIcon from "@/components/icons/DashboardIcon";
export default {
  name: 'AppSidebar',
  components: {
    AppsIcon,
    SendIcon,
    KeySquareIcon,
    MessagesIcon,
    AddIcon,
    MoonIcon,
    SunIcon,
    UserIcon,
    DashboardIcon
  },
  data: () => ({
    items: [
      {
        name: "key_1",
        to: "Apps",
      },
      {
        name: "key_2",
        to: "Newsletter"
      },
      {
        name: "key_25",
        to: "Keys"
      },
      {
        name: "key_4",
        to: "Support"
      },
      {
        name: "key_9",
        to: "Dashboard"
      },
    ],
    loading: false,
    wizard: false
  }),
  watch: {

  },
  methods: {
    toggleTheme() {
      this.$store.commit('setDarkMode', !this.$vuetify.theme.dark);
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    openWizard(index) {
      if (!index) {
        this.$emit('open_launcher');
      }
    }
  },
  beforeMount() {

  }
}
</script>