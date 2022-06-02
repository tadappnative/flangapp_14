<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('admin', 'key_2')"
          :drawer="true"
          :preview="false"
      />
      <Container>
        <Title :title="`${$tr('admin', 'key_67')}: ${count}`"/>
        <v-text-field
            :label="$tr('admin', 'key_68')"
            outlined
            color="primary"
            dense
            v-model="search"
        ></v-text-field>
        <Loader v-if="loading"/>
        <v-list v-else dense two-line class="pa-0 background_block">
          <div v-for="(item, index) in list" :key="'customer_'+index">
            <v-divider
                v-if="index > 0"
                :key="'customer_line'+index"
                class="mb-1 mt-1"
            />
            <v-list-item
                :key="'customer_item'+index"
                class="pl-0 pr-0 pt-0 pb-0"
                :to="{name: 'CustomerProfile', params: {id: item.id}}"
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
                  <UserIcon :size="24"/>
                </div>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">
                  {{ item.email }}
                </v-list-item-title>
                <v-list-item-subtitle class="smoke--text">
                  {{ item.created }}
                </v-list-item-subtitle>
              </v-list-item-content>
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
    </v-main>
  </v-layout>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
import Container from "@/components/blocks/Container";
import Title from "@/components/blocks/Title";
import Loader from "@/components/blocks/Loader";
import UserIcon from "@/components/icons/UserIcon";

export default {
  name: 'Customers',
  components: {
    PageBar,
    Container,
    Title,
    Loader,
    UserIcon
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
    search: ""
  }),
  watch: {
    search: function () {
      this.loading = true;
      this.offset = 0;
      this.list = [];
      this.loadBtn = {
        status: true,
        loading: false
      }
      this.getUsers();
    }
  },
  methods: {
    getUsers() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/users/list/${this.offset}?search=${this.search}`).
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
      this.$http.get(`${this.$serverApiLink}api/admin/users/list/${this.offset}?search=${this.search}`).then(
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
    this.getUsers();
  }
}
</script>