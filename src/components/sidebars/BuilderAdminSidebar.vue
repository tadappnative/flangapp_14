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
            :to="{name:item.to}" exact
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
import PaletteIcon from "@/components/icons/PaletteIcon";
import CompassIcon from "@/components/icons/CompassIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import GlobeIcon from "@/components/icons/GlobeIcon";
import PushIcon from "@/components/icons/PushIcon";
import ImageIcon from "@/components/icons/ImageIcon";
import CheckDeviceIcon from "@/components/icons/CheckDeviceIcon";
import AppIcon from "@/components/blocks/AppIcon";

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
    AppIcon
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
      }
    ],
    loading: true,
    icon: null
  }),
  watch: {

  },
  methods: {
    getAppShortInfo() {
      this.$emit('onStart');
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/app/short/${this.$route.params.uid}`).
      then(
          response => {
            this.loading = false;
            this.$emit('onLoad', response.data.app);
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.$router.replace({ name: 'Apps' })
          }
      );
    }
  },
  mounted() {
    this.getAppShortInfo();
  }
}
</script>