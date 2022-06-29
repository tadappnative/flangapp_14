<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('admin', 'key_6')"
          :tabs="tabs"
          :preview="false"
          :drawer="true"
          @onChange="updateTab"
      />
      <Loader v-if="loading"/>
      <template v-else>
        <Container v-if="!tab">
          <Title :title="$tr('admin', 'key_33')"/>
          <v-row class="mb-4">
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_14')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="site_name"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_15')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="site_url"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_22')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="currency_code"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_23')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="currency_symbol"
              ></v-text-field>
            </v-col>
            <v-col md="12" sm="12" cols="12">
              <div class="permissions_block mb-3">
                <div class="d-flex justify-space-between align-center pa-4">
                  <div class="d-flex justify-start align-center">
                    <v-avatar color="whitesmoke" :size="60" class="mr-4">
                      <div style="width: 32px; height: 32px">
                        <v-img
                            width="32"
                            height="32"
                            :src="$store.state.config.logo"
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
            </v-col>
          </v-row>
          <Title :title="$tr('admin', 'key_35')"/>
          <v-row>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_17')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="github_username"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_18')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  :type="!hide.github_token ? 'password' : 'text'"
                  v-model="github_token"
              >
                <template v-slot:append>
                  <v-btn
                      icon
                      width="40"
                      depressed
                      height="40"
                      color="smoke"
                      @click="hide.github_token = !hide.github_token"
                      style="margin-bottom: 7px"
                  >
                    <v-icon v-text="!hide.github_token ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"/>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_19')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="github_repo"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_20')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  :type="!hide.codemagic_key ? 'password' : 'text'"
                  v-model="codemagic_key"
              >
                <template v-slot:append>
                  <v-btn
                      icon
                      width="40"
                      depressed
                      height="40"
                      color="smoke"
                      @click="hide.codemagic_key = !hide.codemagic_key"
                      style="margin-bottom: 7px"
                  >
                    <v-icon v-text="!hide.codemagic_key ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"/>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_21')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="codemagic_id"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_36')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="ionic_icons"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_37')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  :type="!hide.google_id ? 'password' : 'text'"
                  v-model="google_id"
              >
                <template v-slot:append>
                  <v-btn
                      icon
                      width="40"
                      depressed
                      height="40"
                      color="smoke"
                      @click="hide.google_id = !hide.google_id"
                      style="margin-bottom: 7px"
                  >
                    <v-icon v-text="!hide.google_id ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"/>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-select
                  :items="statusItems"
                  dense
                  hide-details
                  :label="$tr('admin', 'key_38')"
                  outlined
                  v-model="google_enabled"
              ></v-select>
            </v-col>
          </v-row>
        </Container>
        <Container v-else-if="tab === 1">
          <Title :title="$tr('admin', 'key_34')"/>
          <v-row>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_24')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="email.host"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_25')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="email.user"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_26')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="email.port"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_27')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="email.timeout"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_28')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="email.charset"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_29')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="email.sender"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_30')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  :type="!hide.emailPassword ? 'password' : 'text'"
                  v-model="email.password"
              >
                <template v-slot:append>
                  <v-btn
                      icon
                      width="40"
                      depressed
                      height="40"
                      color="smoke"
                      @click="hide.emailPassword = !hide.emailPassword"
                      style="margin-bottom: 7px"
                  >
                    <v-icon v-text="!hide.emailPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"/>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </Container>
        <Container v-else-if="tab === 2">
          <div
              :class="`font-weight-bold caption mb-5 mt-2 ${!license.status ? 'red--text' : 'success--text'}`"
          >
            {{ !license.status ? $tr('admin', 'key_105') : $tr('admin', 'key_104') }}
          </div>
          <v-row>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('admin', 'key_103')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  :readonly="tab === 2 && license.status"
                  v-model="license.key"
              ></v-text-field>
            </v-col>
          </v-row>
        </Container>
      </template>
      <Footer
          v-if="!loading"
          ref="footer"
          :loading="isUpdate"
          :full_width="true"
          :hide_action="tab === 2 && license.status"
          @click="startUpdate"
      />
    </v-main>
  </v-layout>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
import Container from "@/components/blocks/Container";
import Title from "@/components/blocks/Title";
import Loader from "@/components/blocks/Loader";
import Footer from "@/components/blocks/Footer";

