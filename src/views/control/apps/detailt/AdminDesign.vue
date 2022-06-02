<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_12')"
          :tabs="tabs"
          :drawer="true"
          @onChange="updateTab"
      />
      <Loader v-if="loading"/>
      <template v-else>
        <Container v-if="!tab">
          <Title :title="$tr('project', 'key_127')"/>
          <v-row class="mb-6">
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('project', 'key_9')"
                  outlined
                  readonly
                  color="primary"
                  dense
                  hide-details
                  v-model="app.color_theme"
              >
                <template v-slot:append>
                  <v-btn icon color="smoke" @click="openThemePicker()">
                    <v-avatar :size="18" :color="app.color_theme" />
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-select
                  :items="titles"
                  dense
                  hide-details
                  :label="$tr('project', 'key_10')"
                  outlined
                  v-model="app.color_title"
              ></v-select>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-select
                  :items="loaders"
                  dense
                  hide-details
                  :label="$tr('project', 'key_39')"
                  outlined
                  v-model="app.loader"
              ></v-select>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-select
                  :items="statusItems"
                  dense
                  hide-details
                  :label="$tr('project', 'key_131')"
                  outlined
                  v-model="app.display_title"
              ></v-select>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('project', 'key_49')"
                  outlined
                  readonly
                  color="primary"
                  dense
                  hide-details
                  v-model="app.loader_color"
              >
                <template v-slot:append>
                  <v-btn icon color="smoke" @click="openLoaderPicker()">
                    <v-avatar :size="18" :color="app.loader_color" />
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-select
                  :items="statusItems"
                  dense
                  hide-details
                  :label="$tr('project', 'key_42')"
                  outlined
                  v-model="app.pull_to_refresh"
              ></v-select>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('project', 'key_329')"
                  outlined
                  readonly
                  color="primary"
                  dense
                  hide-details
                  v-model="app.icon_color"
              >
                <template v-slot:append>
                  <v-btn icon color="smoke" @click="openIconPicker()">
                    <v-avatar :size="18" :color="app.icon_color" />
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('project', 'key_330')"
                  outlined
                  readonly
                  color="primary"
                  dense
                  hide-details
                  v-model="app.active_color"
              >
                <template v-slot:append>
                  <v-btn icon color="smoke" @click="openActivePicker()">
                    <v-avatar :size="18" :color="app.active_color" />
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <Title :title="$tr('project', 'key_127')"/>
          <v-row>
            <v-col md="12" sm="12" cols="12" class="pb-0">
              <v-item-group
                  mandatory
                  v-model="app.template"
                  class="d-flex justify-start align-center"
              >
                <div
                    v-for="(item, i) in templates"
                    :key="`${i}_app_template_layout_builder`"
                    class="pr-3"
                >
                  <img
                      :src="item.image"
                      :class="app.template === i ? 'app_template active' : 'app_template'"
                      @click="app.template = i"
                  />
                  <div class="caption text-uppercase">
                    {{ item.name }}
                  </div>
                </div>
              </v-item-group>
            </v-col>
          </v-row>
        </Container>
        <Container v-else-if="tab === 1">
          <Title :title="$tr('project', 'key_111')"/>
          <v-row class="mb-6">
            <v-col md="6" sm="12" cols="12">
              <v-select
                  :items="backgrounds"
                  dense
                  hide-details
                  :label="$tr('project', 'key_114')"
                  outlined
                  v-model="drawer.mode"
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
                  v-model="drawer.color"
              >
                <template v-slot:append>
                  <v-btn icon color="smoke" @click="openDrawerPicker()">
                    <v-avatar :size="18" :color="drawer.color" />
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-select
                  :items="titles"
                  dense
                  hide-details
                  :label="$tr('project', 'key_75')"
                  outlined
                  v-model="drawer.theme"
              ></v-select>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-select
                  :items="statusItems"
                  dense
                  hide-details
                  :label="$tr('project', 'key_82')"
                  outlined
                  v-model="drawer.logo_enabled"
              ></v-select>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('project', 'key_112')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="drawer.title"
              ></v-text-field>
            </v-col>
            <v-col md="6" sm="12" cols="12">
              <v-text-field
                  :label="$tr('project', 'key_113')"
                  outlined
                  color="primary"
                  dense
                  hide-details
                  v-model="drawer.subtitle"
              ></v-text-field>
            </v-col>
          </v-row>
          <Title :title="$tr('project', 'key_83')"/>
          <div class="permissions_block mb-3">
            <div class="d-flex justify-space-between align-center pa-4">
              <div class="d-flex justify-start align-center">
                <v-avatar color="whitesmoke" :size="60" class="mr-4">
                  <div
                      v-if="!drawer.background"
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
                        :src="drawer.background"
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
                    {{ $tr('project', 'key_138') }}
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
                      v-if="!drawer.logo"
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
                        :src="drawer.logo"
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
                    {{ $tr('project', 'key_139') }}
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
        </Container>
        <Container v-else-if="tab === 2">
          <div class="d-flex justify-space-between align-center">
            <Title :title="$tr('project', 'key_133')"/>
            <v-btn
                small
                depressed
                color="primary"
                outlined
                class="mb-5"
                @click="styleDialog.status = true"
            >
              {{ $tr('project', 'key_134') }}
            </v-btn>
          </div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  {{ $tr('project', 'key_135') }}
                </th>
                <th class="text-right" width="100px">
                  {{ $tr('project', 'key_136') }}
                </th>
              </tr>
              </thead>
              <tbody>
              <template v-if="!styles.length">
                <tr>
                  <td colspan="2">
                    {{ $tr('project', 'key_137') }}
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr
                    v-for="(item, i) in styles"
                    :key="`${i}_styles_div`"
                >
                  <td>.{{ item.name }}</td>
                  <td class="text-right">
                    <v-btn icon small color="danger" @click="removeStyle(i)">
                      <DeleteMiniIcon :size="16"/>
                    </v-btn>
                  </td>
                </tr>
              </template>
              </tbody>
            </template>
          </v-simple-table>
        </Container>
      </template>
      <Footer
          v-if="!loading && tab < 2"
          ref="footer"
          :loading="isUpdate"
          @click="startUpdate"
      />
      <v-dialog
          scrollable
          max-width="500"
          v-model="picker.status"
      >
        <SelectColor
            :color="picker.color"
            @close="picker.status = false"
            @save="saveColor"
        />
      </v-dialog>
      <v-dialog
          scrollable
          max-width="500"
          v-model="styleDialog.status"
      >
        <v-card flat tile>
          <v-toolbar
              flat
              class="modal_bar"
          >
            <v-toolbar-title>
              {{ $tr('project', 'key_294') }}
            </v-toolbar-title>
            <v-spacer/>
            <v-btn
                icon
                @click="styleDialog.status = false"
            >
              <CancelIcon/>
            </v-btn>
          </v-toolbar>
          <v-divider/>
          <v-container fluid>
            <v-row>
              <v-col md="12" sm="12" cols="12" class="pb-0">
                <v-text-field
                    :label="$tr('project', 'key_295')"
                    outlined
                    autofocus
                    color="primary"
                    dense
                    prefix="."
                    v-model="styleDialog.name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-divider/>
          <v-container fluid class="text-right">
            <v-btn depressed color="primary" min-width="100" :loading="styleDialog.loading" @click="createStyle">
              {{ $tr('project', 'key_173') }}
            </v-btn>
          </v-container>
        </v-card>
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
import DrawerTemplate from "@/assets/images/templates/drawer.png";
import TabsTemplate from "@/assets/images/templates/tabs.png";
import BarTemplate from "@/assets/images/templates/bar.png";
import BlankTemplate from "@/assets/images/templates/blank.png";
import Footer from "@/components/blocks/Footer";
import ImageIcon from "@/components/icons/ImageIcon";
import DeleteMiniIcon from "@/components/icons/DeleteMiniIcon";
import CancelIcon from "@/components/icons/CancelIcon";

