<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_27')"
          :preview="false"
          drawer
      />
      <Loader v-if="loading"/>
      <template v-else>
        <EmptyState
            v-if="list.length === 0"
            :title="$tr('project', 'key_233')"
            :subtitle="$tr('project', 'key_234')"
        >
          <template v-slot:icon>
            <div style="width: 45px; height: 45px">
              <MailStackIcon :size="45"/>
            </div>
          </template>
          <template v-slot:action>
            <v-btn
                depressed
                color="primary"
                large
                class="ml-3"
                @click="create.status = true"
            >
              {{ $tr('project', 'key_235') }}
            </v-btn>
          </template>
        </EmptyState>
        <Container v-else>
          <div class="d-flex justify-space-between align-center">
            <Title :title="`${$tr('project', 'key_239')}: ${count}`"/>
            <v-btn
                small
                depressed
                color="primary"
                class="mb-5"
                @click="create.status = true"
            >
              {{ $tr('project', 'key_235') }}
            </v-btn>
          </div>
          <v-list dense two-line class="pa-0 background_block">
            <div v-for="(item, index) in list" :key="'pending_ticket_'+index">
              <v-divider
                  v-if="index > 0"
                  :key="'pending_ticket_line'+index"
                  class="mb-1 mt-1"
              />
              <v-list-item
                  :key="'pending_ticket_item'+index"
                  class="pl-0 pr-0 pt-0 pb-0"
                  :to="{name: 'Ticket', params: {ticket_uid: item.uid}}"
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
                    <MailIcon :size="24"/>
                  </div>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    {{ item.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="smoke--text">
                    {{ item.message.comment }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="mr-2">
                  <v-list-item-action-text class="black--text" v-text="item.message.created"/>
                  <v-chip
                      small
                      :class="`mt-2 ${getStatusColor(item.status)}`"
                  >
                    {{ getStatusName(item.status) }}
                  </v-chip>
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
                {{ $tr('project', 'key_235') }}
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
                <v-col md="12" sm="12" cols="12">
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
                <v-col md="12" sm="12" cols="12">
                  <v-textarea
                      :label="$tr('project', 'key_237')"
                      outlined
                      auto-grow
                      rows="10"
                      color="primary"
                      dense
                      hide-details
                      v-model="create.message"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider/>
          <v-container fluid class="text-right">
            <v-btn color="primary" depressed :loading="create.loading" @click="createTicket">
              {{ $tr('project', 'key_238') }}
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
import MailStackIcon from "@/components/icons/MailStackIcon";
import MailIcon from "@/components/icons/MailIcon";
import CancelIcon from "@/components/icons/CancelIcon";
export default {
  name: 'Tickets',
  components: {
    PageBar,
    Loader,
    EmptyState,
    Title,
    Container,
    MailStackIcon,
    MailIcon,
    CancelIcon
  },
  data: () => ({
    loading: false,
    list: [],
    loadBtn: {
      status: true,
      loading: false
    },
    offset: 0,
    count: 0,
    create: {
      title: "",
      message: "",
      status: false,
      loading: false
    }
  }),
  methods: {
    createTicket() {
      this.create.loading = true;
      let params = new URLSearchParams();
      params.append('title', this.create.title);
      params.append('message', this.create.message);
      this.$http.post(`${this.$serverApiLink}api/account/support/create_ticket`, params).
      then(
          response => {
            this.$router.push({name: 'Ticket', params: {ticket_uid: response.data.uid}});
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
    getStatusColor(status) {
      if (!status) {
        return "smoke_badge";
      } else if (status === 1) {
        return "warning_badge";
      } else {
        return "success_badge";
      }
    },
    getStatusName(status) {
      if (!status) {
        return this.$tr("project", "key_241");
      } else if (status === 1) {
        return this.$tr("project", "key_242");
      } else {
        return this.$tr("project", "key_243");
      }
    },
    getTicketList() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/support/list/0/${this.offset}`).
      then(
          response => {
            this.list = response.data.list;
            this.offset += 20;
            this.count = response.data.count;
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
    loadMore() {
      this.loadBtn.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/support/list/0/${this.offset}`).
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
    this.getTicketList();
  }
}
</script>