<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_11')"
          :tabs="tabs"
          :drawer="true"
          @onChange="updateTab"
      />
      <template v-if="!tab">
        <Loader v-if="loading"/>
        <Container v-else>
          <Title :title="$tr('project', 'key_127')"/>
          <v-row>
            <v-col md="12" sm="12" cols="12" class="pb-0">
              <v-text-field
                  :label="$tr('project', 'key_7')"
                  outlined
                  color="primary"
                  dense
                  v-model="name"
              ></v-text-field>
            </v-col>
            <v-col md="12" sm="12" cols="12" class="pb-0">
              <v-text-field
                  :label="$tr('project', 'key_8')"
                  outlined
                  color="primary"
                  dense
                  :disabled="status === 1"
                  v-model="link"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12" class="pb-0">
              <v-text-field
                  :label="$tr('project', 'key_27')"
                  outlined
                  color="primary"
                  dense
                  :disabled="status === 1"
                  v-model="appId"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12" class="pb-0">
              <v-select
                  :label="$tr('project', 'key_29')"
                  outlined
                  color="primary"
                  dense
                  :items="orientItems"
                  v-model="orientation"
              ></v-select>
            </v-col>
            <v-col md="6" sm="12" cols="12" class="pb-0">
              <v-text-field
                  :label="$tr('project', 'key_109')"
                  outlined
                  color="primary"
                  dense
                  readonly
                  v-model="language"
                  @click="selectISO = true"
              >
                <template v-slot:append>
                  <v-btn icon color="smoke" @click="selectISO = true">
                    <MoreIcon :size="24"/>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12" class="pb-0">
              <v-text-field
                  :label="$tr('project', 'key_129')"
                  outlined
                  color="primary"
                  dense
                  v-model="email"
              ></v-text-field>
            </v-col>
            <v-col md="12" sm="12" cols="12" class="pb-0">
              <v-textarea
                  :label="$tr('project', 'key_28')"
                  outlined
                  color="primary"
                  dense
                  v-model="user_agent"
              ></v-textarea>
            </v-col>
          </v-row>
        </Container>
      </template>
      <template v-else-if="tab === 1">
        <Loader v-if="loading"/>
        <Container v-else>
          <Title :title="$tr('project', 'key_128')"/>
          <div class="permissions_block mb-3">
            <div class="d-flex justify-space-between align-center pa-4">
              <div class="d-flex justify-start align-center">
                <v-avatar color="whitesmoke" :size="60" class="mr-4">
                  <div class="smoke--text" style="width: 32px; height: 32px">
                    <LocationIcon :size="32"/>
                  </div>
                </v-avatar>
                <div>
                  <div class="body-1 font-weight-medium">
                    {{ $tr('project', 'key_121') }}
                  </div>
                  <div class="body-2 smoke--text">
                    {{ $tr('project', 'key_122') }}
                  </div>
                </div>
              </div>
              <v-switch
                  :true-value="1"
                  :false-value="0"
                  v-model="permissions.gps"
                  inset
              ></v-switch>
            </div>
          </div>
          <div class="permissions_block mb-3">
            <div class="d-flex justify-space-between align-center pa-4">
              <div class="d-flex justify-start align-center">
                <v-avatar color="whitesmoke" :size="60" class="mr-4">
                  <div class="smoke--text" style="width: 32px; height: 32px">
                    <CameraIcon :size="32"/>
                  </div>
                </v-avatar>
                <div>
                  <div class="body-1 font-weight-medium">
                    {{ $tr('project', 'key_123') }}
                  </div>
                  <div class="body-2 smoke--text">
                    {{ $tr('project', 'key_124') }}
                  </div>
                </div>
              </div>
              <v-switch
                  :true-value="1"
                  :false-value="0"
                  v-model="permissions.camera"
                  inset
              ></v-switch>
            </div>
          </div>
          <div class="permissions_block mb-3">
            <div class="d-flex justify-space-between align-center pa-4">
              <div class="d-flex justify-start align-center">
                <v-avatar color="whitesmoke" :size="60" class="mr-4">
                  <div class="smoke--text" style="width: 32px; height: 32px">
                    <VoiceIcon :size="32"/>
                  </div>
                </v-avatar>
                <div>
                  <div class="body-1 font-weight-medium">
                    {{ $tr('project', 'key_125') }}
                  </div>
                  <div class="body-2 smoke--text">
                    {{ $tr('project', 'key_124') }}
                  </div>
                </div>
              </div>
              <v-switch
                  :true-value="1"
                  :false-value="0"
                  v-model="permissions.microphone"
                  inset
              ></v-switch>
            </div>
          </div>
        </Container>
      </template>
      <Footer
          ref="footer"
          :loading="updateLoading"
          @click="updateMain"
      />
      <v-dialog
          scrollable
          max-width="680"
          v-model="selectISO"
      >
        <SelectISO
            @close="selectISO = false"
            @set="setISO"
        />
      </v-dialog>
    </v-main>
  </v-layout>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
