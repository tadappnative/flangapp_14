<template>
  <v-app id="private">
    <v-navigation-drawer
        app
        :width="!sidebar ? 66 : 340"
        v-model="$store.state.left_drawer"
    >
      <AppSidebar @open_launcher="launcher = true"/>
      <template v-if="sidebar === 'profile'">
        <ProfileSidebar/>
      </template>
      <template v-if="sidebar === 'keys'">
        <KeysSidebar/>
      </template>
      <template v-if="sidebar === 'support'">
        <SupportSidebar/>
      </template>
      <template v-if="sidebar === 'newsletter'">
        <NewsletterSidebar/>
      </template>
      <template v-if="sidebar === 'admin'">
        <AdminSidebar/>
      </template>
      <template v-if="sidebar === 'builder'">
        <BuilderSidebar
            :name="app.name"
            :link="app.link"
            :image="app.icon"
            @onStart="loading = true"
            @onLoad="onLoad"
        />
      </template>
      <template v-slot:append>
        <template v-if="sidebar === 'profile'">
          <LogoutButton/>
        </template>
        <template v-if="sidebar === 'builder'">
          <Balance :balance="balance.value" :loading="loading" @open_deposit="deposit = true"/>
        </template>
      </template>
    </v-navigation-drawer>
    <v-navigation-drawer
        v-if="sidebar === 'builder'"
        clipped
        app
        width="334"
        right
        style="overflow: hidden auto"
        v-model="$store.state.right_drawer"
    >
      <Preview ref="refPreview" :uid="app.uid"/>
      <template v-slot:append>
        <DevicesList v-if="$store.state.isQrPreview"/>
        <PreviewConsole
            v-else
            @make_screenshot="previewMakeScreenshot"
            @make_reload="previewReloadApp"
        />
      </template>
    </v-navigation-drawer>
    <v-navigation-drawer
        v-if="actionbar !== undefined"
        clipped
        app
        width="334"
        right
        v-model="$store.state.right_drawer"
    >
      <template v-if="actionbar === 'support'">
        <SupportActionbar/>
      </template>
      <template v-if="actionbar === 'builder'">
        <BuilderAdminSidebar
            :name="app.name"
            :link="app.link"
            :image="app.icon"
            :balance="app.balance"
            @onStart="loading = true"
            @onLoad="onLoad"
            @updateBalance="updateBuilds"
        />
      </template>
      <template v-if="actionbar === 'customer'">
        <CustomerSidebar/>
      </template>
    </v-navigation-drawer>
    <router-view
        v-on:open_launcher="launcher = true"
        v-on:root_update_name="update_name"
        v-on:root_update_link="update_link"
        v-on:root_update_icon="update_icon"
        v-on:open_deposit="deposit = true"
        v-on:reload_preview="reloadPreview"
        :balance="balance.value"
        :user_id="app.user_id"
    />
    <v-dialog
        fullscreen
        scrollable
        persistent
        v-model="launcher"
    >
      <AppWizard @close="launcher = false"/>
    </v-dialog>
    <v-dialog
        fullscreen
        scrollable
        persistent
        v-model="deposit"
    >
      <Deposit :app="app" @close="deposit = false" @add="addBuild"/>
    </v-dialog>
  </v-app>
</template>

<script>
import AppSidebar from "@/components/sidebars/AppSidebar";
import ProfileSidebar from "@/components/sidebars/ProfileSidebar";
import KeysSidebar from "@/components/sidebars/KeysSidebar";
import SupportSidebar from "@/components/sidebars/SupportSidebar";
import NewsletterSidebar from "@/components/sidebars/NewsletterSidebar";
import LogoutButton from "@/components/sidebars/LogoutButton";
import AppWizard from "@/components/modals/AppWizard";
import BuilderSidebar from "@/components/sidebars/BuilderSidebar";
import Balance from "@/components/sidebars/Balance";
import AdminSidebar from "@/components/sidebars/AdminSidebar";
import SupportActionbar from "@/components/sidebars/SupportActionbar";
import BuilderAdminSidebar from "@/components/sidebars/BuilderAdminSidebar";
import CustomerSidebar from "@/components/sidebars/CustomerSidebar";
import Deposit from "@/components/modals/Deposit";
import Preview from "@/components/sidebars/Preview";
import DevicesList from "@/components/sidebars/DevicesList";
import { UpdateSnack } from "@/snack/build";
import PreviewConsole from "@/components/sidebars/PreviewConsole";

export default {
  name: 'PrivateLayout',
  components: {
    SupportSidebar,
    AppSidebar,
    ProfileSidebar,
    KeysSidebar,
    LogoutButton,
    AppWizard,
    NewsletterSidebar,
    BuilderSidebar,
    Balance,
    AdminSidebar,
    SupportActionbar,
    BuilderAdminSidebar,
    CustomerSidebar,
    Deposit,
    Preview,
    DevicesList,
    PreviewConsole
  },
  data: () => ({
    sidebar: null,
    actionbar: undefined,
    actions: null,
    launcher: false,
    deposit: false,
    balance: {
      loading: true,
      value: 0,
    },
    app: {
      name: "",
      link: "",
      balance: 0,
      icon: null,
      uid: undefined,
      user_id: 0
    },
    loading: true,
  }),
  watch: {
    '$route.meta': function() {
      this.sidebarChecking();
    },
  },
  methods: {
    previewMakeScreenshot() {
      this.$refs.refPreview.getScreenshot();
    },
    previewReloadApp() {
      this.$refs.refPreview.getRestart();
    },
    reloadPreview(object) {
      UpdateSnack(object.uid, object.mode)
    },
    sidebarChecking() {
      if (Object.keys(this.$route.meta).length) {
        this.sidebar = this.$route.meta["sidebar"];
        this.actionbar = this.$route.meta["actionbar"];
      } else {
        this.actionbar = this.$route.meta["actionbar"];
        this.sidebar = null;
      }
    },
    addBuild(count) {
      this.balance.value = this.balance.value + count;
    },
    updateBuilds(count) {
      this.app.balance = count;
    },
    onLoad(app) {
      this.app = app;
      this.balance = {
        loading: false,
        value: app.balance,
      }
      this.loading = false;
    },
    update_name(value) {
      this.app.name = value;
    },
    update_icon(value) {
      this.app.icon = value;
    },
    update_link(value) {
      this.app.link = value;
    },
  },
  beforeMount() {
    this.sidebarChecking();
  },
  mounted() {

  }
}
</script>