<template>
  <div>
    <div>
      <v-toolbar flat color="white" class="bar_page" height="72">
        <div class="d-flex justify-start align-center">
          <div style="margin-right: 16px;">
            <AppIcon :image="loading ? null : image" :size="34"/>
          </div>
          <div>
            <template v-if="loading">
              <div style="padding-top: 6px">
                <v-skeleton-loader
                    v-if="loading"
                    type="text"
                    width="100"
                ></v-skeleton-loader>
                <v-skeleton-loader
                    v-if="loading"
                    type="text"
                    width="180"
                ></v-skeleton-loader>
              </div>
            </template>
            <template v-else>
              <div class="font-weight-bold text-truncate" style="max-width: 180px;">
                {{ name }}
              </div>
              <div class="caption smoke--text text-truncate" style="max-width: 180px;">
                {{ link }}
              </div>
            </template>
          </div>
        </div>
      </v-toolbar>
      <v-divider/>
    </div>
    <v-list nav class="pt-0 pb-0">
      <v-subheader class="font-weight-medium smoke--text">
        {{ $tr('menu', 'key_16') }}
      </v-subheader>
      <v-list-item-group color="rgba(153, 162, 173, 1)">
        <v-list-item
            v-for="(item, index) in items"
            :key="'profile_navigation_'+index"
            :to="{name:item.to}"
            exact
        >
          <v-list-item-avatar class="null_border_radius" size="22">
            <div class="smoke_icon list_icon">
              <HomeIcon v-if="index === 0" :size="22"/>
              <PaletteIcon v-else-if="index === 1" :size="22"/>
              <CompassIcon v-else-if="index === 2" :size="22"/>
              <GlobeIcon v-else-if="index === 3" :size="22"/>
              <ImageIcon v-else-if="index === 4" :size="22"/>
              <PushIcon v-else-if="index === 5" :size="22"/>
              <CheckDeviceIcon v-else-if="index === 6" :size="22"/>
              <ReceiveWallet v-else-if="index === 7" :size="22"/>
            </div>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="black--text" v-text="$tr('menu', item.name)"/>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item
          v-for="(item, index) in modal_menu"
          :key="'profile_navigation_'+index"
          style="margin-top: 8px"
          @click="openActionModal(index)"
      >
        <v-list-item-avatar class="null_border_radius" size="22">
          <div class="smoke_icon list_icon">
            <ReceiveWallet v-if="index === 0" :size="22"/>
            <DeleteIcon v-else-if="index === 1" :size="22"/>
          </div>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="black--text" v-text="$tr('menu', item.name)"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog
        v-model="modalBalance.status"
        width="560"
    >
      <v-card flat tile>
        <v-card-title class="pa-0">
          <v-toolbar
              flat
              class="modal_bar"
          >
            <v-toolbar-title>
              {{ $tr("admin", "key_107") }}
            </v-toolbar-title>
            <v-spacer/>
            <v-btn
                icon
                @click="modalBalance.status = false"
            >
              <CancelIcon/>
            </v-btn>
          </v-toolbar>
        </v-card-title>
        <v-divider/>
        <v-container fluid>
          <v-row>
            <v-col md="12" sm="12" cols="12" class="pb-0">
              <v-text-field
                  :label="$tr('admin', 'key_106')"
                  outlined
                  color="primary"
                  dense
                  autofocus
                  v-model.number="modalBalance.value"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-divider/>
        <v-container fluid class="text-right">
          <v-btn depressed color="primary" @click="updateBalance">
            {{ $tr('project', 'key_33') }}
          </v-btn>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="modalDelete"
        width="560"
    >
      <v-card flat tile>
        <v-card-title class="pa-0">
          <v-toolbar
              flat
              class="modal_bar"
          >
            <v-toolbar-title>
              {{ $tr("project", "key_142") }}
            </v-toolbar-title>
            <v-spacer/>
            <v-btn
                icon
                @click="modalDelete = false"
            >
              <CancelIcon/>
            </v-btn>
          </v-toolbar>
        </v-card-title>
        <v-divider/>
        <v-container fluid>
          <div>{{ $tr('admin', 'key_108') }}</div>
        </v-container>
        <v-divider/>
        <v-container fluid class="text-right">
          <v-btn depressed dark color="danger" @click="startDelete">
            {{ $tr('project', 'key_144') }}
          </v-btn>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PaletteIcon from "@/components/icons/PaletteIcon";
import CompassIcon from "@/components/icons/CompassIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import GlobeIcon from "@/components/icons/GlobeIcon";
import PushIcon from "@/components/icons/PushIcon";
import ImageIcon from "@/components/icons/ImageIcon";
import CheckDeviceIcon from "@/components/icons/CheckDeviceIcon";
import AppIcon from "@/components/blocks/AppIcon";
import ReceiveWallet from "@/components/icons/ReceiveWallet";
import DeleteIcon from "@/components/icons/DeleteIcon";
import CancelIcon from "@/components/icons/CancelIcon";

export default {
  name: 'BuilderSidebar',
  components: {
    CheckDeviceIcon,
    ImageIcon,
    PaletteIcon,
    CompassIcon,
    HomeIcon,
    GlobeIcon,
    PushIcon,
    AppIcon,
    ReceiveWallet,
    DeleteIcon,
    CancelIcon
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
    },
    image: {
      default: ""
    },
  },
  data: () => ({
    items: [
      {
        name: "key_11",
        to: "AdminMain"
      },
      {
        name: "key_12",
        to: "AdminDesign"
      },
      {
        name: "key_22",
        to: "AdminNavigation"
      },
      {
        name: "key_23",
        to: "AdminLocalization"
      },
      {
        name: "key_13",
        to: "AdminAssets"
      },
      {
        name: "key_17",
        to: "AdminPush"
      },
      {
        name: "key_15",
        to: "AdminBuild"
      },
    ],
    modal_menu: [
      {
        name: "key_20",
        to: ""
      },
      {
        name: "key_37",
        to: ""
      }
    ],
    loading: true,
    icon: null,
    modalBalance: {
      status: false,
      value: 0
    },
    modalDelete: false,
  }),
  watch: {

  },
  methods: {
    startDelete() {
      this.$store.commit('setLoading', true);
      this.$http.get(`${this.$serverApiLink}api/admin/app/remove_app/${this.$route.params.uid}`).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.$store.commit('setLoading', false);
            this.modalDelete = false;
            this.$router.replace({ name: 'AdminApps' })
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.$store.commit('setLoading', false);
          }
      );
    },
    openActionModal(index) {
      if (!index) {
        this.modalBalance.status = true
      } else {
        this.modalDelete = true;
      }
    },
    updateBalance() {
      this.$store.commit('setLoading', true);
      let params = new URLSearchParams();
      params.append('balance', this.modalBalance.value);
      this.$http.post(`${this.$serverApiLink}api/admin/app/update_balance/${this.$route.params.uid}`, params).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.$store.commit('setLoading', false);
            this.$emit('updateBuilds', this.modalBalance.value)
            this.modalBalance.status = false;
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.$store.commit('setLoading', false);
          }
      );
    },
    getAppShortInfo() {
      this.$emit('onStart');
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/app/short/${this.$route.params.uid}`).
      then(
          response => {
            this.loading = false;
            this.$emit('onLoad', response.data.app);
            this.modalBalance.value = response.data.app.balance;
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.$router.replace({ name: 'AdminApps' })
          }
      );
    }
  },
  mounted() {
    this.getAppShortInfo();
  }
}
</script>