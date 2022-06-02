<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_17')"
          :drawer="true"
      />
      <Loader v-if="loading"/>
      <Container v-else>
        <Title :title="$tr('project', 'key_98')"/>
        <v-row class="mb-7">
          <v-col md="6" sm="12" cols="12">
            <v-text-field
                :label="$tr('project', 'key_93')"
                outlined
                color="primary"
                dense
                hide-details
                v-model="settings.api_key"
            ></v-text-field>
          </v-col>
          <v-col md="6" sm="12" cols="12">
            <v-text-field
                :label="$tr('project', 'key_94')"
                outlined
                color="primary"
                dense
                hide-details
                v-model="settings.app_id"
            ></v-text-field>
          </v-col>
          <v-col md="12" sm="12" cols="12">
            <v-text-field
                :label="$tr('project', 'key_140')"
                outlined
                color="primary"
                dense
                readonly
                hide-details
                :value="settings.sign_key"
            >
              <template v-slot:append>
                <v-btn icon color="danger" @click="reissue = true">
                  <RefreshMiniIcon :size="22"/>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <Title :title="$tr('project', 'key_97')"/>
        <div class="permissions_block">
          <div class="d-flex justify-space-between align-center pa-4">
            <div class="d-flex justify-start align-center">
              <v-avatar color="whitesmoke" :size="60" class="mr-4">
                <div class="android--text" style="width: 32px; height: 32px">
                  <AndroidLogoIcon :size="32"/>
                </div>
              </v-avatar>
              <div>
                <div class="body-1 font-weight-medium">
                  {{ $tr('project', 'key_95') }}
                </div>
                <div class="body-2 smoke--text">
                  {{ $tr('project', 'key_292') }}
                </div>
              </div>
            </div>
            <v-switch
                :true-value="1"
                :false-value="0"
                v-model="settings.android"
                inset
            ></v-switch>
          </div>
        </div>
      </Container>
      <Footer
          v-if="!loading"
          :loading="btnLoad"
          ref="footer"
          @click="updatePushDetail"
      />
      <v-dialog
          v-model="reissue"
          max-width="400"
      >
        <v-card class="pa-6">
          <div class="body-1 font-weight-bold danger--text mb-4">
            {{ $tr('project', 'key_142') }}
          </div>
          <div class="body-2">
            {{ $tr('project', 'key_143') }}
          </div>
          <div class="d-flex justify-end align-center mt-6">
            <v-btn
                text
                @click="reissue = false"
            >
              {{ $tr('project', 'key_145') }}
            </v-btn>
            <v-btn
                depressed
                color="danger"
                dark
                :loading="btn_load"
                class="ml-3"
                @click="reissueSign"
            >
              {{ $tr('project', 'key_144') }}
            </v-btn>
          </div>
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
import AndroidLogoIcon from "@/components/icons/AndroidLogoIcon";
import Footer from "@/components/blocks/Footer";
import RefreshMiniIcon from "@/components/icons/RefreshMiniIcon";
export default {
  name: 'Push',
  components: {
    PageBar,
    Container,
    Title,
    Loader,
    AndroidLogoIcon,
    Footer,
    RefreshMiniIcon
  },
  data: () => ({
    loading: true,
    btnLoad: false,
    settings: {
      api_key: "",
      app_id: "",
      ios: 0,
      android: 0,
      sign_key: ""
    },
    reissue: false,
    btn_load: false
  }),
  methods: {
    getPushSettings() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/push/detail/${this.$route.params.uid}`).
      then(
          response => {
            this.settings = response.data.detail;
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
    reissueSign() {
      this.btn_load = true;
      this.$http.get(`${this.$serverApiLink}api/account/push/reissue_sign/${this.$route.params.uid}`).
      then(
          response => {
            this.settings.sign_key = response.data.sign_key;
            this.reissue = false;
            this.btn_load = false;
            this.$refs.footer.showSuccessAlert();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.btn_load = false;
          }
      );
    },
    updatePushDetail() {
      this.btnLoad = true;
      let params = new URLSearchParams();
      params.append('apple', this.settings.ios);
      params.append('android', this.settings.android);
      params.append('app_id', this.settings.app_id);
      params.append('api_key', this.settings.api_key);
      this.$http.post(`${this.$serverApiLink}api/account/push/update/${this.$route.params.uid}`, params).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.btnLoad = false;
            this.$refs.footer.showSuccessAlert();
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.btnLoad = false;
          }
      );
    },
  },
  mounted() {
    this.getPushSettings();
  }
}
</script>