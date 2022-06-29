<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('admin', 'key_94')"
          :drawer="true"
          :preview="false"
      />
      <Loader v-if="loading"/>
      <template v-else>
        <Container>
          <div class="d-flex justify-space-between align-center">
            <Title :title="`${$tr('admin', 'key_101')}`"/>
          </div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left" width="60px">

                </th>
                <th class="text-left">
                  {{ $tr('admin', 'key_95') }}
                </th>
                <th class="text-center" width="150px">
                  {{ $tr('admin', 'key_96') }}
                </th>
                <th class="text-right">
                  {{ $tr('admin', 'key_46') }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(item, i) in list"
                  :key="`${i}_d_method`"
              >
                <td class="text-left font-weight-bold pt-2 pb-2">
                  <img :src="item.logo" class="rounded-circle" width="40" alt=""/>
                </td>
                <td class="text-left">{{ item.name }}</td>
                <td class="text-center">
                  <v-chip
                      small
                      :class="!item.status ? 'danger_badge' : 'success_badge'"
                      v-text="!item.status ? $tr('project', 'key_44') : $tr('project', 'key_43')"
                  />
                </td>
                <td class="text-right">
                  <v-btn icon small color="orange" class="mr-3" @click="openEdit(i)">
                    <EditMiniIcon :size="16"/>
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </Container>
      </template>
    </v-main>
    <v-dialog
        scrollable
        max-width="560"
        v-model="edit.dialog"
    >
      <v-card flat tile>
        <v-card-title class="pa-0">
          <v-toolbar
              flat
              class="modal_bar"
          >
            <v-toolbar-title>
              {{ $tr('admin', 'key_100') }}
            </v-toolbar-title>
            <v-spacer/>
            <v-btn
                icon
                @click="edit.dialog = false"
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
                    :label="$tr('admin', 'key_95')"
                    outlined
                    color="primary"
                    dense
                    hide-details
                    v-model="edit.name"
                ></v-text-field>
              </v-col>
              <v-col md="12" sm="12" cols="12">
                <v-select
                    :items="statuses"
                    dense
                    hide-details
                    :label="$tr('admin', 'key_96')"
                    outlined
                    v-model="edit.status"
                ></v-select>
              </v-col>
              <v-col md="12" sm="12" cols="12">
                <v-text-field
                    :label="$tr('admin', 'key_97')"
                    outlined
                    color="primary"
                    dense
                    hide-details
                    v-model="edit.api_value_1"
                ></v-text-field>
              </v-col>
              <v-col md="12" sm="12" cols="12">
                <v-text-field
                    :label="$tr('admin', 'key_98')"
                    outlined
                    color="primary"
                    dense
                    hide-details
                    v-model="edit.api_value_2"
                ></v-text-field>
              </v-col>
              <v-col md="12" sm="12" cols="12">
                <v-text-field
                    :label="$tr('admin', 'key_99')"
                    outlined
                    color="primary"
                    dense
                    hide-details
                    v-model="edit.api_value_3"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider/>
        <v-container fluid class="text-right">
          <v-btn color="primary" depressed :loading="updating" @click="updateMethod">
            {{ $tr('project', 'key_173') }}
          </v-btn>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
import Container from "@/components/blocks/Container";
import Title from "@/components/blocks/Title";
import Loader from "@/components/blocks/Loader";
import EditMiniIcon from "@/components/icons/EditMiniIcon";
import CancelIcon from "@/components/icons/CancelIcon";

export default {
  name: 'Methods',
  components: {
    PageBar,
    Container,
    Title,
    Loader,
    EditMiniIcon,
    CancelIcon
  },
  data: () => ({
    loading: true,
    list: [],
    edit: {
      dialog: false,
      index: 0,
      name: "",
      api_value_1: "",
      api_value_2: "",
      api_value_3: "",
      status: 0
    },
    updating: false
  }),
  computed: {
    statuses: function () {
      return [
        {
          text: this.$tr('project', 'key_44'),
          value: 0
        },
        {
          text: this.$tr('project', 'key_43'),
          value: 1
        }
      ];
    },
  },
  methods: {
    openEdit(index) {
      this.edit = {
        dialog: true,
        index: index,
        name: this.list[index].name,
        api_value_1: this.list[index].api_value_1,
        api_value_2: this.list[index].api_value_2,
        api_value_3: this.list[index].api_value_3,
        status: this.list[index].status
      }
    },
    updateMethod() {
      this.updating = true;
      let index = this.edit.index;
      let params = new URLSearchParams();
      params.append('name', this.edit.name);
      params.append('status', this.edit.status);
      params.append('api_value_1', this.edit.api_value_1);
      params.append('api_value_2', this.edit.api_value_2);
      params.append('api_value_3', this.edit.api_value_3);
      this.$http.post(`${this.$serverApiLink}api/admin/deposit/update/${this.list[index].id}`, params).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.list[index].name = this.edit.name;
            this.list[index].status = this.edit.status;
            this.list[index].api_value_1 = this.edit.api_value_1;
            this.list[index].api_value_2 = this.edit.api_value_2;
            this.list[index].api_value_3 = this.edit.api_value_3;
            this.edit.dialog = false;
            this.updating = false;
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.updating = false;
          }
      );
    },
    getMethods() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/deposit/get`).
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
    },
  },
  mounted() {
    this.getMethods();
  }
}
</script>