<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_35')"
          :preview="false"
          drawer
      />
      <Loader v-if="loading"/>
      <template v-else>
        <EmptyState
            v-if="list.length === 0"
            :title="$tr('project', 'key_228')"
            :subtitle="$tr('project', 'key_278')"
        >
          <template v-slot:icon>
            <div style="width: 45px; height: 45px">
              <DataLockIcon :size="45"/>
            </div>
          </template>
          <template v-slot:action>
            <v-btn
                depressed
                color="primary"
                large
                class="ml-3"
                @click="dialog = true"
            >
              {{ $tr('project', 'key_274') }}
            </v-btn>
          </template>
        </EmptyState>
        <Container v-else>
          <div class="d-flex justify-space-between align-center">
            <Title :title="$tr('project', 'key_275')"/>
            <v-btn
                small
                depressed
                color="primary"
                class="mb-5"
                @click="dialog = true"
            >
              {{ $tr('project', 'key_274') }}
            </v-btn>
          </div>
          <v-list dense two-line class="pa-0 background_block">
            <div v-for="(item, index) in list" :key="'ios_sign_item_bar_'+index">
              <v-divider
                  v-if="index > 0"
                  :key="'ios_sign_line_bar'+index"
                  class="mb-1 mt-1"
              />
              <v-list-item
                  :key="'ios_sign_select_item_bar'+index"
                  class="pl-0 pr-0 pt-0 pb-0"
              >
                <v-list-item-avatar
                    size="40"
                    color="whitesmoke"
                    class="mt-0 mb-0 d-flex justify-center align-center"
                >
                  <div
                      class="smoke--text"
                      style="width: 24px; height: 24px"
                  >
                    <KeyIcon :size="24"/>
                  </div>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="smoke--text">
                    {{ item.alias }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon small color="danger" @click="removeItem(index)">
                    <DeleteMiniIcon :size="16"/>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </div>
          </v-list>
        </Container>
      </template>
      <v-dialog
          scrollable
          max-width="560"
          v-model="dialog"
      >
        <v-card flat tile>
          <v-card-title class="pa-0">
            <v-toolbar
                flat
                class="modal_bar"
            >
              <v-toolbar-title>
                {{ $tr('project', 'key_276') }}
              </v-toolbar-title>
              <v-spacer/>
              <v-btn
                  icon
                  @click="dialog = false"
              >
                <CancelIcon/>
              </v-btn>
            </v-toolbar>
          </v-card-title>
          <v-divider/>
          <v-card-text class="pa-0">
            <v-container fluid>
              <v-row>
                <v-col md="12" sm="12" cols="12" class="pb-0">
                  <v-text-field
                      :label="$tr('project', 'key_166')"
                      outlined
                      color="primary"
                      dense
                      autofocus
                      v-model="name"
                  ></v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12" class="pb-0">
                  <v-text-field
                      :label="$tr('project', 'key_167')"
                      outlined
                      color="primary"
                      dense
                      v-model="alias"
                  ></v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12" class="pb-0">
                  <v-text-field
                      :label="$tr('project', 'key_168')"
                      outlined
                      color="primary"
                      dense
                      type="password"
                      v-model="keystorePassword"
                  ></v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12" class="pb-0">
                  <v-text-field
                      :label="$tr('project', 'key_169')"
                      outlined
                      color="primary"
                      dense
                      type="password"
                      v-model="keyPassword"
                  ></v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12" class="pb-4">
                  <DropZone
                      ref="dropZone"
                      :label="$tr('project', 'key_170')"
                      @update="updateFile"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider/>
          <v-container fluid class="text-right">
            <v-btn color="primary" depressed @click="saveItem">
              {{ $tr('project', 'key_277') }}
            </v-btn>
          </v-container>
        </v-card>
      </v-dialog>
    </v-main>
  </v-layout>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
import Loader from "@/components/blocks/Loader";
import EmptyState from "@/components/blocks/EmptyState";
import Title from "@/components/blocks/Title";
import Container from "@/components/blocks/Container";
import DataLockIcon from "@/components/icons/DataLockIcon";
import KeyIcon from "@/components/icons/KeyIcon";
import CancelIcon from "@/components/icons/CancelIcon";
import DropZone from "@/components/form/DropZone";
import DeleteMiniIcon from "@/components/icons/DeleteMiniIcon";
export default {
  name: 'CustomerKeyAndroid',
  components: {
    PageBar,
    Loader,
    EmptyState,
    Title,
    Container,
    DataLockIcon,
    KeyIcon,
    CancelIcon,
    DropZone,
    DeleteMiniIcon
  },
  data: () => ({
    loading: true,
    list: [],
    dialog: false,
    name: "",
    alias: "",
    keystorePassword: "",
    keyPassword: "",
    file: null,
  }),
  methods: {
    updateFile(file) {
      this.file = file;
    },
    removeItem(index) {
      this.$store.commit('setLoading', true);
      this.$http.get(`${this.$serverApiLink}api/admin/signs/remove_android/${this.list[index].uid}`).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.$store.commit('setLoading', false);
            this.list.splice(index, 1);
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
    saveItem() {
      this.$store.commit('setLoading', true);
      let params = new FormData();
      params.set('keystore', this.file );
      params.set('name', this.name );
      params.set('alias', this.alias );
      params.set('keystore_password', this.keystorePassword );
      params.set('key_password', this.keyPassword );
      this.$http.post(
          `${this.$serverApiLink}api/admin/signs/upload_keystore/${this.$route.params.id}`, params, {headers: {'Content-Type': 'multipart/form-data' }}).
      then(
          response => {
            this.list.push(response.data.item);
            this.name = "";
            this.alias = "";
            this.keystorePassword = "";
            this.keyPassword = "";
            this.file = null;
            this.dialog = false;
            this.$refs.dropZone.clean();
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
    getAndroidSigns() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/signs/list_android/${this.$route.params.id}`).
      then(
          response => {
            this.list = response.data.list;
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
  },
  mounted() {
    this.getAndroidSigns();
  }
}
</script>