<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_26')"
          :preview="false"
          drawer
      />
      <Loader v-if="loading"/>
      <template v-else>
        <EmptyState
            v-if="list.length === 0"
            :title="$tr('project', 'key_228')"
            :subtitle="$tr('project', 'key_229')"
        >
          <template v-slot:icon>
            <div style="width: 45px; height: 45px">
              <BillIcon :size="45"/>
            </div>
          </template>
        </EmptyState>
        <Container v-else>
          <Title :title="`${$tr('project', 'key_231')}: ${count}`"/>
          <v-list dense two-line class="pa-0 background_block">
            <div v-for="(transaction, index) in list" :key="'transaction_'+index">
              <v-divider
                  v-if="index > 0"
                  :key="'transaction_line_bar'+index"
                  class="mb-1 mt-1"
              />
              <v-list-item
                  :key="'transaction_select_item_bar'+index"
                  class="pl-0 pr-0 pt-0 pb-0"
              >
                <v-list-item-avatar
                    size="50"
                    color="whitesmoke"
                    class="mt-0 mb-0"
                >
                  <div
                      class="d-flex justify-center align-center smoke--text"
                      style="width: 50px; height: 50px;"
                  >
                    <div style="width: 28px; height: 28px;">
                      <CreditCardIcon/>
                    </div>
                  </div>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">
                    {{ transaction.app.name }}
                    {{ transaction.quantity }}
                    {{ $tr('project', 'key_203') }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="smoke--text">
                    {{ transaction.created }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <div class="body-1 black--text font-weight-medium">
                    {{ transaction.amount }} {{ currency.symbol }}
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
    </v-main>
  </v-layout>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
import Loader from "@/components/blocks/Loader";
import EmptyState from "@/components/blocks/EmptyState";
import Title from "@/components/blocks/Title";
import Container from "@/components/blocks/Container";
import CreditCardIcon from "@/components/icons/CreditCardIcon";
import BillIcon from "@/components/icons/BillIcon";
export default {
  name: 'Transactions',
  components: {
    PageBar,
    Loader,
    EmptyState,
    Title,
    Container,
    CreditCardIcon,
    BillIcon
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
    currency: {
      code: "",
      symbol: ""
    },
  }),
  methods: {
    getTransactionsList() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/transactions/list/${this.offset}`).
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
      this.$http.get(`${this.$serverApiLink}api/account/transactions/list/${this.offset}`).
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
    this.getTransactionsList();
  }
}
</script>