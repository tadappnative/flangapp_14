<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('menu', 'key_24')"
          :preview="false"
          drawer
      />
      <Container>
        <Title :title="$tr('project', 'key_272')"/>
        <v-row>
          <v-col md="12" sm="12" cols="12">
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
            <v-text-field
                :label="$tr('auth', 'key_6')"
                outlined
                color="primary"
                dense
                type="password"
                hide-details
                v-model="password"
            ></v-text-field>
          </v-col>
          <v-col md="6" sm="12" cols="12">
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
          ref="footer"
          :full_width="true"
          :loading="loading"
          @click="updateAction"
      />
    </v-main>
  </v-layout>
</template>

<script>

import PageBar from "@/components/blocks/PageBar";
import Container from "@/components/blocks/Container";
import Title from "@/components/blocks/Title";
import Footer from "@/components/blocks/Footer";

export default {
  name: 'Profile',
  components: {
    PageBar,
    Container,
    Title,
    Footer
  },
  data: () => ({
    loading: false,
    email: "",
    password: "",
    new_password: ""
  }),
  methods: {
    updateAction() {
      this.loading = true;
      let params = new URLSearchParams();
      params.append('email', this.email);
      params.append('password', this.password);
      params.append('new_password', this.new_password);
      this.$http.post(`${this.$serverApiLink}api/account/profile/update`, params).
      then(
          // eslint-disable-next-line no-unused-vars
          response => {
            if (this.$store.state.user.email !== this.email) {
              this.$store.commit('setEmail', this.email);
            }
            this.loading = false;
            this.password = "";
            this.new_password = "";
            this.$refs.footer.showSuccessAlert();
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
  beforeMount() {
    this.email = this.$store.state.user.email;
  }
}
</script>