<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_23')"
          :drawer="true"
      />
      <Loader v-if="loading"/>
      <Container v-else>
        <Title :title="$tr('project', 'key_151')"/>
        <v-list dense two-line class="pa-0 mb-6 background_block">
          <div v-for="(item, index) in locals" :key="'local_item_app_'+index">
            <v-divider
                v-if="index > 0"
                :key="'local_line_'+index"
            />
            <v-list-item
                :key="'local_select_item_'+index"
                class="pl-0 pr-0 pt-0 pb-0"
                style="min-height: 50px"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.name }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <div>
                  <v-btn icon small color="orange" class="mr-3" @click="openCreate(index)">
                    <EditMiniIcon :size="16"/>
                  </v-btn>
                  <v-btn icon small color="danger" @click="refreshItem(index)">
                    <RefreshMiniIcon :size="16"/>
                  </v-btn>
                </div>
              </v-list-item-action>
            </v-list-item>
          </div>
        </v-list>
        <Title :title="$tr('project', 'key_150')"/>
        <div class="permissions_block mb-3">
          <div class="d-flex justify-space-between align-center pa-4">
            <div class="d-flex justify-start align-center">
              <v-avatar color="whitesmoke" :size="60" class="mr-4">
                <div
                    v-if="!offline_img"
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
                      :src="offline_img"
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
                  {{ $tr('project', 'key_154') }}
                </div>
                <div class="body-2 smoke--text">
                  {{ $tr('project', 'key_139') }}
                </div>
              </div>
            </div>
            <div>
              <v-btn
                  :loading="offline_image.isSelecting"
                  small
                  depressed
                  class="ml-3"
                  @click="onButtonOfflineClick"
              >
                {{ $tr('project', 'key_86') }}
              </v-btn>
              <input
                  ref="uploaderA"
                  class="d-none"
                  type="file"
                  accept="image/*"
                  @change="onFileOfflineChanged"
              >
            </div>
          </div>
        </div>
        <div class="permissions_block">
          <div class="d-flex justify-space-between align-center pa-4">
            <div class="d-flex justify-start align-center">
              <v-avatar color="whitesmoke" :size="60" class="mr-4">
                <div
                    v-if="!error_img"
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
                      :src="error_img"
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
                  {{ $tr('project', 'key_155') }}
                </div>
                <div class="body-2 smoke--text">
                  {{ $tr('project', 'key_139') }}
                </div>
              </div>
            </div>
            <div>
              <v-btn
                  :loading="error_image.isSelecting"
                  small
                  depressed
                  class="ml-3"
                  @click="onButtonErrorClick"
              >
                {{ $tr('project', 'key_86') }}
              </v-btn>
              <input
                  ref="uploaderB"
                  class="d-none"
                  type="file"
                  accept="image/*"
                  @change="onFileErrorChanged"
              >
            </div>
          </div>
        </div>
      </Container>
      <v-dialog
          scrollable
          max-width="560"
          v-model="dialog.status"
      >
        <v-card flat tile>
          <v-card-title class="pa-0">
            <v-toolbar
                flat
                class="modal_bar"
            >
              <v-toolbar-title>
                {{ $tr('project', 'key_296') }}
              </v-toolbar-title>
              <v-spacer/>
              <v-btn
                  icon
                  @click="dialog.status = false"
              >
                <CancelIcon/>
              </v-btn>
            </v-toolbar>
          </v-card-title>
          <v-divider/>
          <v-card-text class="pa-0">
            <v-container fluid>
              <v-row>
                <v-col md="12" sm="12" cols="12">
                  <v-text-field
                      :label="$tr('project', 'key_153')"
                      outlined
                      color="primary"
                      dense
                      hide-details
                      autofocus
                      v-model="dialog.name"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider/>
          <v-container fluid class="text-right">
            <v-btn color="primary" depressed :loading="dialog.loading" @click="updateItem">
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
import EditMiniIcon from "@/components/icons/EditMiniIcon";
import RefreshMiniIcon from "@/components/icons/RefreshMiniIcon";
import CancelIcon from "@/components/icons/CancelIcon";
import ImageIcon from "@/components/icons/ImageIcon";

