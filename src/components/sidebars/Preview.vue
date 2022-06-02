<template>
  <div>
    <div v-if="src" style="overflow: hidden auto">
      <v-overlay
          absolute
          :value="overlay.status"
          color="blue_dark"
          opacity="0.8"
          z-index="300"
          class="d-flex justify-center align-center text-center pa-4"
      >
        <div class="queued_container">
          <div class="queued_position mb-5">
            <div class="queued_counter success--text">
              {{ overlay.position }}
            </div>
            <div class="queued_info">{{ $tr("project", "key_314") }}</div>
          </div>
        </div>
        <div class="font-weight-bold">
          {{ $tr("project", "key_315") }}
        </div>
        <div class="caption mb-5">
          {{ $tr("project", "key_316") }}
        </div>
      </v-overlay>
      <div class="text-center" style="overflow: hidden auto">
        <v-btn-toggle
            v-model="platform"
            rounded
            dense
            class="mb-5 mt-5"
        >
          <v-btn small>
            <v-icon :size="18" color="black">mdi-apple</v-icon>
          </v-btn>
          <v-btn small>
            <v-icon :size="20" color="#00de7a">mdi-android</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
      <div class="preview_container">
        <iframe
            ref="iframe_preview"
            :src="!platform ? `https://appetize.io/embed/8bnmakzrptf1hv9dq7v7bnteem?autoplay=false&debug=true&device=iphone12&deviceColor=${deviceColor}&embed=true&orientation=portrait&screenOnly=false&xDocMsg=true&xdocMsg=true&params=%7B%22EXKernelLaunchUrlDefaultsKey%22:%22${src}%22,%22EXKernelDisableNuxDefaultsKey%22:true%7D&scale=75&osVersion=13.7` :
