<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_22')"
          :tabs="tabs"
          :drawer="true"
          @onChange="updateTab"
      />
      <Loader v-if="loading"/>
      <template v-else>
        <template v-if="!tab">
          <Container>
            <div class="d-flex justify-space-between align-center">
              <Title :title="$tr('project', 'key_52')"/>
              <v-btn
                  small
                  depressed
                  color="primary"
                  outlined
                  class="mb-5"
                  @click="dialog.status = true"
              >
                {{ $tr('project', 'key_53') }}
              </v-btn>
            </div>
            <EmptyList v-if="!navigation.list.length"/>
            <v-list dense two-line class="pa-0 background_block" v-else>
              <div v-for="(item, index) in navigation.list" :key="'menu_item_app_'+index">
                <v-divider
                    v-if="index > 0"
                    :key="'menu_line_'+index"
                />
                <v-list-item
                    :key="'menu_select_item_'+index"
                    class="pl-0 pr-0 pt-0 pb-0"
                >
                  <v-list-item-avatar
                      size="40"
                      color="whitesmoke"
                      class="mt-0 mb-0"
                  >
                    <div
                        class="d-flex justify-center align-center black--text"
                        style="width: 40px; height: 40px; font-size: 18px"
                    >
                      <ion-icon
                          :name="item.icon"
                      ></ion-icon>
                    </div>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="smoke--text">
                      {{ actions[item.type].text }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <div>
                      <v-btn icon small color="orange" class="mr-3" @click="openAppUpdate(index)">
                        <EditMiniIcon :size="16"/>
                      </v-btn>
                      <v-btn icon small color="danger" @click="deleteAppItem(index)">
                        <DeleteMiniIcon :size="16"/>
                      </v-btn>
                    </div>
                  </v-list-item-action>
                </v-list-item>
              </div>
            </v-list>
          </Container>
        </template>
        <template v-else-if="tab === 1">
          <Container>
            <div class="d-flex justify-space-between align-center">
              <Title :title="$tr('project', 'key_45')"/>
              <v-btn
                  small
                  depressed
                  color="primary"
                  outlined
                  class="mb-5"
                  @click="dialogBar.status = true"
              >
                {{ $tr('project', 'key_53') }}
              </v-btn>
            </div>
            <EmptyList v-if="!bar.list.length"/>
            <v-list dense two-line class="pa-0 background_block" v-else>
              <div v-for="(item, index) in bar.list" :key="'menu_item_bar_'+index">
                <v-divider
                    v-if="index > 0"
                    :key="'menu_line_bar_'+index"
                />
                <v-list-item
                    :key="'menu_bar_item_'+index"
                    class="pl-0 pr-0 pt-0 pb-0"
                >
                  <v-list-item-avatar
                      size="40"
                      color="whitesmoke"
                      class="mt-0 mb-0"
                  >
                    <div
                        class="d-flex justify-center align-center black--text"
                        style="width: 40px; height: 40px; font-size: 18px"
                    >
                      <ion-icon
                          :name="item.icon"
                      ></ion-icon>
                    </div>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="smoke--text">
                      {{ actions[item.type].text }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <div>
                      <v-btn icon small color="orange" class="mr-3" @click="openBarUpdate(index)">
                        <EditMiniIcon :size="16"/>
                      </v-btn>
                      <v-btn icon small color="danger" @click="deleteBarItem(index)">
                        <DeleteMiniIcon :size="16"/>
                      </v-btn>
                    </div>
                  </v-list-item-action>
                </v-list-item>
              </div>
            </v-list>
          </Container>
        </template>
        <template v-else-if="tab === 2">
          <Container>
            <div class="d-flex justify-space-between align-center">
              <Title :title="$tr('project', 'key_52')"/>
              <v-btn
                  small
                  depressed
                  color="primary"
                  outlined
                  class="mb-5"
                  @click="dialogModal.status = true"
              >
                {{ $tr('project', 'key_53') }}
              </v-btn>
            </div>
            <EmptyList v-if="!modal.list.length"/>
            <v-list dense two-line class="pa-0 background_block" v-else>
              <div v-for="(item, index) in modal.list" :key="'menu_item_bar_'+index">
                <v-divider
                    v-if="index > 0"
                    :key="'menu_line_modal_'+index"
                />
                <v-list-item
                    :key="'menu_modal_item_'+index"
                    class="pl-0 pr-0 pt-0 pb-0"
                >
                  <v-list-item-avatar
                      size="40"
                      color="whitesmoke"
                      class="mt-0 mb-0"
                  >
                    <div
                        class="d-flex justify-center align-center black--text"
                        style="width: 40px; height: 40px; font-size: 18px"
                    >
                      <ion-icon
                          :name="item.icon"
                      ></ion-icon>
                    </div>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="smoke--text">
                      {{ actions[item.type].text }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <div>
                      <v-btn icon small color="orange" class="mr-3" @click="openModalUpdate(index)">
                        <EditMiniIcon :size="16"/>
                      </v-btn>
                      <v-btn icon small color="danger" @click="deleteModalItem(index)">
                        <DeleteMiniIcon :size="16"/>
                      </v-btn>
                    </div>
                  </v-list-item-action>
                </v-list-item>
              </div>
            </v-list>
          </Container>
        </template>
      </template>
      <v-dialog
          scrollable
          max-width="680"
          v-model="dialog.status"
      >
        <NewNavigation
            :loading="dialog.loading"
            ref="newApp"
            @close="dialog.status = false"
            @save="createAppItem"
        />
      </v-dialog>
      <v-dialog
          scrollable
          max-width="680"
          v-model="edit.status"
      >
        <NewNavigation
            v-if="edit.status"
            :item-name="navigation.list[edit.index].name"
            :item-link="navigation.list[edit.index].link"
            :item-action="navigation.list[edit.index].type"
            :item-icon="navigation.list[edit.index].icon"
            :loading="edit.loading"
            @close="edit.status = false"
            @save="updateAppItem"
        />
      </v-dialog>
      <v-dialog
          scrollable
          max-width="680"
          v-model="dialogBar.status"
      >
        <NewNavigation
            :loading="dialogBar.loading"
            ref="newBar"
            @close="dialogBar.status = false"
            @save="createBarItem"
        />
      </v-dialog>
      <v-dialog
          scrollable
          max-width="680"
          v-model="dialogModal.status"
      >
        <NewNavigation
            :loading="dialogModal.loading"
            ref="newModal"
            @close="dialogModal.status = false"
            @save="createModalItem"
        />
      </v-dialog>
      <v-dialog
          scrollable
          max-width="680"
          v-model="editBar.status"
      >
        <NewNavigation
            v-if="editBar.status"
            :item-name="bar.list[editBar.index].name"
            :item-link="bar.list[editBar.index].link"
            :item-action="bar.list[editBar.index].type"
            :item-icon="bar.list[editBar.index].icon"
            :loading="editBar.loading"
            @close="editBar.status = false"
            @save="updateBarItem"
        />
      </v-dialog>
      <v-dialog
          scrollable
          max-width="680"
          v-model="editModal.status"
      >
        <NewNavigation
            v-if="editModal.status"
            :item-name="modal.list[editModal.index].name"
            :item-link="modal.list[editModal.index].link"
            :item-action="modal.list[editModal.index].type"
            :item-icon="modal.list[editModal.index].icon"
            :loading="editModal.loading"
            @close="editModal.status = false"
            @save="updateModalItem"
        />
      </v-dialog>
    </v-main>
  </v-layout>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
import Container from "@/components/blocks/Container";
import Title from "@/components/blocks/Title";
import Loader from "@/components/blocks/Loader";
import EmptyList from "@/views/account/apps/builder/components/EmptyList";
import NewNavigation from "@/views/account/apps/builder/modals/NewNavigation";
import DeleteMiniIcon from "@/components/icons/DeleteMiniIcon";
import EditMiniIcon from "@/components/icons/EditMiniIcon";

export default {
  name: 'Navigation',
  components: {
    PageBar,
    Container,
    Title,
    Loader,
    EmptyList,
    NewNavigation,
    DeleteMiniIcon,
    EditMiniIcon
  },
  data: () => ({
    loading: true,
    tab: 0,
    navigation: {
      list: [],
      count: 0
    },
    bar: {
      list: [],
      count: 0
    },
    modal: {
      list: [],
      count: 0
    },
    dialog: {
      status: false,
      loading: false
    },
    edit: {
      status: false,
      loading: false,
      index: 0
    },
    dialogBar: {
      status: false,
      loading: false
    },
    editBar: {
      status: false,
      loading: false,
      index: 0
    },
    dialogModal: {
      status: false,
      loading: false
    },
    editModal: {
      status: false,
      loading: false,
      index: 0
    },
  }),
  computed: {
    tabs: function () {
      return [
        this.$tr('project', 'key_118'),
        this.$tr('project', 'key_45'),
        this.$tr('project', 'key_327')
      ];
    },
    actions: function () {
      return [
        {
          text: this.$tr('project', 'key_57'),
          value: 0
        },
        {
          text: this.$tr('project', 'key_58'),
          value: 1
        },
        {
          text: this.$tr('project', 'key_59'),
          value: 2
        },
        {
          text: this.$tr('project', 'key_60'),
          value: 3
        },
        {
          text: this.$tr('project', 'key_298'),
          value: 4
        },
        {
          text: this.$tr('project', 'key_328'),
          value: 5
        },
      ];
    }
  },
  methods: {
    updateTab(value) {
      this.tab = value;
    },
    openAppUpdate(index) {
      this.edit = {
        status: true,
        loading: false,
        index: index
      }
    },
    openBarUpdate(index) {
      this.editBar = {
        status: true,
        loading: false,
        index: index
      }
    },
    openModalUpdate(index) {
      this.editModal = {
        status: true,
        loading: false,
        index: index
      }
    },
    deleteAppItem(index) {
      this.$store.commit('setLoading', true);
      this.$http.get(`${this.$serverApiLink}api/account/navigation/remove/${this.navigation.list[index].id}`).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.navigation.list.splice(index, 1);
            this.$emit("reload_preview", {
              uid: this.$route.params.uid,
              mode: "app"
            });
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
    deleteBarItem(index) {
      this.$store.commit('setLoading', true);
      this.$http.get(`${this.$serverApiLink}api/account/bar/remove/${this.bar.list[index].id}`).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.bar.list.splice(index, 1);
            this.$emit("reload_preview", {
              uid: this.$route.params.uid,
              mode: "app"
            });
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
    createModalItem(value) {
      this.dialogModal.loading = true;
      let params = new URLSearchParams();
      params.append('link', value.link);
      params.append('name', value.name);
      params.append('action_type', value.action);
      params.append('icon', value.icon);
      this.$http.post(`${this.$serverApiLink}api/account/modal/create/${this.$route.params.uid}`, params).then(
          response => {
            this.modal.list.push({
              name: value.name,
              link: value.link,
              type: value.action,
              icon: value.icon,
              id: response.data.id
            });
            this.dialogModal = {
              loading: false,
              status: false
            };
            this.$emit("reload_preview", {
              uid: this.$route.params.uid,
              mode: "app"
            });
            this.$refs.newModal.clean();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.dialogModal.loading = false;
          }
      );
    },
    deleteModalItem(index) {
      this.$store.commit('setLoading', true);
      this.$http.get(`${this.$serverApiLink}api/account/modal/remove/${this.modal.list[index].id}`).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.modal.list.splice(index, 1);
            this.$emit("reload_preview", {
              uid: this.$route.params.uid,
              mode: "app"
            });
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
    updateModalItem(value) {
      this.editModal.loading = true;
      let id = this.modal.list[this.editModal.index].id;
      let params = new URLSearchParams();
      params.append('link', value.link);
      params.append('name', value.name);
      params.append('action_type', value.action);
      params.append('icon', value.icon);
      this.$http.post(`${this.$serverApiLink}api/account/modal/update/${id}`, params).
      then(
          () => {
            this.modal.list[this.editModal.index] = {
              name: value.name,
              link: value.link,
              type: value.action,
              icon: value.icon,
              id: this.modal.list[this.editModal.index].id
            };
            this.editModal = {
              status: false,
              loading: false,
              index: 0
            };
            this.$emit("reload_preview", {
              uid: this.$route.params.uid,
              mode: "app"
            });
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.editModal.loading = false;
          }
      );
    },
    createBarItem(value) {
      this.dialogBar.loading = true;
      let params = new URLSearchParams();
      params.append('link', value.link);
      params.append('name', value.name);
      params.append('action_type', value.action);
      params.append('icon', value.icon);
      this.$http.post(`${this.$serverApiLink}api/account/bar/create/${this.$route.params.uid}`, params).then(
          response => {
            this.bar.list.push({
              name: value.name,
              link: value.link,
              type: value.action,
              icon: value.icon,
              id: response.data.id
            });
            this.dialogBar = {
              loading: false,
              status: false
            };
            this.$emit("reload_preview", {
              uid: this.$route.params.uid,
              mode: "app"
            });
            this.$refs.newBar.clean();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.dialogBar.loading = false;
          }
      );
    },
    createAppItem(value) {
      this.dialog.loading = true;
      let params = new URLSearchParams();
      params.append('link', value.link);
      params.append('name', value.name);
      params.append('action_type', value.action);
      params.append('icon', value.icon);
      this.$http.post(`${this.$serverApiLink}api/account/navigation/create/${this.$route.params.uid}`, params).
      then(
          response => {
            this.navigation.list.push({
              name: value.name,
              link: value.link,
              type: value.action,
              icon: value.icon,
              id: response.data.id
            });
            this.dialog = {
              loading: false,
              status: false
            };
            this.$emit("reload_preview", {
              uid: this.$route.params.uid,
              mode: "app"
            });
            this.$refs.newApp.clean();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.dialog.loading = false;
          }
      );
    },
    updateAppItem(value) {
      this.edit.loading = true;
      let id = this.navigation.list[this.edit.index].id;
      let params = new URLSearchParams();
      params.append('link', value.link);
      params.append('name', value.name);
      params.append('action_type', value.action);
      params.append('icon', value.icon);
      this.$http.post(`${this.$serverApiLink}api/account/navigation/update/${id}`, params).
      then(
          () => {
            this.navigation.list[this.edit.index] = {
              name: value.name,
              link: value.link,
              type: value.action,
              icon: value.icon,
              id: this.navigation.list[this.edit.index].id
            };
            this.edit = {
              status: false,
              loading: false,
              index: 0
            };
            this.$emit("reload_preview", {
              uid: this.$route.params.uid,
              mode: "app"
            });
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.edit.loading = false;
          }
      );
    },
    updateBarItem(value) {
      this.editBar.loading = true;
      let id = this.bar.list[this.editBar.index].id;
      let params = new URLSearchParams();
      params.append('link', value.link);
      params.append('name', value.name);
      params.append('action_type', value.action);
      params.append('icon', value.icon);
      this.$http.post(`${this.$serverApiLink}api/account/bar/update/${id}`, params).
      then(
          () => {
            this.bar.list[this.editBar.index] = {
              name: value.name,
              link: value.link,
              type: value.action,
              icon: value.icon,
              id: this.bar.list[this.editBar.index].id
            };
            this.editBar = {
              status: false,
              loading: false,
              index: 0
            };
            this.$emit("reload_preview", {
              uid: this.$route.params.uid,
              mode: "app"
            });
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.editBar.loading = false;
          }
      );
    },
    getNavigationItems() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/navigation/list/${this.$route.params.uid}`).
      then(
          response => {
            this.navigation.list = response.data.list;
            this.navigation.count = response.data.count;
            this.getBarItems();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
          }
      );
    },
    getBarItems() {
      this.$http.get(`${this.$serverApiLink}api/account/bar/list/${this.$route.params.uid}`).
      then(
          response => {
            this.bar.list = response.data.list;
            this.bar.count = response.data.count;
            this.getModalItems();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
          }
      );
    },
    getModalItems() {
      this.$http.get(`${this.$serverApiLink}api/account/modal/list/${this.$route.params.uid}`).
      then(
          response => {
            this.modal.list = response.data.list;
            this.modal.count = response.data.count;
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
    this.getNavigationItems();
  }
}
</script>