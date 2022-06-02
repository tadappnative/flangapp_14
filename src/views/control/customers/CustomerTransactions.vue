<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('admin', 'key_8')"
          :drawer="true"
          :preview="true"
      />
      <Loader v-if="loading"/>
      <template v-else>
        <EmptyState
            v-if="list.length === 0"
            :title="$tr('admin', 'key_53')"
            :subtitle="$tr('admin', 'key_54')"
        >
          <template v-slot:icon>
            <div style="width: 45px; height: 45px">
              <MoneyTransferIcon :size="45"/>
            </div>
          </template>
        </EmptyState>
        <Container v-else>
          <Title :title="`${$tr('admin', 'key_52')}: ${count}`"/>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  {{ $tr('admin', 'key_55') }}
                </th>
                <th class="text-let">
                  {{ $tr('admin', 'key_51') }}
                </th>
                <th class="text-right">
                  {{ $tr('admin', 'key_49') }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(item, i) in list"
                  :key="`${i}_admin_transaction`"
              >
                <td class="text-left">
                  <div>{{ item.created }}</div>
                  <div class="caption smoke--text">{{ item.uid }}</div>
                </td>
                <td class="text-let">
                  <div class="d-flex justify-start align-center">
                    <AppIcon :image="item.app.icon" :size="30"/>
                    <div class="ml-3">
                      <div>
                        {{ item.app.name }}
                      </div>
                      <div class="caption smoke--text">{{ item.app.uid }}</div>
                    </div>
                  </div>
                </td>
                <td class="text-right font-weight-bold">
                  {{ item.amount }} {{ currency }}
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
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
import MoneyTransferIcon from "@/components/icons/MoneyTransferIcon";
import AppIcon from "@/components/blocks/AppIcon";

export default {
  name: 'CustomerTransactions',
  components: {
    PageBar,
    Container,
    Title,
    Loader,
    EmptyState,
    MoneyTransferIcon,
    AppIcon
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
    currency: ""
  }),
  methods: {
    getTransaction() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/transactions/get_user/${this.offset}/${this.$route.params.id}`).
      then(
          response => {
            this.list = response.data.list;
            this.offset += 20;
            this.count = response.data.count;
            this.currency = response.data.currency;
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
      this.$http.get(`${this.$serverApiLink}api/admin/transactions/get_user/${this.offset}/${this.$route.params.id}`).
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
    this.getTransaction();
  }
}
</script>