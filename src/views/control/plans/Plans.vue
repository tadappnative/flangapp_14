<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('admin', 'key_9')"
          :drawer="true"
          :preview="false"
      />
      <Loader v-if="loading"/>
      <template v-else>
        <EmptyState
            v-if="list.length === 0"
            :title="$tr('admin', 'key_44')"
            :subtitle="$tr('admin', 'key_45')"
        >
          <template v-slot:icon>
            <div style="width: 45px; height: 45px">
              <TagIcon :size="45"/>
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
              {{ $tr('admin', 'key_42') }}
            </v-btn>
          </template>
        </EmptyState>
        <Container v-else>
          <div class="d-flex justify-space-between align-center">
            <Title :title="`${$tr('admin', 'key_43')}`"/>
            <v-btn
                small
                depressed
                color="primary"
                class="mb-5"
                @click="create.status = true"
            >
              {{ $tr('admin', 'key_42') }}
            </v-btn>
          </div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left" width="150px">
                  {{ $tr('admin', 'key_39') }}
                </th>
                <th class="text-center" width="150px">
                  {{ $tr('admin', 'key_40') }}
                </th>
                <th class="text-center" width="150px">
                  {{ $tr('admin', 'key_41') }}
                </th>
                <th class="text-right">
                  {{ $tr('admin', 'key_46') }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(item, i) in list"
                  :key="`${i}_plan`"
              >
                <td class="text-left font-weight-bold">{{ item.count }}</td>
                <td class="text-center">{{ item.price }} {{ currency }}</td>
                <td class="text-center">{{ item.save }} {{ currency }}</td>
                <td class="text-right">
                  <div>
                    <v-btn icon small color="orange" class="mr-3" @click="openEdit(i)">
                      <EditMiniIcon :size="16"/>
                    </v-btn>
                    <v-btn icon small color="danger" @click="removePlan(i)">
                      <DeleteMiniIcon :size="16"/>
                    </v-btn>
                  </div>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </Container>
      </template>
      <v-dialog
          scrollable
          max-width="560"
          v-model="create.status"
      >
        <v-card flat tile>
          <v-card-title class="pa-0">
            <v-toolbar
                flat
                class="modal_bar"
            >
              <v-toolbar-title>
                {{ $tr('admin', 'key_47') }}
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
                      :label="$tr('admin', 'key_39')"
                      outlined
                      autofocus
                      color="primary"
                      dense
                      hide-details
                      v-model="create.count"
                  ></v-text-field>
                </v-col>
                <v-col md="6" sm="12" cols="12">
                  <v-text-field
                      :label="`${$tr('admin', 'key_40')}, ${currency}`"
                      outlined
                      autofocus
                      color="primary"
                      dense
                      hide-details
                      v-model.number="create.price"
                  ></v-text-field>
                </v-col>
                <v-col md="6" sm="12" cols="12">
                  <v-text-field
                      :label="`${$tr('admin', 'key_41')}, ${currency}`"
                      outlined
                      autofocus
                      color="primary"
                      dense
                      hide-details
                      v-model.number="create.save"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider/>
          <v-container fluid class="text-right">
            <v-btn color="primary" depressed :loading="create.loading" @click="createPlan">
              {{ $tr('project', 'key_238') }}
            </v-btn>
          </v-container>
        </v-card>
      </v-dialog>
      <v-dialog
          scrollable
          max-width="560"
          v-model="edit.status"
      >
        <v-card flat tile>
          <v-card-title class="pa-0">
            <v-toolbar
                flat
                class="modal_bar"
            >
              <v-toolbar-title>
                {{ $tr('admin', 'key_48') }}
              </v-toolbar-title>
              <v-spacer/>
              <v-btn
                  icon
                  @click="edit.status = false"
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
                      :label="$tr('admin', 'key_39')"
                      outlined
                      color="primary"
                      dense
                      hide-details
                      v-model="edit.count"
                  ></v-text-field>
                </v-col>
                <v-col md="6" sm="12" cols="12">
                  <v-text-field
                      :label="`${$tr('admin', 'key_40')}, ${currency}`"
                      outlined
                      color="primary"
                      dense
                      hide-details
                      v-model.number="edit.price"
                  ></v-text-field>
                </v-col>
                <v-col md="6" sm="12" cols="12">
                  <v-text-field
                      :label="`${$tr('admin', 'key_41')}, ${currency}`"
                      outlined
                      color="primary"
                      dense
                      hide-details
                      v-model.number="edit.save"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider/>
          <v-container fluid class="text-right">
            <v-btn color="primary" depressed :loading="create.loading" @click="updatePlan">
              {{ $tr('project', 'key_173') }}
            </v-btn>
          </v-container>
        </v-card>
      </v-dialog>
    </v-main>
  </v-layout>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
import Container from "@/components/blocks/Container";
import Title from "@/components/blocks/Title";
import Loader from "@/components/blocks/Loader";
import EmptyState from "@/components/blocks/EmptyState";
import TagIcon from "@/components/icons/TagIcon";
import EditMiniIcon from "@/components/icons/EditMiniIcon";
import DeleteMiniIcon from "@/components/icons/DeleteMiniIcon";
import CancelIcon from "@/components/icons/CancelIcon";

export default {
  name: 'Plans',
  components: {
    PageBar,
    Container,
    Title,
    Loader,
    EmptyState,
    TagIcon,
    EditMiniIcon,
    DeleteMiniIcon,
    CancelIcon
  },
  data: () => ({
    loading: true,
    list: [],
    currency: "",
    create: {
      status: false,
      loading: false,
      count: 1,
      price: 10,
      save: 0
    },
    edit: {
      status: false,
      loading: false,
      index: 0,
      count: 1,
      price: 10,
      save: 0
    }
  }),
  methods: {
    openEdit(index) {
      this.edit = {
        status: true,
        loading: false,
        index: index,
        count: this.list[index].count,
        price: this.list[index].price,
        save: this.list[index].save
      }
    },
    removePlan(index) {
      this.$store.commit('setLoading', true);
      this.$http.get(`${this.$serverApiLink}api/admin/plans/remove/${this.list[index].id}`).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.list.splice(index, 1);
            this.$store.commit('setLoading', false);
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
    updatePlan() {
      this.edit.loading = true;
      let index = this.edit.index;
      let params = new URLSearchParams();
      params.append('count', this.edit.count);
      params.append('price', this.edit.price);
      params.append('save', this.edit.save);
      this.$http.post(`${this.$serverApiLink}api/admin/plans/update/${this.list[index].id}`, params).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            let price = this.edit.price * 1;
            let save = this.edit.save * 1;
            this.list[index].count = this.edit.count;
            this.list[index].price = price.toFixed(2);
            this.list[index].save = save.toFixed(2);
            this.edit = {
              status: false,
              loading: false,
              index: 0,
              count: 1,
              price: 10,
              save: 0
            }
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
    createPlan() {
      this.create.loading = true;
      let params = new URLSearchParams();
      params.append('count', this.create.count);
      params.append('price', this.create.price);
      params.append('save', this.create.save);
      this.$http.post(`${this.$serverApiLink}api/admin/plans/create`, params).
      then(
          response => {
            this.list.push({
              id: response.data.id,
              count: this.create.count,
              price: this.create.price.toFixed(2),
              save: this.create.save.toFixed(2)
            });
            this.create = {
              status: false,
              loading: false,
              count: 1,
              price: 10,
              save: 0
            }
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
    getPlans() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/plans/get`).
      then(
          response => {
            this.list = response.data.list;
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
  },
  mounted() {
    this.getPlans();
  }
}
</script>