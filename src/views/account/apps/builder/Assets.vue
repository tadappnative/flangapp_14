<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_13')"
          :drawer="true"
      />
      <Loader v-if="loading"/>
      <Container v-else>
        <Title :title="$tr('project', 'key_297')"/>
        <v-row class="mb-6">
          <v-col md="6" sm="12" cols="12">
            <v-select
                :items="background"
                dense
                hide-details
                :label="$tr('project', 'key_71')"
                outlined
                v-model="settings.background_mode"
            ></v-select>
          </v-col>
          <v-col md="6" sm="12" cols="12">
            <v-text-field
                :label="$tr('project', 'key_72')"
                outlined
                readonly
                color="primary"
                dense
                hide-details
                v-model="settings.color"
            >
              <template v-slot:append>
                <v-btn icon color="smoke" @click="picker = true">
                  <v-avatar :size="18" :color="settings.color" />
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col md="6" sm="12" cols="12">
            <v-text-field
                :label="$tr('project', 'key_78')"
                outlined
                color="primary"
                dense
                hide-details
                v-model="settings.tagline"
            ></v-text-field>
          </v-col>
          <v-col md="6" sm="12" cols="12">
            <v-select
                :items="themes"
                dense
                hide-details
                :label="$tr('project', 'key_75')"
                outlined
                v-model="settings.theme"
            ></v-select>
          </v-col>
          <v-col md="6" sm="12" cols="12">
            <v-text-field
                :label="$tr('project', 'key_79')"
                outlined
                color="primary"
                dense
                hide-details
                v-model="settings.delay"
            ></v-text-field>
          </v-col>
          <v-col md="6" sm="12" cols="12">
            <v-select
                :items="logos"
                dense
                hide-details
                :label="$tr('project', 'key_82')"
                outlined
                v-model="settings.use_logo"
            ></v-select>
          </v-col>
        </v-row>
        <Title :title="$tr('project', 'key_83')"/>
        <div class="permissions_block mb-3">
          <div class="d-flex justify-space-between align-center pa-4">
            <div class="d-flex justify-start align-center">
              <v-avatar color="whitesmoke" :size="60" class="mr-4">
                <div
                    v-if="!settings.background"
                    class="smoke--text"
                    style="width: 32px; height: 32px"
                >
                  <ImageIcon :size="32"/>
                </div>
                <div
                    style="width: 32px; height: 32px"
                    v-else
                >
                  <v-img
                      width="32"
                      height="32"
                      :src="settings.background"
                  >
                    <template v-slot:placeholder>
                      <v-progress-circular
                          indeterminate
                          color="smoke"
                          size="32"
                          width="3"
                      ></v-progress-circular>
                    </template>
                  </v-img>
                </div>
              </v-avatar>
              <div>
                <div class="body-1 font-weight-medium">
                  {{ $tr('project', 'key_80') }}
                </div>
                <div class="body-2 smoke--text">
                  {{ $tr('project', 'key_84') }}
                </div>
              </div>
            </div>
            <div>
              <v-btn
                  :loading="background_image.isSelecting"
                  small
                  depressed
                  class="ml-3"
                  @click="onButtonBackgroundClick"
              >
                {{ $tr('project', 'key_86') }}
              </v-btn>
              <input
                  ref="uploaderA"
                  class="d-none"
                  type="file"
                  accept="image/*"
                  @change="onFileBackgroundChanged"
              >
            </div>
          </div>
        </div>
        <div class="permissions_block mb-3">
          <div class="d-flex justify-space-between align-center pa-4">
            <div class="d-flex justify-start align-center">
              <v-avatar color="whitesmoke" :size="60" class="mr-4">
                <div
                    v-if="!settings.logo"
                    class="smoke--text"
                    style="width: 32px; height: 32px"
                >
                  <ImageIcon :size="32"/>
                </div>
                <div
                    style="width: 32px; height: 32px"
                    v-else
                >
                  <v-img
                      width="32"
                      height="32"
                      :src="settings.logo"
                  >
                    <template v-slot:placeholder>
                      <v-progress-circular
                          indeterminate
                          color="smoke"
                          size="32"
                          width="3"
                      ></v-progress-circular>
                    </template>
                  </v-img>
                </div>
              </v-avatar>
              <div>
                <div class="body-1 font-weight-medium">
                  {{ $tr('project', 'key_81') }}
                </div>
                <div class="body-2 smoke--text">
                  {{ $tr('project', 'key_87') }}
                </div>
              </div>
            </div>
            <div>
              <v-btn
                  :loading="logo_image.isSelecting"
                  small
                  depressed
                  class="ml-3"
                  @click="onButtonLogoClick"
              >
                {{ $tr('project', 'key_86') }}
              </v-btn>
              <input
                  ref="uploaderB"
                  class="d-none"
                  type="file"
                  accept="image/*"
                  @change="onFileLogoChanged"
              >
            </div>
          </div>
        </div>
        <div class="permissions_block">
          <div class="d-flex justify-space-between align-center pa-4">
            <div class="d-flex justify-start align-center">
              <v-avatar color="whitesmoke" :size="60" class="mr-4">
                <div
                    v-if="!icons.list.android.length"
                    class="smoke--text"
                    style="width: 32px; height: 32px"
                >
                  <ImageIcon :size="32"/>
                </div>
                <div
                    style="width: 32px; height: 32px"
                    v-else
                >
                  <v-img
                      width="32"
                      height="32"
                      :src="`${icons.url}/android/${icons.list.android[0]}?${icons.unix}`"
                  >
                    <template v-slot:placeholder>
                      <v-progress-circular
                          indeterminate
                          color="smoke"
                          size="32"
                          width="3"
                      ></v-progress-circular>
                    </template>
                  </v-img>
                </div>
              </v-avatar>
              <div>
                <div class="body-1 font-weight-medium">
                  {{ $tr('project', 'key_89') }}
                </div>
                <div class="body-2 smoke--text">
                  {{ $tr('project', 'key_88') }}
                </div>
              </div>
            </div>
            <div>
              <v-btn
                  :loading="icon_image.isSelecting"
                  small
                  depressed
                  class="ml-3"
                  @click="onButtonIconClick"
              >
                {{ $tr('project', 'key_86') }}
              </v-btn>
              <input
                  ref="uploaderC"
                  class="d-none"
                  type="file"
                  accept="image/*"
                  @change="onFileIconChanged"
              >
            </div>
          </div>
        </div>
      </Container>
      <Footer
          v-if="!loading"
          :loading="btnLoad"
          ref="footer"
          @click="updateSplash"
      />
      <v-dialog
          scrollable
          max-width="500"
          v-model="picker"
      >
        <SelectColor
            :color="settings.color"
            @close="picker = false"
            @save="setColor"
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
import SelectColor from "@/views/account/apps/builder/modals/SelectColor";
import ImageIcon from "@/components/icons/ImageIcon";
import Footer from "@/components/blocks/Footer";

