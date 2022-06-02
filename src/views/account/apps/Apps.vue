<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_1')"
          :preview="false"
          drawer
      />
      <Loader v-if="loading"/>
      <template v-else>
        <EmptyState
            v-if="list.length === 0"
            :title="$tr('project', 'key_20')"
            :subtitle="$tr('project', 'key_21')"
        >
          <template v-slot:icon>
            <FragmentIcon/>
          </template>
          <template v-slot:action>
            <v-btn
                depressed
                outlined
                color="primary"
                large
                @click="$emit('open_launcher')"
            >
              {{ $tr('project', 'key_2') }}
            </v-btn>
          </template>
        </EmptyState>
        <v-container v-else fluid>
          <div class="app_grid">
            <div v-for="(app, index) in list" :key="'app_'+index">
              <router-link :to="{name: 'Main', params: {uid: app.uid}}" style="color: inherit">
                <div class="app_card">
                  <div style="margin-right: 20px">
                    <AppIcon :image="!app.icon ? null : app.icon"/>
                  </div>
                  <div>
                    <div class=" font-weight-bold d-inline-block text-truncate" style="max-width: 280px; margin-bottom: 0;">
                      {{ app.name }}
                    </div>
                    <div class="caption text-truncate" style="max-width: 280px; margin-bottom: 6px">
                      {{ app.link }}
                    </div>
                    <div>
                      <StatusBadge :status="!app.status ? false : true"/>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div
              v-if="loadBtn.status && count > 20"
              class="d-flex justify-center mt-8 mb-5"
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
        </v-container>
      </template>
    </v-main>
  </v-layout>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
import Loader from "@/components/blocks/Loader";
import EmptyState from "@/components/blocks/EmptyState";
import FragmentIcon from "@/components/icons/FragmentIcon";
import AppIcon from "@/components/blocks/AppIcon";
import StatusBadge from "@/components/blocks/StatusBadge";
export default {
  name: 'Apps',
  components: {
    PageBar,
    Loader,
    EmptyState,
    FragmentIcon,
    AppIcon,
    StatusBadge
  },
  data: () => ({
    sort: 0,
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
      this.$http.get(`${this.$serverApiLink}api/account/apps/list/${this.sort}/${this.offset}`).
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
      this.$http.get(`${this.$serverApiLink}api/account/apps/list/${this.sort}/${this.offset}`).
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