<template>
  <v-layout fill-height>
    <v-main>
      <PageBar
          :title="$tr('admin', 'key_1')"
          :drawer="true"
          :preview="false"
      />
      <Loader v-if="loading"/>
      <Container v-else>
        <v-row class="pb-0">
          <v-col md="3" sm="12" cols="12">
            <v-card outlined class="mb-4 background_block">
              <v-card-text>
                <div class="headline font-weight-medium primary--text">
                  {{ users }}
                </div>
                <div class="black--text">
                  {{ $tr('admin', 'key_78') }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="3" sm="12" cols="12">
            <v-card outlined class="mb-4 background_block">
              <v-card-text>
                <div class="headline font-weight-medium primary--text">
                  {{ apps }}
                </div>
                <div class="black--text">
                  {{ $tr('admin', 'key_79') }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="3" sm="12" cols="12">
            <v-card outlined class="mb-4 background_block">
              <v-card-text>
                <div class="headline font-weight-medium primary--text">
                  {{ paid_apps }}
                </div>
                <div class="black--text">
                  {{ $tr('admin', 'key_80') }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="3" sm="12" cols="12">
            <v-card outlined class="mb-3 background_block">
              <v-card-text>
                <div class="headline font-weight-medium primary--text">
                  {{ builds }}
                </div>
                <div class="black--text">
                  {{ $tr('admin', 'key_81') }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="12" sm="12" cols="12">
            <v-card outlined class="mb-4 background_block">
              <v-card-title class="pa-0">
                <v-toolbar
                    flat
                    class="background_block"
                >
                  <v-toolbar-title>
                    {{ $tr('admin', 'key_85') }}
                  </v-toolbar-title>
                  <v-spacer/>
                  <v-btn-toggle v-model="period">
                    <v-btn depressed small>
                      {{ $tr('admin', 'key_86') }}
                    </v-btn>
                    <v-btn depressed small>
                      {{ $tr('admin', 'key_87') }}
                    </v-btn>
                  </v-btn-toggle>
                </v-toolbar>
              </v-card-title>
              <v-divider/>
              <div class="pa-4 mb-4" style="height: 400px">
                <div
                    v-if="chartLoading"
                    class="d-flex justify-center align-center"
                    style="height: 100%"
                >
                  <v-progress-circular
                      indeterminate
                      color="smoke"
                      width="2"
                      class="mt-4"
                  ></v-progress-circular>
                </div>
                <LineChartGenerator
                    v-else
                    :chart-options="chartOptions"
                    :chart-data="chartData"
                />
              </div>
              <div class="d-flex justify-space-between align-center pa-4">
                <div class="text-center">
                  <v-skeleton-loader
                      v-if="chartLoading"
                      type="text"
                      width="100"
                  ></v-skeleton-loader>
                  <div v-else class="text-h6 font-weight-medium primary--text">
                    {{ transactions.amount }} {{ currency }}
                  </div>
                  <div class="body-2 black--text">
                    {{ $tr('admin', 'key_82') }}
                  </div>
                </div>
                <div class="text-center">
                  <v-skeleton-loader
                      v-if="chartLoading"
                      type="text"
                      width="100"
                  ></v-skeleton-loader>
                  <div v-else class="text-h6 font-weight-medium primary--text">
                    {{ transactions.count }}
                  </div>
                  <div class="body-2 black--text">
                    {{ $tr('admin', 'key_83') }}
                  </div>
                </div>
                <div class="text-center">
                  <v-skeleton-loader
                      v-if="chartLoading"
                      type="text"
                      width="100"
                  ></v-skeleton-loader>
                  <div v-else class="text-h6 font-weight-medium primary--text">
                    {{ transactions.builds }}
                  </div>
                  <div class="body-2 black--text">
                    {{ $tr('admin', 'key_84') }}
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6" sm="12" cols="12">
            <v-card outlined class="background_block">
              <v-card-title class="pa-0">
                <v-toolbar
                    flat
                    class="background_block"
                >
                  <v-toolbar-title>
                    {{ $tr('admin', 'key_89') }}
                  </v-toolbar-title>
                </v-toolbar>
              </v-card-title>
              <v-divider/>
              <v-card-text style="height: 500px">
                <div
                    v-if="buildsLoading"
                    class="d-flex justify-center align-center"
                    style="height: 100%"
                >
                  <v-progress-circular
                      indeterminate
                      color="smoke"
                      width="2"
                      class="mt-4"
                  ></v-progress-circular>
                </div>
                <template v-else>
                  <v-list v-if="widget.builds.length" dense two-line class="pa-0 background_block">
                    <div v-for="(item, index) in widget.builds" :key="'build_widget_bar_'+index">
                      <v-divider
                          v-if="index > 0"
                          :key="'build_widget_line_bar'+index"
                      />
                      <v-list-item
                          :key="'build_widget_item_bar'+index"
                          class="pl-0 pr-0 pt-0 pb-0"
                          :to="{name: 'AdminMain', params: {uid: item.app.uid}}"
                      >
                        <v-list-item-avatar
                            size="50"
                            color="whitesmoke"
                            class="d-flex justify-center align-center flex-column"
                            style="border-radius: 15px;"
                        >
                          <div>
                            <v-icon
                                color="smoke"
                                v-text="item.platform === 'android' ? 'mdi-android' : 'mdi-apple'"
                            />
                          </div>
                          <div class="caption text-uppercase font-weight-medium">
                            {{ item.format }}
                          </div>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold" v-text="item.app.name"/>
                          <v-list-item-subtitle class="smoke--text">
                            <span>{{ $tr('project', 'key_22') }} {{ item.created }}</span>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action class="caption">
                          {{ item.version }}
                        </v-list-item-action>
                      </v-list-item>
                    </div>
                  </v-list>
                  <div class="d-flex justify-center align-center" style="height: 100%; flex-direction: column" v-else>
                    <div class="font-weight-bold black--text body-1">
                      {{ $tr('admin', 'key_90') }}
                    </div>
                    <div class="smoke--text body-2">
                      {{ $tr('admin', 'key_91') }}
                    </div>
                  </div>
                </template>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="6" sm="12" cols="12">
            <v-card outlined class="background_block">
              <v-card-title class="pa-0">
                <v-toolbar
                    flat
                    class="background_block"
                >
                  <v-toolbar-title>
                    {{ $tr('admin', 'key_88') }}
                  </v-toolbar-title>
                </v-toolbar>
              </v-card-title>
              <v-divider/>
              <v-card-text style="height: 500px">
                <div
                    v-if="ticketsLoading"
                    class="d-flex justify-center align-center"
                    style="height: 100%"
                >
                  <v-progress-circular
                      indeterminate
                      color="smoke"
                      width="2"
                      class="mt-4"
                  ></v-progress-circular>
                </div>
                <template v-else>
                  <v-list v-if="widget.tickets.length" dense two-line class="pa-0 background_block">
                    <div v-for="(item, index) in widget.tickets" :key="'widget_ticket_'+index">
                      <v-divider
                          v-if="index > 0"
                          :key="'widget_ticket_line'+index"
                          class="mb-1 mt-1"
                      />
                      <v-list-item
                          :key="'widget_ticket_item'+index"
                          class="pl-0 pr-0 pt-0 pb-0"
                          :to="{name: 'Comments', params: {ticket_uid: item.uid}}"
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
                            <MailIcon :size="24"/>
                          </div>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-bold">
                            {{ item.title }}
                          </v-list-item-title>
                          <v-list-item-subtitle class="smoke--text">
                            {{ item.message.comment }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </v-list>
                  <div class="d-flex justify-center align-center" style="height: 100%; flex-direction: column" v-else>
                    <div class="font-weight-bold black--text body-1">
                      {{ $tr('admin', 'key_92') }}
                    </div>
                    <div class="smoke--text body-2">
                      {{ $tr('admin', 'key_93') }}
                    </div>
                  </div>
                </template>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </Container>
    </v-main>
  </v-layout>
</template>

<script>
import PageBar from "@/components/blocks/PageBar";
import Container from "@/components/blocks/Container";
import Loader from "@/components/blocks/Loader";
import MailIcon from "@/components/icons/MailIcon";
import {Line as LineChartGenerator} from 'vue-chartjs/legacy';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement,
);

export default {
  name: 'Dashboard',
  components: {
    PageBar,
    Container,
    LineChartGenerator,
    Loader,
    MailIcon
  },
  data() {
    let self = this;
    return {
      loading: true,
      period: 0,
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: '#1145FF',
            data: [],
            borderColor: "#1145FF",
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            grid: {
              color: '#a8a9b0'
            }
          },
          x: {
            grid: {
              color: '#a8a9b0'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return self.getTooltipContext(context);
              }
            }
          }
        }
      },
      chartLoading: true,
      users: 0,
      apps: 0,
      paid_apps: 0,
      builds: 0,
      transactions: {
        amount: 0,
        builds: 0,
        count: 0
      },
      currency: "",
      widget: {
        tickets: [],
        builds: []
      },
      ticketsLoading: true,
      buildsLoading: true
    }
  },
  watch: {
    period: function () {
      this.getChart();
    }
  },
  methods: {
    getTooltipContext(context) {
      let label = context.dataset.label || '';
      if (context.parsed.y !== null) {
        label += `${context.parsed.y.toFixed(2)} ${this.currency}`;
      }
      return label;
    },
    getCounters() {
      this.loading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/stat/counters`).
      then(
          response => {
            const data = response.data;
            this.users = data.users;
            this.apps = data.apps;
            this.paid_apps = data.paid_apps;
            this.builds = data.builds
            this.loading = false;
            this.getChart();
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
    getChart() {
      this.chartLoading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/stat/chart/${this.period}`).
      then(
          response => {
            const data = response.data;
            this.chartData.labels = data.labels;
            this.chartData.datasets[0].data = Object.keys(data.data).map((key) => data.data[key]);
            this.transactions.amount = data.amount.toFixed(2);
            this.transactions.builds = data.builds;
            this.transactions.count = data.total;
            this.currency = data.currency;
            this.chartLoading = false;
            this.getBuilds();
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
    getBuilds() {
      this.buildsLoading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/builds/short_pending`).
      then(
          response => {
            this.widget.builds = response.data.list;
            this.buildsLoading = false;
            this.getTickets();
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
    getTickets() {
      this.ticketsLoading = true;
      this.$http.get(`${this.$serverApiLink}api/admin/support/list/0/0`).
      then(
          response => {
            this.widget.tickets = response.data.list;
            this.ticketsLoading = false;
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
  },
  mounted() {
    this.getCounters();
  }
}
</script>