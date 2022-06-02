<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="loading ? $tr('project', 'key_245') : ticket.title"
          :preview="true"
          back
      />
      <Loader v-if="loading"/>
      <Container v-else>
        <v-card
            v-for="(comment, index) in list"
            :key="'ticket_admin_comment_'+index"
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
              <div>
                <div class="font-weight-medium font-weight-bold">
                  {{ !comment.admin ? $tr('admin', 'key_50') : $tr('project', 'key_247') }}
                </div>
                <div v-if="!comment.admin" class="caption smoke--text">
                  {{ user.email }}
                </div>
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
          <div class="pa-4" v-if="comment.estimation">
            <div class="d-flex justify-start align-center">
              <v-icon
                  :color="comment.estimation === 1 ? 'danger' : comment.estimation === 2 ? 'warning' : 'success'"
                  v-text="comment.estimation === 1
                    ? 'mdi-emoticon-confused'
                    : comment.estimation === 2
                      ? 'mdi-emoticon-happy'
                      : 'mdi-emoticon-excited'"
              />
              <div :class="`ml-3 caption ${comment.estimation === 1
                ? 'danger--text'
                : comment.estimation === 2
                  ? 'warning--text'
                  : 'success--text'
              }`">
                {{ $tr('project', comment.estimation === 1 ? 'key_248' : comment.estimation === 2 ? 'key_249' : 'key_250') }}
              </div>
            </div>
          </div>
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

export default {
  name: 'Comments',
  components: {
    PageBar,
    Loader,
    Container,
    UserIcon,
    ClockIcon,
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
    change_load: false,
    user: {
      id: 0,
      email: ""
    }
  }),
  methods: {
    createComment() {
      this.create.loading = true;
      let params = new URLSearchParams();
      params.append('message', this.create.message);
      this.$http.post(`${this.$serverApiLink}api/admin/support/create_comment/${this.$route.params.ticket_uid}`, params).
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
      this.$http.get(`${this.$serverApiLink}api/admin/support/comments/${this.$route.params.ticket_uid}`).
      then(
          response => {
            this.list = response.data.list;
            this.ticket = response.data.ticket;
            this.user = response.data.user;
            this.loading = false;
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.$router.push({name: 'AdminTickets'});
            this.loading = false;
          }
      );
    }
  },
  mounted() {
    this.getTicketDetail();
  }
}
</script>