import Container from "@/components/blocks/Container";
import Title from "@/components/blocks/Title";
import Loader from "@/components/blocks/Loader";
import SelectISO from "@/views/account/apps/builder/modals/SelectISO";
import MoreIcon from "@/components/icons/MoreIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import CameraIcon from "@/components/icons/CameraIcon";
import VoiceIcon from "@/components/icons/VoiceIcon";
import Footer from "@/components/blocks/Footer";
export default {
  name: 'Main',
  components: {
    PageBar,
    Container,
    Title,
    Loader,
    SelectISO,
    MoreIcon,
    LocationIcon,
    CameraIcon,
    VoiceIcon,
    Footer
  },
  data: () => ({
    selectISO: false,
    loading: true,
    tab: 0,
    name: "",
    link: "",
    appId: "",
    email: "",
    orientation: 0,
    user_agent: "",
    status: 0,
    orientations: [],
    gps: 0,
    language: "EN",
    btnLoad: false,
    permissions: {
      gps: 0,
      camera: 0,
      microphone: 0
    },
    updateLoading: false
  }),
  computed: {
    tabs: function () {
      return [
        this.$tr('project', 'key_119'),
        this.$tr('project', 'key_120')
      ];
    },
    orientItems: function () {
      return [
        {
          text: this.$tr('project', 'key_30'),
          value: 0
        },
        {
          text: this.$tr('project', 'key_31'),
          value: 1
        },
        {
          text: this.$tr('project', 'key_32'),
          value: 2
        }
      ];
    }
  },
  methods: {
    updateTab(value) {
      this.tab = value;
    },
    setISO(value) {
      this.language = value.toUpperCase();
      this.selectISO = false;
    },
    getMainDetail() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/apps/detail/${this.$route.params.uid}`).then(
          response => {
            const data = response.data.app;
            this.name = data.name;
            this.link = data.link;
            this.appId = data.app_id;
            this.orientation = data.orientation;
            this.user_agent = data.user_agent;
            this.status = data.status;
            this.gps = data.gps;
            this.language = data.language;
            this.email = data.email;
            this.permissions = data.permissions;
            this.loading = false;
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.loading = false;
          }
      );
    },
    updateMain() {
      this.updateLoading = true
      let params = new URLSearchParams();
      params.append('link', this.link);
      params.append('name', this.name);
      params.append('app_id', this.appId);
      params.append('user_agent', this.user_agent);
      params.append('orientation', this.orientation);
      params.append('gps', this.gps);
      params.append('language', this.language);
      params.append('email', this.email);
      params.append('gps', this.permissions.gps);
      params.append('camera', this.permissions.camera);
      params.append('microphone', this.permissions.microphone);
      this.$http.post(`${this.$serverApiLink}api/account/apps/update/${this.$route.params.uid}`, params).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.updateLoading = false;
            this.$emit("root_update_name", this.name);
            this.$emit("root_update_link", this.link);
            this.$emit("reload_preview", {
              uid: this.$route.params.uid,
              mode: "app"
            });
            this.$refs.footer.showSuccessAlert();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.updateLoading = false;
          }
      );
    }
  },
  mounted() {
    this.getMainDetail();
  }
}
</script>