<template>
  <v-card flat class="modal_bar overflow-y-auto fill-height" tile>
    <div style="position: fixed; width: 100%; height: 65px; z-index: 10">
      <v-toolbar
          flat
          class="modal_bar"
      >
        <div class="d-flex justify-center align-center align-self-center" style="width: 100vw">
          <div/>
          <img
              :src="$store.state.config.logo"
              height="34"
              alt="Logo"
          />
        </div>
        <v-btn
            icon
            @click="$emit('close')"
            style="position: absolute; right: 26px"
        >
          <CancelIcon/>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
    </div>
    <div class="d-flex justify-center align-center" style="margin-bottom: 20px; margin-top: 100px">
      <div class="wizard_container flex-column">
        <template v-if="app.uid === undefined || loading">
          <Loader/>
        </template>
        <template v-else>
          <div class="mb-8">
            <AppIcon :image="app.icon" :uid="app.id"/>
          </div>
          <div class="headline font-weight-medium mb-1">
            {{ $tr('project', 'key_305') }}
          </div>
          <div class="body-2 mb-12">
            {{ app.name }}: {{ $tr('project', 'key_306') }}
          </div>
          <template v-if="step === 1">
            <div class="block_width mb-5">
              <div class="caption smoke--text mb-3">
                {{ $tr('project', 'key_307') }}
              </div>
              <v-item-group
                  mandatory
                  class="mb-2"
                  v-model="plan"
              >
                <v-row>
                  <v-col
                      v-for="(item, i) in plans"
                      :key="`${i}_app_plan_layout`"
                      cols="12"
                      md="12"
                      @click="plan = i"
                  >
                    <v-card
                        outlined
                        :class="`pa-3 ${plan === i ? 'app_template active' : 'app_template'}`"
                    >
                      <div class="d-flex justify-space-between align-center">
                        <div>
                          <div class="title">
                            {{ item.count }} <span class="body-2">{{ $tr('project', 'key_308') }}</span>
                          </div>
                          <div class="caption smoke--text" v-if="i === 0">
                            {{ $tr('project', 'key_309') }}
                          </div>
                          <div class="caption success--text font-weight-bold" v-else>
                            {{ $tr('project', 'key_310') }} {{ item.save }} {{ item.currency }}
                          </div>
                        </div>
                        <div class="title">
                          {{ item.price }} {{ item.symbol }}
                        </div>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-item-group>
              <v-btn
                  v-if="app.uid !== undefined || !loading"
                  block
                  depressed
                  color="primary"
                  large
                  class="mt-8"
                  @click="goToMethods"
              >
                {{ $tr('project', 'key_16') }}
              </v-btn>
            </div>
          </template>
          <template v-else-if="step === 2">
            <div class="block_width mb-5">
              <div class="d-flex justify-start align-center mb-3">
                <v-btn
                    icon
                    color="smoke"
                    small
                    class="mr-3"
                    @click="step = 1"
                >
                  <v-icon small>mdi-arrow-left</v-icon>
                </v-btn>
                <div class="caption smoke--text">
                  {{ $tr('project', 'key_200') }}
                </div>
              </div>
              <v-item-group
                  mandatory
                  class="mb-2"
                  v-model="method"
              >
                <v-row>
                  <v-col
                      v-for="(item, i) in methods"
                      :key="`${i}_deposit_method`"
                      cols="12"
                      md="12"
                      @click="method = i"
                  >
                    <v-card
                        outlined
                        :class="`pa-3 ${method === i ? 'app_template active' : 'app_template'}`"
                    >
                      <div class="d-flex justify-start align-center">
                        <img :src="item.logo" width="52" class="rounded-circle mr-4"/>
                        <div class="title">
                          {{ item.name }}
                        </div>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-item-group>
              <v-btn
                  v-if="app.uid !== undefined || !loading"
                  block
                  depressed
                  color="primary"
                  large
                  class="mt-8"
                  @click="goToPay"
              >
                {{ $tr('project', 'key_16') }}
              </v-btn>
            </div>
          </template>
          <template v-if="step === 3">
            <div class="block_width mb-5">
              <div class="d-flex justify-start align-center mb-3">
                <v-btn
                    icon
                    color="smoke"
                    small
                    class="mr-3"
                    @click="step = 2"
                >
                  <v-icon small>mdi-arrow-left</v-icon>
                </v-btn>
                <div class="caption smoke--text">
                  {{ $tr('project', 'key_311') }}
                </div>
              </div>
              <div class="mb-5">
                <stripe-element-card
                    :key="`${$store.state.darkMode}_stripe_key_${key}`"
                    ref="elementRef"
                    class="red--text"
                    :pk="$store.state.config.stripe_key"
                    :classes="classes"
                    :elementStyle="stylesCard"
                    @token="tokenCreated"
                    @loading="loadingStripe"
                />
              </div>
              <v-btn v-if="app.uid !== undefined || !loading" block depressed color="primary" large @click="submitStripeForm">
                {{ $tr('project', 'key_312') }} {{ totalPrice }} {{ currency }}
              </v-btn>
            </div>
          </template>
        </template>
      </div>
    </div>
    <template v-if="!loading">
      <form ref="ppForm" method="POST" :action="methods[method].api_value_2">
        <input type='hidden' name='business' :value='methods[method].api_value_1'>
        <input type='hidden' name='item_name' :value="$tr('project', 'key_305')">
        <input type='hidden' name='custom' :value='app.uid'>
        <input type='hidden' name='item_number' :value='plans[plan].id'>
        <input type='hidden' name='amount' :value='totalPrice'>
        <input type='hidden' name='no_shipping' value='1'>
        <input type='hidden' name='currency_code' :value='currencyCode'>
        <input type='hidden' name='cancel_return' :value='returnUrl'>
        <input type='hidden' name='return' value=''>
        <input type="hidden" name="cmd" value="_xclick">
      </form>
    </template>
    <template v-if="razorOrderID">
      <Razorpay
        :keyID="methods[method].api_value_1"
        :amount="totalPrice * 100"
        :currency="currencyCode"
        :name="`${app.name}: ${$tr('project', 'key_306')}`"
        :orderID="razorOrderID"
        @success="createTransactionRazor"
      />
    </template>
    <template v-if="openPayStack">
      <Paystack
          :email="$store.state.user.email"
          :currency="currencyCode"
          :keyID="methods[method].api_value_1"
          :amount="totalPrice * 100"
          :planID="plans[plan].id"
          :appUID="app.uid"
          @close="openPayStack = false"
          @success="createTransactionStack"
      />
    </template>
  </v-card>