`https://appetize.io/embed/xc1w6f1krd589zhp22a0mgftyw?autoplay=false&debug=true&device=pixel4&deviceColor=${deviceColor}&embed=true&launchUrl=${src}&orientation=portrait&screenOnly=false&xDocMsg=true&xdocMsg=true&params=%7B%22EXKernelLaunchUrlDefaultsKey%22:%22${src}%22,%22EXKernelDisableNuxDefaultsKey%22:true%7D&scale=81`"
            class="preview_frame"
            scrolling="no"
        ></iframe>
        <div v-if="runBtn" class="run_preview">
          <div class="d-flex justify-center mt-4">
            <v-btn class="font-weight-bold" depressed light color="white_only" large width="190" height="60" @click="openRunDialog">
              {{ $tr("project", "key_317") }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-center align-center" style="height: 100vh">
      <v-progress-circular
          indeterminate
          color="smoke"
          width="2"
      ></v-progress-circular>
    </div>
    <v-dialog
        scrollable
        max-width="680"
        v-model="dialog"
    >
      <v-card flat tile>
        <v-card-text class="pa-4">
          <v-container fluid>
            <div class="text-h4 text-center black--text mb-5">
              {{ $tr('project', 'key_326') }}
            </div>
            <v-row class="mb-5 mt-5">
              <v-col md="4" sm="12" cols="12" class="text-center">
                <div class="primary--text mb-3">
                  <RtcBigIcon/>
                </div>
                <div class="body-1 font-weight-bold black--text mb-3">
                  {{ $tr('project', 'key_318') }}
                </div>
                <div class="caption">
                  {{ $tr('project', 'key_319') }}
                </div>
              </v-col>
              <v-col md="4" sm="12" cols="12" class="text-center">
                <div class="primary--text mb-3">
                  <FlipBigIcon/>
                </div>
                <div class="body-1 font-weight-bold black--text mb-3">
                  {{ $tr('project', 'key_320') }}
                </div>
                <div class="caption">
                  {{ $tr('project', 'key_321') }}
                </div>
              </v-col>
              <v-col md="4" sm="12" cols="12" class="text-center">
                <div class="primary--text mb-3">
                  <AlertDeviceBigIcon/>
                </div>
                <div class="body-1 font-weight-bold black--text mb-3">
                  {{ $tr('project', 'key_322') }}
                </div>
                <div class="caption">
                  {{ $tr('project', 'key_323') }}
                </div>
              </v-col>
            </v-row>
            <div class="mt-5 d-flex justify-space-between align-center">
              <v-checkbox
                  v-model="showMode"
                  :label="$tr('project', 'key_325') "
              ></v-checkbox>
              <v-btn
                depressed
                color="success"
                large
                @click="cancelDialog"
              >
                {{ $tr('project', 'key_324') }}
              </v-btn>
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { snack, UpdateSnack } from "@/snack/build";
import RtcBigIcon from "@/components/icons/RtcBigIcon";
import FlipBigIcon from "@/components/icons/FlipBigIcon";
import AlertDeviceBigIcon from "@/components/icons/AlertDeviceBigIcon";
export default {
  name: 'Preview',
  components: {
    RtcBigIcon,
    FlipBigIcon,
    AlertDeviceBigIcon
  },
  props: {
    uid: {
      type: String,
      default: ""
    },
  },
  data: () => ({
    platform: 0,
    overlay: {
      type: 'default',
      position: 0,
      status: false
    },
    runBtn: true,
    src: undefined,
    dialog: false,
    showMode: false
  }),
  watch: {
    platform() {
      this.overlay = {
        type: 'default',
        position: 0,
        status: false
      };
      this.runBtn = true;
    }
  },
  computed: {
    deviceColor: function () {
      return !this.$store.state.darkMode ? "black" : "white";
    }
  },
  methods: {
    openRunDialog() {
      if (!this.$store.state.preview_agree) {
        this.dialog = true;
      } else {
        this.runPreview();
      }
    },
    async buildSnack() {
      snack.setOnline(true);
      await snack.getStateAsync().then(r => {
        console.log(r);
        this.src = r.url;
        UpdateSnack(this.$route.params.uid, "app");
      }).catch(y => {
        console.log(y);
      });
    },
    cancelDialog() {
      this.dialog = false;
      if (this.showMode) {
        this.$store.commit('setPreviewAgree', true);
      }
      this.runPreview();
    },
    runPreview() {
      let iframe = this.$refs.iframe_preview;
      iframe.contentWindow.postMessage('requestSession', '*');
    },
    stopPreview() {
      let iframe = this.$refs.iframe_preview;
      iframe.contentWindow.postMessage('endSession', '*');
      this.overlay = {
        type: 'default',
        position: 0,
        status: false
      };
      this.runBtn = true;
    },
    messageEventHandler(event) {
      if(event.data === 'sessionRequested'){
        // request session
        console.log(event.data);
        this.runBtn = false;
      } else if (event.data === 'sessionQueued') {
        // session to pool
        console.log(event.data);
        this.overlay = {
          type: 'queued',
          position: 0,
          status: true
        };
      } else if (event.data && event.data.type === 'sessionQueuedPosition') {
        // update pool position
        console.log(event.data.position);
        this.overlay = {
          type: 'queued',
          position: event.data.position,
          status: true
        };
      } else if (event.data === 'accountQueued') {
        // pool queued
        console.log(event.data);
      } else if (event.data && event.data.type === 'accountQueuedPosition') {
        // update pool position
        console.log(event.data.position);
        this.overlay = {
          type: 'queued',
          position: event.data.position,
          status: true
        };
      } else if(event.data === 'appLaunch'){
        // start app launch
        if (this.overlay.status) {
          this.overlay.status = false
        }
      } else if(event.data === 'sessionEnded') {
        // session ended
        console.log('sessionEnded');
        this.overlay = {
          type: 'default',
          position: 0,
          status: false
        };
        this.runBtn = true;
      }
    }
  },
  mounted() {
    window.addEventListener('message', this.messageEventHandler, false);
    this.buildSnack();
  },
  beforeDestroy() {
    window.removeEventListener('message', this.messageEventHandler, false);
    this.$emit('toggle', 0);
  }
}
</script>