export default {
  name: 'Settings',
  components: {
    PageBar,
    Container,
    Title,
    Loader,
    Footer
  },
  computed: {
    tabs: function () {
      return [
        this.$tr('admin', 'key_12'),
        this.$tr('admin', 'key_13'),
        this.$tr('admin', 'key_102')
      ];
    },
    statusItems: function () {
      return [
        {
          text: this.$tr('project', 'key_44'),
          value: "0"
        },
        {
          text: this.$tr('project', 'key_43'),
          value: "1"
        }
      ];
    },
  },
  data: () => ({
    isUpdate: false,
    loading: true,
    tab: 0,
    site_name: "",
    site_url: "",
    currency_code: "",
    currency_symbol: "",
    github_username: "",
    github_token: "",
    github_repo: "",
    codemagic_key: "",
    codemagic_id: "",
    ionic_icons: "",
    google_id: "",
    google_enabled: "0",
    hide: {
      github_token: false,
      codemagic_key: false,
      stripe_secret_key: false,
      google_id: false,
      emailPassword: false
    },
    email: {
      host: "",
      user: "",
      port: 0,
      timeout: 0,
      charset: "",
      sender: "",
      password: ""
    },
    logo_image: {
      isSelecting: false,
      selectedFile: null,
      upload: false,
      loading: false
    },
    license: {
      status: false,
      key: ""
    }
  }),
  methods: {
    updateTab(value) {
      this.tab = value;
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
          `${this.$serverApiLink}api/admin/settings/upload_logo`, params, {headers: {'Content-Type': 'multipart/form-data' }}).
      then(
          response => {
            this.$store.commit('setLogo', response.data.logo);
            this.$store.commit('setLoading', false);
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
    startUpdate() {
      if (!this.tab) {
        this.updateGlobal();
      } else if (this.tab === 1) {
        this.updateEmailConfig();
      } else {
        this.updateLicense();
      }
    },
    getEmailConfig() {
      this.$http.get(`${this.$serverApiLink}api/admin/settings/email_config`).
      then(
          response => {
            this.email = response.data.detail;
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
    updateLicense() {
      this.isUpdate = true;
      let params = new URLSearchParams();
      params.append('code', this.license.key);
      this.$http.post(`${this.$serverApiLink}api/admin/settings/update_license`, params).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.isUpdate = false;
            this.license.status = true;
            this.$refs.footer.showSuccessAlert();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.isUpdate = false;
          }
      );
    },
    updateEmailConfig() {
      this.isUpdate = true;
      let params = new URLSearchParams();
      params.append('host', this.email.host);
      params.append('user', this.email.user);
      params.append('port', this.email.port);
      params.append('timeout', this.email.timeout);
      params.append('charset', this.email.charset);
      params.append('sender', this.email.sender);
      params.append('password', this.email.password);
      this.$http.post(`${this.$serverApiLink}api/admin/settings/update_email`, params).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.isUpdate = false;
            this.$refs.footer.showSuccessAlert();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.isUpdate = false;
          }
      );
    },
    getSettings() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/settings/get`).
      then(
          response => {
            const data = response.data.list;
            this.site_name = data.site_name;
            this.site_url = data.site_url;
            this.currency_code = data.currency_code;
            this.currency_symbol = data.currency_symbol;
            this.github_username = data.github_username;
            this.github_token = data.github_token;
            this.github_repo = data.github_repo;
            this.codemagic_key = data.codemagic_key;
            this.codemagic_id = data.codemagic_id;
            this.ionic_icons = data.ionic_icons;
            this.google_id = data.google_id;
            this.google_enabled = data.google_enabled;
            this.license = {
              status: data.license.length,
              key: data.license
            }
            this.getEmailConfig();
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
    updateGlobal() {
      this.isUpdate = true;
      let params = new URLSearchParams();
      params.append('site_name', this.site_name);
      params.append('site_url', this.site_url);
      params.append('currency_code', this.currency_code);
      params.append('currency_symbol', this.currency_symbol);
      params.append('github_username', this.github_username);
      params.append('github_token', this.github_token);
      params.append('github_repo', this.github_repo);
      params.append('codemagic_key', this.codemagic_key);
      params.append('codemagic_id', this.codemagic_id);
      params.append('ionic_icons', this.ionic_icons);
      params.append('google_id', this.google_id);
      params.append('google_enabled', this.google_enabled);
      this.$http.post(`${this.$serverApiLink}api/admin/settings/update_global`, params).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.isUpdate = false;
            this.$refs.footer.showSuccessAlert();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.isUpdate = false;
          }
      );
    },
  },
  mounted() {
    this.getSettings();
  }
}
</script>