</template>

<script>
import CancelIcon from "@/components/icons/CancelIcon";
import Logo from "@/assets/images/logosvg.svg";
import Loader from "@/components/blocks/Loader";
import AppIcon from "@/components/blocks/AppIcon";
import { StripeElementCard } from '@vue-stripe/vue-stripe';
import Razorpay from "@/components/payment/Razorpay";
import Paystack from "@/components/payment/Paystack";

export default {
  name: 'Deposit',
  components: {
    CancelIcon,
    Loader,
    AppIcon,
    StripeElementCard,
    Razorpay,
    Paystack
  },
  props: {
    app: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    classes: {
      base: "card_input_base",
      focus: "card_input_focus"
    },
    logoSvg: Logo,
    plan: 0,
    loading: true,
    plans: [],
    accessSource: false,
    isRequest: false,
    key: 1,
    methods: [],
    step: 1,
    method: 0,
    razorOrderID: null,
    openPayStack: false
  }),
  computed: {
    totalPrice: function () {
      let total = this.plans[this.plan].price * 1;
      return total.toFixed(2);
    },
    currency: function () {
      return this.plans[this.plan].symbol;
    },
    currencyCode: function () {
      return this.plans[this.plan].currency;
    },
    stylesCard: function () {
      return {
        base: {
          color: this.$store.state.darkMode ? '#fff' : '#000',
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          ':-webkit-autofill': {
            color: '#fce883',
          },
          '::placeholder': {
            color: this.$store.state.darkMode ? '#959cb7' : '#99A2AD',
          },
        }
      };
    },
    returnUrl: function () {
      return window.location;
    }
  },
  watch: {
    method: function () {
      this.razorOrderID = null;
      this.openPayStack = false;
    }
  },
  methods: {
    goToPay() {
      console.log(this.methods[this.method].id);
      if (this.methods[this.method].id === 1) {
        // stripe
        this.step = 3;
      } else if (this.methods[this.method].id === 2) {
        // paypal
        this.$store.commit('setLoading', true);
        const form = this.$refs.ppForm
        form.submit();
      } else if (this.methods[this.method].id === 3) {
        // razorpay
        this.createOrderRazor();
      } else if (this.methods[this.method].id === 4) {
        // paystack
        this.openPayStack = true;
      }
    },
    goToMethods() {
      this.step = 2;
    },
    submitStripeForm() {
      this.$refs.elementRef.submit();
    },
    loadingStripe(status) {
      if (!this.isRequest) {
        this.$store.commit('setLoading', status);
      }
    },
    createTransactionStack(reference) {
      this.openPayStack = false;
      this.$store.commit('setLoading', true);
      this.$http.get(`${this.$serverApiLink}api/account/deposit/paystack_make_pay/${reference}`).then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.$store.commit('setLoading', false);
            this.$store.commit('setSnackBar', {
              code: 200,
              message: [this.$tr("project", "key_313")]
            });
            this.$emit("add", this.plans[this.plan].count);
            this.step = 1;
            this.method = 0;
            this.$emit("close");
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
    createTransactionRazor(payment) {
      this.razorOrderID = null;
      this.$store.commit('setLoading', true);
      let params = new URLSearchParams();
      params.append('order_id', payment.razorpay_order_id);
      params.append('razorpay_payment_id', payment.razorpay_payment_id);
      params.append('razorpay_signature', payment.razorpay_signature);
      this.$http.post(`${this.$serverApiLink}api/account/deposit/razorpay_make_pay`, params).then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.$store.commit('setLoading', false);
            this.$store.commit('setSnackBar', {
              code: 200,
              message: [this.$tr("project", "key_313")]
            });
            this.$emit("add", this.plans[this.plan].count);
            this.step = 1;
            this.method = 0;
            this.$emit("close");
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
    createOrderRazor() {
      this.razorOrderID = null;
      this.$store.commit('setLoading', true);
      this.$http.get(`${this.$serverApiLink}api/account/deposit/create_order_razorpay/${this.app.uid}/${this.plans[this.plan].id}`).then(
          response => {
            this.$store.commit('setLoading', false);
            this.razorOrderID = response.data.id;
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.$store.commit('setLoading', false);
            this.isRequest = false;
          }
      );
    },
    tokenCreated(token) {
      this.isRequest = true;
      this.$store.commit('setLoading', true);
      let params = new URLSearchParams();
      params.append('token', token.id);
      this.$http.post(`${this.$serverApiLink}api/account/deposit/make_pay/${this.app.uid}/${this.plans[this.plan].id}`, params).then(
          // eslint-disable-next-line no-unused-vars
          response => {
            this.key = this.key + 1;
            this.$store.commit('setLoading', false);
            this.isRequest = false;
            this.$store.commit('setSnackBar', {
              code: 200,
              message: [this.$tr("project", "key_313")]
            });
            this.$emit("add", this.plans[this.plan].count);
            this.step = 1;
            this.method = 0;
            this.$emit("close");
          }
      ).catch(
          error => {
            this.$store.commit('setSnackBar', {
              code: !error.response ? 408 : error.response.status,
              message: error.response.data.message
            });
            this.$store.commit('setLoading', false);
            this.isRequest = false;
          }
      );
    },
    getPlans() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/account/deposit/plans`).
      then(
          response => {
            this.plans = response.data.list;
            this.getDepositMethods();
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
    getDepositMethods() {
      this.$http.get(`${this.$serverApiLink}api/account/deposit/methods`).
      then(
          response => {
            this.methods = response.data.list;
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
    this.getPlans();
  }
}
</script>