export default {
  name: 'Assets',
  components: {
    PageBar,
    Container,
    Title,
    SelectColor,
    Loader,
    ImageIcon,
    Footer
  },
  data: () => ({
    loading: true,
    picker: false,
    btnLoad: false,
    settings: {
      background_mode: 0,
      color: "#F44336",
      tagline: "",
      theme: 0,
      delay: 3,
      use_logo: 0,
      background: "",
      logo: ""
    },
    icons: {
      list: {
        android: [],
        ios: []
      },
      load: false,
      url: "",
      unix: 0
    },
    background_image: {
      isSelecting: false,
      selectedFile: null,
      upload: false,
      loading: false
    },
    logo_image: {
      isSelecting: false,
      selectedFile: null,
      upload: false,
      loading: false
    },
    icon_image: {
      isSelecting: false,
      selectedFile: null,
      upload: false,
      loading: false
    },
  }),
  computed: {
    background: function () {
      return [
        {
          text: this.$tr('project', 'key_72'),
          value: 0
        },
        {
          text: this.$tr('project', 'key_73'),
          value: 1
        },
      ];
    },
    themes: function () {
      return [
        {
          text: this.$tr('project', 'key_76'),
          value: 0
        },
        {
          text: this.$tr('project', 'key_77'),
          value: 1
        },
      ];
    },
    logos: function () {
      return [
        {
          text: this.$tr('project', 'key_43'),
          value: 0
        },
        {
          text: this.$tr('project', 'key_44'),
          value: 1
        },
      ];
    }
  },
  methods: {
    onButtonIconClick() {
      this.icon_image.isSelecting = true;
      window.addEventListener('focus', () => {
        this.icon_image.isSelecting = false
      }, {once: true});
      this.$refs.uploaderC.click();
    },
    onFileIconChanged(e) {
      this.icon_image.selectedFile = e.target.files[0];
      this.$store.commit('setLoading', true);
      this.icon_image.upload = true;
      let params = new FormData();
      params.set('icon', this.icon_image.selectedFile );
      this.$http.post(
          `${this.$serverApiLink}api/account/assets/upload_icon/${this.$route.params.uid}`, params, {headers: {'Content-Type': 'multipart/form-data' }}).
      then(
          response => {
            let item = response.data;
            this.icons.list.android = item.icons.android;
            this.icons.list.ios = item.icons.ios;
            this.icons.url = item.url;
            this.icons.unix = item.unix;
            this.$emit("root_update_icon", item.preview);
            this.$store.commit('setLoading', false);
            this.icon_image.upload = false;
            this.$refs.footer.showSuccessAlert();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.icon_image.upload = false;
            this.$store.commit('setLoading', false);
          }
      );
    },
    onButtonLogoClick() {
      this.logo_image.isSelecting = true;
      window.addEventListener('focus', () => {
        this.logo_image.isSelecting = false
      }, {once: true});
      this.$refs.uploaderB.click();
    },
    onFileLogoChanged(e) {
      this.logo_image.selectedFile = e.target.files[0];
      this.$store.commit('setLoading', true);
      this.logo_image.upload = true;
      let params = new FormData();
      params.set('logo', this.logo_image.selectedFile );
      this.$http.post(
          `${this.$serverApiLink}api/account/assets/upload_logo/${this.$route.params.uid}`, params, {headers: {'Content-Type': 'multipart/form-data' }}).
      then(
          response => {
            this.settings.logo = response.data.uri;
            this.logo_image.upload = false;
            this.$store.commit('setLoading', false);
            this.$emit("reload_preview", {
              uid: this.$route.params.uid,
              mode: "splash"
            });
            this.$refs.footer.showSuccessAlert();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.logo_image.upload = false;
            this.$store.commit('setLoading', false);
          }
      );
    },
    onButtonBackgroundClick() {
      this.background_image.isSelecting = true;
      window.addEventListener('focus', () => {
        this.background_image.isSelecting = false
      }, {once: true});
      this.$refs.uploaderA.click();
    },
    onFileBackgroundChanged(e) {
      this.background_image.selectedFile = e.target.files[0];
      this.$store.commit('setLoading', true);
      let params = new FormData();
      params.set('screen', this.background_image.selectedFile );
      this.$http.post(
          `${this.$serverApiLink}api/account/assets/upload_splash/${this.$route.params.uid}`, params, {headers: {'Content-Type': 'multipart/form-data' }}).
      then(
          response => {
            this.settings.background = response.data.uri;
            this.background_image.upload = false;
            this.$store.commit('setLoading', false);
            this.$emit("reload_preview", {
              uid: this.$route.params.uid,
              mode: "splash"
            });
            this.$refs.footer.showSuccessAlert();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.background_image.upload = false;
            this.$store.commit('setLoading', false);
          }
      );
    },
    setColor(color) {
      this.settings.color = color;
      this.picker = false;
    },
    getSplashDetail() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/assets/splashscreen/${this.$route.params.uid}`).
      then(
          response => {
            this.settings = response.data.detail;
            this.getIcons();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
          }
      );
    },
    getIcons() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/assets/icons/${this.$route.params.uid}`).
      then(
          response => {
            this.icons.load = true;
            this.icons.list.android = response.data.icons.android;
            this.icons.list.ios = response.data.icons.ios;
            this.icons.url = response.data.url;
            this.icons.unix = response.data.unix;
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
    updateSplash() {
      this.btnLoad = true;
      let params = new URLSearchParams();
      params.append('background_mode', this.settings.background_mode);
      params.append('color', this.settings.color);
      params.append('tagline', this.settings.tagline);
      params.append('delay', this.settings.delay);
      params.append('theme', this.settings.theme);
      params.append('use_logo', this.settings.use_logo);
      this.$http.post(`${this.$serverApiLink}api/account/assets/update_splash/${this.$route.params.uid}`, params).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.btnLoad = false;
            this.$emit("reload_preview", {
              uid: this.$route.params.uid,
              mode: "splash"
            });
            this.$refs.footer.showSuccessAlert();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.btnLoad = false;
          }
      );
    }
  },
  mounted() {
    this.getSplashDetail();
    this.$emit("reload_preview", {
      uid: this.$route.params.uid,
      mode: "splash"
    });
  },
  beforeDestroy() {
    this.$emit("reload_preview", {
      uid: this.$route.params.uid,
      mode: "app"
    });
  }
}
</script>