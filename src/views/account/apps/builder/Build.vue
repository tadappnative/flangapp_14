<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_15')"
          :drawer="true"
      />
      <Loader v-if="loading"/>
      <template v-else>
        <EmptyState
            v-if="list.length === 0"
            :title="$tr('project', 'key_162')"
            :subtitle="$tr('project', 'key_161')"
        >
          <template v-slot:icon>
            <div style="width: 45px; height: 45px">
              <DevicesIcon :size="45"/>
            </div>
          </template>
          <template v-slot:action>
            <v-btn
                depressed
                color="primary"
                large
                class="ml-3"
                @click="createBuildDialog"
            >
              {{ $tr('project', 'key_160') }}
            </v-btn>
          </template>
        </EmptyState>
        <Container v-else>
          <div class="d-flex justify-space-between align-center">
            <Title :title="$tr('project', 'key_304')"/>
            <v-btn
                small
                depressed
                color="primary"
                class="mb-5"
                @click="createBuildDialog"
            >
              {{ $tr('project', 'key_160') }}
            </v-btn>
          </div>
          <v-list dense two-line class="pa-0 background_block">
            <div v-for="(item, index) in list" :key="'build_item_bar_'+index">
              <v-divider
                  v-if="index > 0"
                  :key="'build_line_bar'+index"
              />
              <v-list-item
                  :key="'build_item_bar'+index"
                  class="pl-0 pr-0 pt-0 pb-0"
              >
                <v-list-item-avatar
                    size="50"
                    color="whitesmoke"
                    class="d-flex justify-center align-center flex-column"
                    style="border-radius: 15px;"
                >
                  <div>
                    <v-icon
                        color="smoke"
                        v-text="item.platform === 'android' ? 'mdi-android' : 'mdi-apple'"
                    />
                  </div>
                  <div class="caption text-uppercase font-weight-medium">
                    {{ item.format }}
                  </div>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold" v-text="item.version"/>
                  <v-list-item-subtitle>
                    <span>{{ $tr('project', 'key_22') }} {{ item.created }}</span>
                    <span v-if="item.publish"> {{ $tr('project', 'key_197') }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <div>
                    <v-chip
                        small
                        :class="getBadgeColor(item.status, item.fail)"
                    >
                      <v-progress-circular
                          v-if="!item.status"
                          indeterminate
                          width="1"
                          size="12"
                          class="mr-2"
                      ></v-progress-circular>
                      {{ getBadgeName(item.status, item.fail) }}
                    </v-chip>
                    <v-btn
                        color="primary"
                        icon
                        :disabled="!item.status || item.fail"
                        class="ml-3"
                        @click="downloadApp(item.static)"
                    >
                      <DownloadIcon :size="22"/>
                    </v-btn>
                  </div>
                </v-list-item-action>
              </v-list-item>
            </div>
          </v-list>
          <div
              v-if="loadBtn.status && count > 20"
              class="d-flex justify-center mt-5 mb-5"
          >
            <v-btn
                rounded
                outlined
                :loading="loadBtn.loading"
                @click="loadMore"
            >
              {{ $tr('project', 'key_26') }}
            </v-btn>
          </div>
        </Container>
      </template>
      <v-dialog
          v-model="dialog"
          width="560"
      >
        <v-card flat tile>
          <v-card-title class="pa-0">
            <v-toolbar
                flat
                class="modal_bar"
            >
              <v-toolbar-title>
                {{ $tr("project", "key_160") }}
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
          <v-container fluid>
            <v-row>
              <v-col md="6" sm="12" cols="12" class="pb-0" @click="platform = 'android'">
                <v-card
                    outlined
                    :class="['pa-3 d-flex justify-space-between align-center mb-3', platform === 'android' ? 'active_platform' : '']"
                    style="cursor:pointer;"
                >
                  <div class="d-flex justify-start align-center">
                    <v-avatar
                        size="50"
                        color="whitesmoke"
                        class="mr-4"
                    >
                      <v-icon
                          size="30"
                          color="#00de7a"
                      >
                        mdi-android
                      </v-icon>
                    </v-avatar>
                    <div>
                      <div class="body-1 font-weight-medium">
                        {{ $tr("project", "key_158") }}
                      </div>
                      <div class="body-2">
                        {{ $tr("project", "key_184") }}
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>
              <v-col md="6" sm="12" cols="12" class="pb-0" @click="platform = 'ios'">
                <v-card
                    outlined
                    :class="['pa-3 d-flex justify-space-between align-center mb-3', platform === 'ios' ? 'active_platform' : '']"
                    style="cursor:pointer;"
                >
                  <div class="d-flex justify-start align-center">
                    <v-avatar
                        size="50"
                        color="whitesmoke"
                        class="mr-4"
                    >
                      <v-icon
                          size="30"
                          color="black"
                      >
                        mdi-apple
                      </v-icon>
                    </v-avatar>
                    <div>
                      <div class="body-1 font-weight-medium">
                        {{ $tr("project", "key_159") }}
                      </div>
                      <div class="body-2">
                        {{ $tr("project", "key_185") }}
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>
              <v-col md="12" sm="12" cols="12" class="pb-0">
                <v-text-field
                    :label="$tr('project', 'key_183')"
                    outlined
                    color="primary"
                    dense
                    autofocus
                    v-model="version"
                ></v-text-field>
              </v-col>
              <v-col md="12" sm="12" cols="12" class="pb-0">
                <v-select
                    :label="$tr('project', 'key_186')"
                    outlined
                    color="primary"
                    dense
                    :items="signing.list"
                    :loading="signing.loading"
                    :disabled="signing.loading"
                    :no-data-text="$tr('project', 'key_189')"
                    v-model="sign"
                >
                  <template v-slot:append>
                    <v-btn
                        exact
                        small
                        :to="{name: platform === 'android' ? 'KeysAndroid' : 'Keys'}"
                        color="primary"
                        icon
                        style="top: 4px"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                </v-select>
              </v-col>
              <template v-if="platform === 'android'">
                <v-col md="12" sm="12" cols="12" class="pt-0 pb-0">
                  <Title :title="$tr('project', 'key_190')"/>
                  <div class="permissions_block mb-3">
                    <div class="d-flex justify-space-between align-center pa-4 pb-1 pt-1">
                      <div class="d-flex justify-start align-center align-self-center">
                        <div>
                          <div class="font-weight-medium body-1 mb-1">
                            APK
                          </div>
                          <div class="smoke--text caption">
                            {{ $tr('project', 'key_191') }}
                          </div>
                        </div>
                      </div>
                      <v-checkbox
                          color="primary"
                          class="ml-4"
                          :true-value="true"
                          :false-value="false"
                          :value="true"
                          :input-value="android_file !== 'aab'"
                          @change="changeAndroidFile"
                      ></v-checkbox>
                    </div>
                  </div>
                  <div class="permissions_block mb-3">
                    <div class="d-flex justify-space-between align-center pa-4 pb-1 pt-1">
                      <div class="d-flex justify-start align-center align-self-center">
                        <div>
                          <div class="font-weight-medium body-1 mb-1">
                            AAB
                          </div>
                          <div class="smoke--text caption">
                            {{ $tr('project', 'key_192') }}
                          </div>
                        </div>
                      </div>
                      <v-checkbox
                          color="primary"
                          class="ml-4"
                          :true-value="true"
                          :false-value="false"
                          :value="true"
                          :input-value="android_file === 'aab'"
                          @change="changeAndroidFile"
                      ></v-checkbox>
                    </div>
                  </div>
                </v-col>
              </template>
              <template v-else>
                <v-col md="12" sm="12" cols="12" class="pt-0 pb-0">
                  <div class="d-flex justify-space-between align-center">
                    <div>
                      {{ $tr('project', 'key_188') }}
                    </div>
                    <v-switch
                        color="primary"
                        inset
                        v-model="testFlight"
                    ></v-switch>
                  </div>
                </v-col>
              </template>
            </v-row>
          </v-container>
          <v-divider/>
          <v-container fluid class="text-right">
            <v-btn depressed color="primary" @click="startBuild">
              {{ $tr('project', 'key_187') }}
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
import EmptyState from "@/components/blocks/EmptyState";
import DevicesIcon from "@/components/icons/DevicesIcon";
import DownloadIcon from "@/components/icons/DownloadIcon";
import CancelIcon from "@/components/icons/CancelIcon";

export default {
  name: 'Build',
  components: {
    PageBar,
    Container,
    Title,
    Loader,
    EmptyState,
    DevicesIcon,
    DownloadIcon,
    CancelIcon
  },
  props: {
    balance: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    loading: true,
    sort: 0,
    count: 0,
    create: false,
    list: [],
    offset: 0,
    loadBtn: {
      status: true,
      loading: false
    },
    dialog: false,
    platform: "android",
    version: "1.0.0",
    signing: {
      loading: true,
      list: []
    },
    sign: "",
    android_file: "apk",
    testFlight: false
  }),
  watch: {
    platform: function () {
      this.signing = {
        loading: true,
        list: []
      };
      this.sign = "";
      this.getSigning();
    }
  },
  methods: {
    downloadApp(link) {
      window.open(link, "_self");
    },
    createBuildDialog() {
      if (this.balance === 0) {
        this.$emit("open_deposit");
      } else {
        this.dialog = true
      }
    },
    changeAndroidFile() {
      this.android_file = this.android_file === 'apk' ? 'aab' : 'apk';
    },
    getBadgeColor(status, error) {
      console.log(error);
      if (!status) {
        return "smoke_badge";
      } else if (status === 1 && !error) {
        return "success_badge";
      } else {
        return "danger_badge";
      }
    },
    getBadgeName(status, error) {
      if (!status) {
        return this.$tr('project', 'key_194');
      } else if (status === 1 && !error) {
        return this.$tr('project', 'key_195');
      } else {
        return this.$tr('project', 'key_196');
      }
    },
    startBuild() {
      this.$store.commit('setLoading', true);
      let params = new URLSearchParams();
      params.append('version', this.version);
      params.append('platform', this.platform);
      params.append('format', this.android_file);
      params.append('android_key_id', this.sign);
      params.append('ios_key_id', this.sign);
      params.append('publish', this.testFlight === true ? "1" : "0");
      this.$http.post(`${this.$serverApiLink}api/account/builds/create/${this.$route.params.uid}`, params).
      then(
          response => {
            this.list.unshift(response.data.detail);
            this.dialog = false;
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
    getSigning() {
      let link = "";
      if (this.platform === "android") {
        link = `${this.$serverApiLink}api/account/signs/short_list_android`;
      } else {
        link = `${this.$serverApiLink}api/account/signs/short_list_ios`;
      }
      this.signing.loading = true;
      this.$http.get(link).then(
          response => {
            this.signing.list = response.data.list;
            this.signing.loading = false;
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.signing.loading = false;
          }
      );
    },
    getVersionsList() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/builds/list/${this.$route.params.uid}/${this.sort}/${this.offset}`).
      then(
          response => {
            this.list = response.data.list;
            this.offset += 20;
            this.count = response.data.count;
            this.next_version = response.data.next_version;
            this.loading = false;
            this.getSigning();
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
    loadMore() {
      this.loadBtn.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/builds/list/${this.$route.params.uid}/${this.sort}/${this.offset}`).
      then(
          response => {
            if (response.data.apps.length > 0) {
              for (let i = 0; i < response.data.apps.length; i++) {
                this.list.push(response.data.apps[i]);
              }
            } else {
              this.loadBtn.status = false;
            }
            this.offset += 20;
            this.loadBtn.loading = false;
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.loadBtn.loading = false;
          }
      );
    }
  },
  mounted() {
    this.getVersionsList();
  }
}
</script>