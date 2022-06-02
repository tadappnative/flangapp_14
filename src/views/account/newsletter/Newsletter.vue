<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_36')"
          :preview="false"
          drawer
      />
      <Loader v-if="loading"/>
      <template v-else>
        <template v-if="error">
          <EmptyState
              :title="$tr('project', 'key_288')"
              :subtitle="$tr('project', 'key_289')"
              :is-error="true"
          >
            <template v-slot:icon>
              <div style="width: 45px; height: 45px">
                <ErrorIcon :size="45"/>
              </div>
            </template>
          </EmptyState>
        </template>
        <template v-else>
          <EmptyState
              v-if="list.length === 0"
              :title="$tr('project', !uid ? 'key_261' : 'key_259')"
              :subtitle="$tr('project', !uid ? 'key_260' : 'key_262')"
          >
            <template v-slot:icon>
              <div style="width: 45px; height: 45px">
                <AdvIcon :size="45"/>
              </div>
            </template>
            <template v-slot:action>
              <v-btn
                  v-if="uid"
                  depressed
                  color="primary"
                  large
                  class="ml-3"
              >
                {{ $tr('project', 'key_255') }}
              </v-btn>
            </template>
          </EmptyState>
          <Container v-else>
            <v-row class="mb-2 mt-1">
              <v-col
                  cols="12"
                  md="6"
                  sm="12"
              >
                <v-card outlined style="background: transparent">
                  <v-list-item>
                    <v-list-item-avatar
                        size="60"
                        color="whitesmoke"
                        class="d-flex justify-center align-center"
                    >
                      <div class="primary--text" style="width: 32px; height: 32px">
                        <UsersIcon :size="32"/>
                      </div>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium text-h6">
                        {{ stat.total }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="smoke--text">
                        {{ $tr('project', 'key_256') }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
              <v-col
                  cols="12"
                  md="6"
                  sm="12"
              >
                <v-card outlined style="background: transparent">
                  <v-list-item>
                    <v-list-item-avatar
                        size="60"
                        color="whitesmoke"
                        class="d-flex justify-center align-center"
                    >
                      <div class="primary--text" style="width: 32px; height: 32px">
                        <UserCheckIcon :size="32"/>
                      </div>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium text-h6">
                        {{ stat.active }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="smoke--text">
                        {{ $tr('project', 'key_257') }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
            <div class="d-flex justify-space-between align-center">
              <Title :title="`${$tr('project', 'key_258')} (${count})`"/>
              <v-btn
                  small
                  depressed
                  color="primary"
                  class="mb-5"
                  @click="create.status = true"
              >
                {{ $tr('project', 'key_255') }}
              </v-btn>
            </div>
            <v-list dense two-line class="pa-0 background_block">
              <div v-for="(item, index) in list" :key="'pending_ticket_'+index">
                <v-divider
                    v-if="index > 0"
                    :key="'news_'+index"
                    class="mb-1 mt-1"
                />
                <v-list-item
                    :key="'news_item'+index"
                    two-line
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
                      <RadioIcon :size="24"/>
                    </div>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">
                      {{ item.headings }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.created }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="smoke--text">
                      {{ item.contents }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <div class="d-flex justify-center align-center" v-if="item.platform_delivery_stats">
                      <div class="text-center ml-4">
                        <v-list-item-title class="success--text font-weight-bold mb-1">
                          {{ item.platform_delivery_stats.successful }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="success--text x-small-text">
                          {{ $tr('project', 'key_283') }}
                        </v-list-item-subtitle>
                      </div>
                      <div class="text-center ml-4">
                        <v-list-item-title class="warning--text font-weight-bold mb-1">
                          {{ item.platform_delivery_stats.failed }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="warning--text x-small-text">
                          {{ $tr('project', 'key_284') }}
                        </v-list-item-subtitle>
                      </div>
                      <div class="text-center ml-4">
                        <v-list-item-title class="danger--text font-weight-bold mb-1">
                          {{ item.platform_delivery_stats.errored }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="danger--text x-small-text">
                          {{ $tr('project', 'key_285') }}
                        </v-list-item-subtitle>
                      </div>
                      <div class="text-center ml-4">
                        <v-list-item-title class="font-weight-bold mb-1">
                          {{ item.converted }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="black--text x-small-text">
                          {{ $tr('project', 'key_263') }}
                        </v-list-item-subtitle>
                      </div>
                    </div>
                    <div class="smoke--text" v-else>
                      <ClockIcon :size="18" />
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
      </template>
      <v-dialog
          scrollable
          max-width="360"
          v-model="create.led.status"
      >
        <LedModal :color="create.led.value" @close="create.led.status = false" @select="setLed"/>
      </v-dialog>
      <v-dialog
          scrollable
          max-width="760"
          v-model="create.status"
      >
        <v-card flat tile>
          <v-card-title class="pa-0">
            <v-toolbar
                flat
                class="modal_bar"
            >
              <v-toolbar-title>
                {{ $tr('project', 'key_255') }}
              </v-toolbar-title>
              <v-spacer/>
              <v-btn
                  icon
                  @click="create.status = false"
              >
                <CancelIcon/>
              </v-btn>
            </v-toolbar>
          </v-card-title>
          <v-divider/>
          <v-card-text class="pa-0">
            <v-container fluid>
              <v-row>
                <v-col md="6" sm="6" cols="12">
                  <v-text-field
                      :label="$tr('project', 'key_236')"
                      outlined
                      autofocus
                      color="primary"
                      dense
                      hide-details
                      v-model="create.title"
                  ></v-text-field>
                </v-col>
                <v-col md="6" sm="6" cols="12">
                  <v-text-field
                      :label="$tr('project', 'key_264')"
                      outlined
                      readonly
                      color="primary"
                      dense
                      hide-details
                      v-model="create.led.value"
                      @click="create.led.status = true"
                  >
                    <template v-slot:append>
                      <v-avatar :color="create.led.value" size="15" style="top: 10px"/>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12">
                  <v-textarea
                      :label="$tr('project', 'key_237')"
                      outlined
                      auto-grow
                      rows="6"
                      color="primary"
                      dense
                      hide-details
                      v-model="create.message"
                  ></v-textarea>
                </v-col>
                <v-col md="12" sm="12" cols="12" class="pb-4">
                  <DropZone
                      ref="dropZone"
                      :label="$tr('project', 'key_265')"
                      @update="updateFile"
                  />
                </v-col>
              </v-row>
            </v-container>
            <v-divider/>
            <v-container fluid class="text-right">
              <v-btn color="primary" depressed :loading="create.loading" @click="startPush">
                {{ $tr('project', 'key_286') }}
              </v-btn>
            </v-container>
          </v-card-text>
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
import AdvIcon from "@/components/icons/AdvIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import UserCheckIcon from "@/components/icons/UserCheckIcon";
import RadioIcon from "@/components/icons/RadioIcon";
import CancelIcon from "@/components/icons/CancelIcon";
import DropZone from "@/components/form/DropZone";
import LedModal from "@/views/account/newsletter/LedModal";
import ClockIcon from "@/components/icons/ClockIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";

export default {
  name: 'Newsletter',
  components: {
    PageBar,
    Loader,
    EmptyState,
    Title,
    Container,
    AdvIcon,
    UsersIcon,
    UserCheckIcon,
    RadioIcon,
    CancelIcon,
    DropZone,
    LedModal,
    ClockIcon,
    ErrorIcon
  },
  data: () => ({
    loading: true,
    list: [],
    offset: 0,
    count: 0,
    loadBtn: {
      status: true,
      loading: false
    },
    stat: {
      total: 0,
      active: 0
    },
    uid: null,
    create: {
      status: false,
      title: "",
      message: "",
      led: {
        status: false,
        value: '#2D9CDB'
      },
      image: null,
      loading: false
    },
    error: false
  }),
  watch: {
    '$route.query.uid': function() {
      this.getUid();
    },
  },
  methods: {
    startPush() {
      this.create.loading = true;
      let params = new FormData();
      params.set('title', this.create.title );
      params.set('message', this.create.message  );
      params.set('led', this.create.led.value );
      if (this.create.image) {
        params.set('image', this.create.image );
      }
      this.$http.post(
          `${this.$serverApiLink}api/account/newsletter/create/${this.uid}`, params, {headers: {'Content-Type': 'multipart/form-data' }}).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.create.loading = false;
            this.create = {
              status: false,
              title: "",
              message: "",
              led: {
                status: false,
                value: '#2D9CDB'
              },
              image: null,
              loading: false
            };
            this.$refs.dropZone.clean();
            this.updateList();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.create.loading = false;
          }
      );
    },
    updateList() {
      this.count = 0;
      this.offset = 0;
      this.loadBtn = {
        status: true,
        loading: false
      };
      this.getTransaction();
    },
    updateFile(file) {
      this.create.image = file;
    },
    setLed(value) {
      this.create.led = {
        status: false,
        value: value
      }
    },
    getUid() {
      let uid = this.$route.query.uid === undefined ? null : this.$route.query.uid;
      this.list = [];
      this.offset = 0;
      this.count = 0;
      if (!uid) {
        this.uid = null;
        this.loading = false;
      } else {
        this.uid = uid;
        this.getTransaction();
      }
    },
    getTransaction() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/newsletter/list/${this.uid}/${this.offset}`).
      then(
          response => {
            this.list = response.data.list;
            this.offset += 20;
            this.count = response.data.count;
            this.stat = response.data.stat;
            this.loading = false;
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.list = [];
            this.uid = null;
            this.loading = false;
            this.error = true;
          }
      );
    },
    loadMore() {
      this.loadBtn.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/newsletter/list/${this.uid}/${this.offset}`).
      then(
          response => {
            if (response.data.list.length > 0) {
              for (let i = 0; i < response.data.list.length; i++) {
                this.list.push(response.data.list[i]);
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
    this.getUid();
  }
}
</script>