export default {
  name: 'AdminLocalization',
  components: {
    PageBar,
    Container,
    Title,
    Loader,
    EditMiniIcon,
    RefreshMiniIcon,
    CancelIcon,
    ImageIcon
  },
  data: () => ({
    loading: true,
    locals: [],
    offline_img: null,
    error_img: null,
    dialog: {
      name: "",
      loading: false,
      status: false,
      id: 0
    },
    offline_image: {
      isSelecting: false,
      selectedFile: null,
      upload: false,
      loading: false
    },
    error_image: {
      isSelecting: false,
      selectedFile: null,
      upload: false,
      loading: false
    },
  }),
  methods: {
    openCreate(index) {
      this.dialog = {
        name: this.locals[index].name,
        loading: false,
        status: true,
        id: index + 1
      };
    },
    getLocals() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/localization/detail/${this.$route.params.uid}`).
      then(
          response => {
            this.locals = response.data.locals;
            this.offline_img = response.data.images.offline;
            this.error_img = response.data.images.error;
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
    onButtonOfflineClick() {
      this.offline_image.isSelecting = true;
      window.addEventListener('focus', () => {
        this.offline_image.isSelecting = false
      }, {once: true});
      this.$refs.uploaderA.click();
    },
    onFileOfflineChanged(e) {
      this.offline_image.selectedFile = e.target.files[0];
      this.$store.commit('setLoading', true);
      this.offline_image.upload = true;
      let params = new FormData();
      params.set('image', this.offline_image.selectedFile );
      this.$http.post(
          `${this.$serverApiLink}api/admin/localization/upload_image/${this.$route.params.uid}/offline`, params, {headers: {'Content-Type': 'multipart/form-data' }}).
      then(
          response => {
            this.offline_img = response.data.uri;
            this.offline_image.upload = false;
            this.$store.commit('setLoading', false);
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.offline_image.upload = false;
            this.$store.commit('setLoading', false);
          }
      );
    },
    onButtonErrorClick() {
      this.error_image.isSelecting = true;
      window.addEventListener('focus', () => {
        this.error_image.isSelecting = false
      }, {once: true});
      this.$refs.uploaderB.click();
    },
    onFileErrorChanged(e) {
      this.error_image.selectedFile = e.target.files[0];
      this.$store.commit('setLoading', true);
      this.error_image.upload = true;
      let params = new FormData();
      params.set('image', this.error_image.selectedFile );
      this.$http.post(
          `${this.$serverApiLink}api/admin/localization/upload_image/${this.$route.params.uid}/error`, params, {headers: {'Content-Type': 'multipart/form-data' }}).
      then(
          response => {
            this.error_img = response.data.uri;
            this.error_image.upload = false;
            this.$store.commit('setLoading', false);
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.error_image.upload = false;
            this.$store.commit('setLoading', false);
          }
      );
    },
    updateItem() {
      this.dialog.loading = true;
      let params = new URLSearchParams();
      params.append('name', this.dialog.name);
      params.append('id', this.dialog.id);
      this.$http.post(`${this.$serverApiLink}api/admin/localization/update_text/${this.$route.params.uid}`, params).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.locals[this.dialog.id-1].name = this.dialog.name;
            this.dialog = {
              name: "",
              loading: false,
              status: false,
              id: 0
            };
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.dialog.loading = false;
          }
      );
    },
    refreshItem(index) {
      this.$store.commit('setLoading', true);
      let params = new URLSearchParams();
      params.append('id', index + 1);
      this.$http.post(`${this.$serverApiLink}api/admin/localization/refresh_text/${this.$route.params.uid}`, params).
      then(
          response => {
            this.locals[index].name = response.data.value;
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
    this.getLocals();
  }
}
</script>