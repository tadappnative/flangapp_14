<template>
  <div class="bar_padding">
    <PageBar :title="$tr('menu', 'key_2')" :preview="false"/>
    <v-list nav class="pt-0 pb-0">
      <div class="d-flex justify-space-between align-center">
        <v-subheader class="font-weight-medium smoke--text">
          {{ $tr('menu', 'key_30') }}
        </v-subheader>
        <v-tooltip
            bottom
            color="blue_dark"
            max-width="200"
        >
          <template v-slot:activator="{ on }">
            <v-icon size="16" style="top: 3px" color="primary" v-on="on">
              mdi-help-circle-outline
            </v-icon>
          </template>
          {{ $tr('project', 'key_281') }}
        </v-tooltip>
      </div>
      <div v-if="loading">
        <v-skeleton-loader
            v-for="n in 5"
            :key="'load_app_item_'+n"
            type="list-item-avatar-two-line"
            class="mb-3"
        />
      </div>
      <template v-else>
        <v-list-item v-if="!list.length">
          <v-list-item-content>
            <v-list-item-title class="black--text" v-text="$tr('project', 'key_282')"/>
          </v-list-item-content>
        </v-list-item>
        <v-list-item-group color="rgba(153, 162, 173, 1)">
          <v-list-item
              v-for="(item, index) in list"
              :key="'newsletter_apps_'+index"
              :to="{name: 'Newsletter', query: { uid: item.uid }}" exact
          >
            <v-list-item-avatar class="null_border_radius" size="34">
              <AppIcon :size="34" :image="!item.icon ? null : item.icon"/>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="black--text" v-text="item.name"/>
              <v-list-item-subtitle class="caption smoke--text" v-text="item.link"/>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </template>
    </v-list>
  </div>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
import AppIcon from "@/components/blocks/AppIcon";
export default {
  name: 'NewsletterSidebar',
  components: {
    PageBar,
    AppIcon
  },
  data: () => ({
    loading: true,
    list: []
  }),
  watch: {

  },
  methods: {
    getAppsList() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/newsletter/apps`).
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
    }
  },
  mounted() {
    this.getAppsList();
  }
}
</script>