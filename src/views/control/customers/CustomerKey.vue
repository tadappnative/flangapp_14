<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_34')"
          :preview="false"
          drawer
      />
      <Loader v-if="loading"/>
      <template v-else>
        <EmptyState
            v-if="list.length === 0"
            :title="$tr('project', 'key_228')"
            :subtitle="$tr('project', 'key_273')"
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
                    {{ item.issuer_id }}
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
                      :label="$tr('project', 'key_176')"
                      outlined
                      color="primary"
                      dense
                      v-model="issuerId"
                  >
                    <template v-slot:append>
                      <v-tooltip
                          right
                          color="blue_dark"
                          max-width="200"
                      >
                        <template v-slot:activator="{ on }">
                          <v-icon color="smoke" style="top: 4px" v-on="on">
                            mdi-help-circle-outline
                          </v-icon>
                        </template>
                        {{ $tr('project', 'key_179') }}
                      </v-tooltip>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12" class="pb-0">
                  <v-text-field
                      :label="$tr('project', 'key_177')"
                      outlined
                      color="primary"
                      dense
                      v-model="keyId"
                  >
                    <template v-slot:append>
                      <v-tooltip
                          right
                          color="blue_dark"
                          max-width="200"
                      >
                        <template v-slot:activator="{ on }">
                          <v-icon color="smoke" style="top: 4px" v-on="on">
                            mdi-help-circle-outline
                          </v-icon>
                        </template>
                        {{ $tr('project', 'key_180') }}
                      </v-tooltip>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12" class="pb-4">
                  <DropZone
                      ref="dropZone"
                      :label="$tr('project', 'key_178')"
                      @update="updateFile"
                  />
                </v-col>
                <v-col md="12" sm="12" cols="12" class="pb-4">
                  <DropZone
                      ref="certZone"
                      :label="$tr('project', 'key_331')"
                      @update="updateCert"
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
  name: 'CustomerKey',
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
    issuerId: "",
    keyId: "",
    file: null,
    cert: null
  }),
  methods: {
    updateFile(file) {
      this.file = file;
    },
    updateCert(file) {
      this.cert = file;
    },
    removeItem(index) {
      this.$store.commit('setLoading', true);
      this.$http.get(`${this.$serverApiLink}api/admin/signs/remove_ios/${this.list[index].uid}`).
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
      params.set('api_key', this.file );
      params.set('cert', this.cert );
      params.set('name', this.name );
      params.set('issuer_id', this.issuerId );
      params.set('key_id', this.keyId );
      this.$http.post(
          `${this.$serverApiLink}api/admin/signs/upload_cert/${this.$route.params.id}`, params, {headers: {'Content-Type': 'multipart/form-data' }}).
      then(
          response => {
            this.list.push(response.data.item);
            this.dialog = false;
            this.name = "";
            this.issuerId = "";
            this.keyId = "";
            this.$refs.dropZone.clean();
            this.$refs.certZone.clean();
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
    getSigns() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/signs/list_ios/${this.$route.params.id}`).
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
    this.getSigns();
  }
}
</script>