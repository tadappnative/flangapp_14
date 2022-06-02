<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('admin', 'key_4')"
          :drawer="true"
          :preview="true"
      />
      <Loader v-if="loading"/>
      <template v-else>
        <EmptyState
            v-if="list.length === 0"
            :title="$tr('admin', 'key_60')"
            :subtitle="$tr('admin', 'key_61')"
        >
          <template v-slot:icon>
            <div style="width: 45px; height: 45px">
              <MailStackIcon :size="45"/>
            </div>
          </template>
        </EmptyState>
        <Container v-else>
          <Title :title="`${$tr('admin', 'key_56')}: ${count}`"/>
          <v-list dense two-line class="pa-0 background_block">
            <div v-for="(item, index) in list" :key="'admin_ticket_'+index">
              <v-divider
                  v-if="index > 0"
                  :key="'admin_ticket_line'+index"
                  class="mb-1 mt-1"
              />
              <v-list-item
                  :key="'admin_ticket_item'+index"
                  class="pl-0 pr-0 pt-0 pb-0"
                  :to="{name: 'Comments', params: {ticket_uid: item.uid}}"
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
    </v-main>
  </v-layout>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
import Container from "@/components/blocks/Container";
import Title from "@/components/blocks/Title";
import Loader from "@/components/blocks/Loader";
import EmptyState from "@/components/blocks/EmptyState";
import MailStackIcon from "@/components/icons/MailStackIcon";
import MailIcon from "@/components/icons/MailIcon";

export default {
  name: 'AdminTickets',
  components: {
    PageBar,
    Container,
    Title,
    Loader,
    EmptyState,
    MailStackIcon,
    MailIcon
  },
  data: () => ({
    loading: true,
    list: [],
    count: 0,
    loadBtn: {
      status: true,
      loading: false
    },
    offset: 0,
  }),
  methods: {
    getStatusColor(status) {
      if (!status) {
        return "warning_badge";
      } else if (status === 1) {
        return "smoke_badge";
      } else {
        return "success_badge";
      }
    },
    getStatusName(status) {
      if (!status) {
        return this.$tr("project", "key_241");
      } else if (status === 1) {
        return this.$tr("admin", "key_58");
      } else {
        return this.$tr("project", "key_243");
      }
    },
    getTickets() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/support/list/0/${this.offset}`).
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
      this.$http.get(`${this.$serverApiLink}api/admin/support/list/0/${this.offset}`).then(
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
    this.getTickets();
  }
}
</script>