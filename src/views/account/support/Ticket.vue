<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="loading ? $tr('project', 'key_245') : ticket.title"
          :preview="false"
          back
      >
        <template v-slot:actions>
          <template v-if="!loading">
            <v-tooltip left color="blue_dark">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    color="primary"
                    @click="changeStatus"
                >
                  <ArchiveIcon v-if="ticket.status !== 2"/>
                  <UnarchiveIcon v-else/>
                </v-btn>
              </template>
              <span v-text="ticket.status !== 2 ? $tr('project', 'key_253') : $tr('project', 'key_254')" />
            </v-tooltip>
          </template>
        </template>
      </PageBar>
      <Loader v-if="loading"/>
      <Container v-else>
        <v-card
            v-for="(comment, index) in list"
            :key="'ticket_comment_'+index"
            outlined
            class="mb-3"
            style="background: transparent"
        >
          <div class="pa-4 d-flex justify-space-between align-center">
            <div class="d-flex justify-start align-center">
              <v-avatar
                  :size="37"
                  :color="!comment.admin ? 'smoke' : 'primary'"
                  class="mr-3 white--text"
              >
                <div style="width: 22px; height: 22px">
                  <UserIcon :size="22"/>
                </div>
              </v-avatar>
              <div class="font-weight-medium font-weight-bold">
                {{ !comment.admin ? $tr('project', 'key_246') : $tr('project', 'key_247') }}
              </div>
            </div>
            <div class="d-flex justify-start align-center">
              <div class="smoke--text mr-2">
                <ClockIcon :size="12"/>
              </div>
              <div class="caption smoke--text">
                {{ comment.created }}
              </div>
            </div>
          </div>
          <v-divider/>
          <div class="pa-4 body-2" style="white-space: pre-line">
            {{ comment.message }}
          </div>
          <Rate
              v-if="comment.admin"
              :index="index"
              :current="comment.estimation"
              @set="setRate"
          />
        </v-card>

        <v-card
            v-if="ticket.status !== 2"
            outlined
            class="mb-3"
            style="background: transparent"
        >
          <v-row class="pa-4">
            <v-col md="12" sm="12" cols="12">
              <v-textarea
                  :label="$tr('project', 'key_252')"
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
          <v-divider/>
          <v-container fluid class="text-right">
            <v-btn depressed color="primary" :loading="create.loading" @click="createComment">
              {{ $tr('project', 'key_238') }}
            </v-btn>
          </v-container>
        </v-card>
      </Container>
    </v-main>
  </v-layout>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
import Loader from "@/components/blocks/Loader";
import Container from "@/components/blocks/Container";
import UserIcon from "@/components/icons/UserIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import Rate from "@/components/form/Rate";
import ArchiveIcon from "@/components/icons/ArchiveIcon";
import UnarchiveIcon from "@/components/icons/UnarchiveIcon";

export default {
  name: 'Ticket',
  components: {
    PageBar,
    Loader,
    Container,
    UserIcon,
    ClockIcon,
    Rate,
    ArchiveIcon,
    UnarchiveIcon
  },
  data: () => ({
    loading: true,
    ticket: {
      title: "",
      uid: "",
      status: 0
    },
    list: [],
    create: {
      message: "",
      loading: false
    },
    change_load: false
  }),
  methods: {
    createComment() {
      this.create.loading = true;
      let params = new URLSearchParams();
      params.append('message', this.create.message);
      this.$http.post(`${this.$serverApiLink}api/account/support/create_comment/${this.$route.params.ticket_uid}`, params).
      then(
          response => {
            this.list.push({
              uid: response.data.uid,
              message: this.create.message,
              created: response.data.created,
              estimation: 0,
              admin: false,
              loading: false
            });
            this.create.message = "";
            this.create.loading = false;
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
    getTicketDetail() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/support/comments/${this.$route.params.ticket_uid}`).
      then(
          response => {
            this.list = response.data.list;
            this.ticket = response.data.ticket;
            this.loading = false;
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.$router.push({name: 'SupportPendingList'});
            this.loading = false;
          }
      );
    },
    changeStatus() {
      this.$store.commit('setLoading', true);
      this.$http.get(`${this.$serverApiLink}api/account/support/change_status/${this.$route.params.ticket_uid}`).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.ticket.status = this.ticket.status !== 2 ? 2 : 0;
            this.$store.commit('setLoading', false);
            this.$store.commit('setSnackBar', {
              code: 200,
              message: [this.$tr("project", this.ticket.status !== 2 ? "key_280" : "key_279")]
            });
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
    setRate(object) {
      this.$store.commit('setLoading', true);
      let params = new URLSearchParams();
      params.append('estimation', object.value);
      this.$http.post(`${this.$serverApiLink}api/account/support/change_rate/${this.list[object.index].uid}`, params).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.$store.commit('setLoading', false);
            this.list[object.index].estimation = object.value;
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
    }
  },
  mounted() {
    this.getTicketDetail();
  }
}
</script>