export default {
  name: 'AdminDesign',
  components: {
    PageBar,
    Container,
    Title,
    Loader,
    SelectColor,
    Footer,
    ImageIcon,
    DeleteMiniIcon,
    CancelIcon
  },
  data: () => ({
    loading: true,
    picker: {
      status: false,
      mode: "theme",
      color: "#ffffff"
    },
    tab: 0,
    app: {
      color_theme: "#F44336",
      color_title: 0,
      loader: 0,
      pull_to_refresh: 0,
      loader_color: "#F44336",
      template: 0,
      btn_color: "#F44336",
      display_title: 0,
      icon_color: "#F44336",
      active_color: "#F44336",
    },
    drawer: {
      mode: 0,
      color: "#F44336",
      theme: 0,
      logo_enabled: 0,
      title: "",
      subtitle: "",
      logo: null,
      background: null
    },
    styles: [],
    templates: [
      {
        image: DrawerTemplate,
        name: "Drawer + Bar"
      },
      {
        image: TabsTemplate,
        name: "Tabs + Bar"
      },
      {
        image: BarTemplate,
        name: "Bar"
      },
      {
        image: BlankTemplate,
        name: "Blank"
      }
    ],
    isUpdate: false,
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
    styleDialog: {
      status: false,
      name: "",
      loading: false,
    },
  }),
  computed: {
    backgrounds: function () {
      return [
        {
          text: this.$tr('project', 'key_115'),
          value: 0
        },
        {
          text: this.$tr('project', 'key_116'),
          value: 1
        },
        {
          text: this.$tr('project', 'key_117'),
          value: 2
        },
      ];
    },
    tabs: function () {
      return [
        this.$tr('project', 'key_35'),
        this.$tr('project', 'key_110'),
        this.$tr('project', 'key_132')
      ];
    },
    titles: function () {
      return [
        {
          text: this.$tr('project', 'key_37'),
          value: 0
        },
        {
          text: this.$tr('project', 'key_38'),
          value: 1
        }
      ];
    },
    statusItems: function () {
      return [
        {
          text: this.$tr('project', 'key_43'),
          value: 0
        },
        {
          text: this.$tr('project', 'key_44'),
          value: 1
        }
      ];
    },
    loaders: function () {
      return [
        {
          text: this.$tr('project', 'key_48'),
          value: 0
        },
        {
          text: this.$tr('project', 'key_40'),
          value: 1
        },
        {
          text: this.$tr('project', 'key_41'),
          value: 2
        }
      ];
    }
  },
  methods: {
    startUpdate() {
      if (!this.tab) {
        this.updateMain();
      } else if (this.tab === 1) {
        this.updateDrawer();
      }
    },
    updateMain() {
      this.isUpdate = true;
      let params = new URLSearchParams();
      params.append('color_theme', this.app.color_theme);
      params.append('color_title', this.app.color_title);
      params.append('template', this.app.template);
      params.append('loader', this.app.loader);
      params.append('pull_to_refresh', this.app.pull_to_refresh);
      params.append('loader_color', this.app.loader_color);
      params.append('display_title', this.app.display_title);
      params.append('icon_color', this.app.icon_color);
      params.append('active_color', this.app.active_color);
      this.$http.post(`${this.$serverApiLink}api/admin/design/update_detail/${this.$route.params.uid}`, params).
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
    updateDrawer() {
      this.isUpdate = true;
      let params = new URLSearchParams();
      params.append('mode', this.drawer.mode);
      params.append('color', this.drawer.color);
      params.append('theme', this.drawer.theme);
      params.append('logo_enabled', this.drawer.logo_enabled);
      params.append('title', this.drawer.title);
      params.append('subtitle', this.drawer.subtitle);
      this.$http.post(`${this.$serverApiLink}api/admin/drawer/update_drawer/${this.$route.params.uid}`, params).
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
            this.btnLoad = false;
          }
      );
    },
    saveColor(color) {
      if (this.picker.mode === "theme") {
        this.app.color_theme = color;
      } else if (this.picker.mode === "loader") {
        this.app.loader_color = color;
      } else if (this.picker.mode === "drawer") {
        this.drawer.color = color;
      } else if (this.picker.mode === "icon") {
        this.app.icon_color = color;
      } else if (this.picker.mode === "active") {
        this.app.active_color = color;
      }
      this.picker.status = false;
    },
    openThemePicker() {
      this.picker = {
        status: true,
        mode: "theme",
        color: this.app.color_theme
      }
    },
    openLoaderPicker() {
      this.picker = {
        status: true,
        mode: "loader",
        color: this.app.loader_color
      }
    },
    openDrawerPicker() {
      this.picker = {
        status: true,
        mode: "drawer",
        color: this.drawer.color
      }
    },
    openIconPicker() {
      this.picker = {
        status: true,
        mode: "icon",
        color: this.app.icon_color
      }
    },
    openActivePicker() {
      this.picker = {
        status: true,
        mode: "active",
        color: this.app.active_color
      }
    },
    updateTab(value) {
      this.tab = value;
    },
    getDetail() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/design/detail/${this.$route.params.uid}`).
      then(
          response => {
            this.app = response.data.layout;
            this.getDrawerSettings();
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
    getDrawerSettings() {
      this.$http.get(`${this.$serverApiLink}api/admin/drawer/detail/${this.$route.params.uid}`).
      then(
          response => {
            this.drawer = response.data.detail;
            this.getStyles();
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
    getStyles() {
      this.$http.get(`${this.$serverApiLink}api/admin/design/styles/${this.$route.params.uid}`).
      then(
          response => {
            this.styles = response.data.styles;
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
      this.background_image.upload = true;
      let params = new FormData();
      params.set('background', this.background_image.selectedFile );
      this.$http.post(
          `${this.$serverApiLink}api/admin/drawer/upload_background/${this.$route.params.uid}`, params, {headers: {'Content-Type': 'multipart/form-data' }}).
      then(
          response => {
            this.drawer.background = response.data.uri;
            this.background_image.upload = false;
            this.$store.commit('setLoading', false);
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
      let params = new FormData();
      params.set('logo', this.logo_image.selectedFile );
      this.$http.post(
          `${this.$serverApiLink}api/admin/drawer/upload_logo/${this.$route.params.uid}`, params, {headers: {'Content-Type': 'multipart/form-data' }}).then(
          response => {
            this.drawer.logo = response.data.uri;
            this.logo_image.upload = false;
            this.$store.commit('setLoading', false);
            this.$refs.footer.showSuccessAlert();
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
    createStyle() {
      this.styleDialog.loading = true;
      let params = new URLSearchParams();
      params.append('name', this.styleDialog.name);
      this.$http.post(`${this.$serverApiLink}api/admin/design/create_div/${this.$route.params.uid}`, params).
      then(
          response => {
            this.styles.push({
              id: response.data.id,
              name:  response.data.name,
              loading: false
            });
            this.styleDialog = {
              status: false,
              name: "",
              loading: false,
            }
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.styleDialog.loading = false;
          }
      );
    },
    removeStyle(index) {
      this.$store.commit('setLoading', true);
      this.$http.get(`${this.$serverApiLink}api/admin/design/remove_div/${this.styles[index].id}`).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.styles.splice(index, 1);
            this.$store.commit('setLoading', false);
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
  },
  mounted() {
    this.getDetail();
  }
}
</script>