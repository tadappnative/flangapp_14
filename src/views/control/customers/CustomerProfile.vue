<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_24')"
          :preview="true"
          :drawer="true"
      />
      <Loader v-if="loading"/>
      <Container v-else>
        <Title :title="$tr('project', 'key_272')"/>
        <v-row>
          <v-col md="6" sm="12" cols="12">
            <v-text-field
                :label="$tr('auth', 'key_5')"
                outlined
                color="primary"
                dense
                hide-details
                v-model="email"
            ></v-text-field>
          </v-col>
          <v-col md="6" sm="12" cols="12">
            <v-select
                :label="$tr('admin', 'key_73')"
                outlined
                color="primary"
                dense
                hide-details
                :items="adminItems"
                v-model.number="admin"
            ></v-select>
          </v-col>
          <v-col md="12" sm="12" cols="12">
            <v-text-field
                :label="$tr('auth', 'key_19')"
                outlined
                color="primary"
                dense
                type="password"
                hide-details
                v-model="new_password"
            ></v-text-field>
          </v-col>
        </v-row>
      </Container>
      <Footer
          v-if="!loading"
          ref="footer"
          :loading="btnLoad"
          @click="updateAction"
      />
    </v-main>
  </v-layout>
</template>

<script>
import Loader from "@/components/blocks/Loader";
import PageBar from "@/components/blocks/PageBar";
import Container from "@/components/blocks/Container";
import Title from "@/components/blocks/Title";
import Footer from "@/components/blocks/Footer";

export default {
  name: 'CustomerProfile',
  components: {
    PageBar,
    Container,
    Title,
    Footer,
    Loader
  },
  data: () => ({
    loading: true,
    email: "",
    new_password: "",
    admin: 0,
    btnLoad: false
  }),
  computed: {
    adminItems: function () {
      return [
        {
          text: this.$tr('admin', 'key_74'),
          value: 0
        },
        {
          text: this.$tr('admin', 'key_75'),
          value: 1
        },
      ];
    }
  },
  methods: {
    getUserDetail() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/users/detail/${this.$route.params.id}`).
      then(
          response => {
            this.email = response.data.email;
            this.admin = response.data.admin;
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
    updateAction() {
      this.btnLoad = true;
      let params = new URLSearchParams();
      params.append('email', this.email);
      params.append('new_password', this.new_password);
      params.append('admin', this.admin);
      this.$http.post(`${this.$serverApiLink}api/admin/users/update/${this.$route.params.id}`, params).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.btnLoad = false;
            this.new_password = "";
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
    }
  },
  mounted() {
    this.getUserDetail();
  }
}
</script>