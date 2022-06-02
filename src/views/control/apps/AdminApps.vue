<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('admin', 'key_3')"
          :drawer="true"
          :preview="false"
      />
      <Loader v-if="loading"/>
      <template v-else>
        <EmptyState
            v-if="list.length === 0"
            :title="$tr('admin', 'key_64')"
            :subtitle="$tr('admin', 'key_65')"
        >
          <template v-slot:icon>
            <div style="width: 45px; height: 45px">
              <FragmentIcon :size="45"/>
            </div>
          </template>
        </EmptyState>
        <Container v-else>
          <Title :title="`${$tr('admin', 'key_66')}: ${count}`"/>
          <v-list dense two-line class="pa-0 background_block">
            <div v-for="(item, index) in list" :key="'admin_app_'+index">
              <v-divider
                  v-if="index > 0"
                  :key="'admin_app_line'+index"
                  class="mb-1 mt-1"
              />
              <v-list-item
                  :key="'admin_app_item'+index"
                  class="pl-0 pr-0 pt-0 pb-0"
                  :to="{name: 'AdminMain', params: {uid: item.uid}}"
              >
                <v-list-item-action class="mr-5">
                  <AppIcon :image="item.icon" :size="36"/>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="smoke--text">
                    {{ item.link }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="mr-2">
                  <v-chip
                      small
                      :class="!item.status ? 'smoke_badge' : 'success_badge'"
                  >
                    {{ $tr("project", !item.status ? "key_25" : "key_19") }}
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
import FragmentIcon from "@/components/icons/FragmentIcon";
import AppIcon from "@/components/blocks/AppIcon";

export default {
  name: 'AdminApps',
  components: {
    PageBar,
    Container,
    Title,
    Loader,
    EmptyState,
    FragmentIcon,
    AppIcon
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
  }),
  methods: {
    getAppsList() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/app/list/${this.offset}`).
      then(
          response => {
            this.list = response.data.apps;
            this.loading = false;
            this.offset += 20;
            this.count = response.data.count;
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
      this.$http.get(`${this.$serverApiLink}api/admin/app/list/${this.offset}`).
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
    this.getAppsList();
  }
}
</script>