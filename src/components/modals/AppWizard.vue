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
    <div class="d-flex justify-center align-center" style="height: 100vh; margin-bottom: 100px; margin-top: 100px">
      <div class="wizard_container flex-column">
        <div class="headline font-weight-bold mb-3">
          {{ $tr('project', 'key_5') }}
        </div>
        <div class="body-2 mb-12">
          {{ $tr('project', 'key_6') }}
        </div>
        <div class="block_width">
          <v-text-field
              :label="$tr('project', 'key_7')"
              outlined
              color="primary"
              autofocus
              v-model="name"
          ></v-text-field>
        </div>
        <div class="block_width">
          <v-text-field
              :label="$tr('project', 'key_8')"
              outlined
              color="primary"
              v-model="link"
          ></v-text-field>
        </div>
        <div class="block_width mb-5">
          <v-row>
            <v-col cols="12" md="8">
              <div class="caption smoke--text mb-3">
                {{ $tr('project', 'key_9') }}
              </div>
              <v-item-group
                  mandatory
              >
                <v-avatar
                    v-for="(item, i) in colors"
                    :key="`${i}_app_color`"
                    :color="item"
                    size="40"
                    class="mr-2 mb-2 border_white_avatar"
                >
                  <v-item>
                    <div
                        class="color_select_avatar d-flex justify-center align-center"
                        @click="toggleColor(i)"
                    >
                      <DoneIcon
                          v-if="selected_color === i"
                          :style="`color: ${item === '#ffffff' ? '#000000' : '#ffffff'}; width: 24px; height: 24px`" :size="24"
                      />
                    </div>
                  </v-item>
                </v-avatar>
                <v-avatar
                    v-if="color !== '#FFFFFF'"
                    :color="color"
                    size="40"
                    class="mr-2 mb-2 border_white_avatar"
                >
                  <div class="color_select_avatar d-flex justify-center align-center">
                    <DoneIcon :style="`color: #ffffff; width: 24px; height: 24px`" :size="24"/>
                  </div>
                </v-avatar>
                <v-menu
                    ref="picker"
                    offset-y
                    v-model="picker"
                    width="240px"
                    :close-on-content-click="false"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        width="40"
                        height="40"
                        class="mr-2 mb-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                      <ColorPickerIcon :size="20"/>
                    </v-btn>
                  </template>
                  <v-card flat>
                    <v-color-picker
                        dot-size="15"
                        swatches-max-height="240"
                        width="240px"
                        mode="hexa"
                        hide-mode-switch
                        v-model="color"
                    ></v-color-picker>
                  </v-card>
                </v-menu>
              </v-item-group>
            </v-col>
            <v-col cols="12" md="4">
              <div class="caption smoke--text mb-3">
                {{ $tr('project', 'key_10') }}
              </div>
              <div class="color_title_switcher">
                <div class="white_block" @click="isDark = true">
                  <DoneIcon v-if="isDark" :style="`color: #000000; width: 24px; height: 24px`" :size="24"/>
                </div>
                <div class="black_block" @click="isDark = false">
                  <DoneIcon v-if="!isDark" :style="`color: #ffffff; width: 24px; height: 24px`" :size="24"/>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="block_width">
          <div class="caption smoke--text mb-3">
            {{ $tr('project', 'key_11') }}
          </div>
          <v-item-group
              mandatory
              v-model="template"
          >
            <v-row>
              <v-col
                  v-for="(item, i) in templates"
                  :key="`${i}_app_template_layout`"
                  cols="3"
                  md="3"
                  sm="3"
              >
                <img
                    :src="item.image"
                    :class="template === i ? 'app_template active' : 'app_template'"
                    @click="template = i"
                />
                <div class="caption text-uppercase">
                  {{ item.name }}
                </div>
              </v-col>
            </v-row>
          </v-item-group>
        </div>
      </div>
    </div>
    <div class="wizard_footer white">
      <v-divider/>
      <div class="d-flex justify-center align-center" style="height: 59px">
        <v-btn depressed color="primary" :loading="loading" @click="createApp">
          {{ $tr('project', 'key_16') }}
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import CancelIcon from "@/components/icons/CancelIcon";
import TabsTemplate from "@/assets/images/templates/tabs.png";
import DrawerTemplate from "@/assets/images/templates/drawer.png";
import BlankTemplate from "@/assets/images/templates/blank.png";
import BarTemplate from "@/assets/images/templates/bar.png";
import DoneIcon from "@/components/icons/DoneIcon";
import ColorPickerIcon from "@/components/icons/ColorPickerIcon";
export default {
  name: 'AppWizard',
  components: {
    CancelIcon,
    DoneIcon,
    ColorPickerIcon
  },
  props: {

  },
  data: () => ({
    loading: false,
    name: "",
    link: "",
    colors: [
      "#F44336",
      "#E91E63",
      "#673AB7",
      "#3F51B5",
      "#4CAF50",
      "#FFC107",
      "#000000",
      "#ffffff"
    ],
    color: "#FFFFFF",
    picker: false,
    selected_color: 3,
    isDark: true,
    template: 0,
    templates: [
      {
        image: DrawerTemplate,
        name: "Drawer + Bar"
      },
      {
        image: TabsTemplate,
        name: "Tabs + Bar"
      },
      {
        image: BarTemplate,
        name: "Bar"
      },
      {
        image: BlankTemplate,
        name: "Blank"
      }
    ],
  }),
  watch: {
    color(value) {
      if (value !== "#FFFFFF" && this.selected_color !== undefined) {
        this.selected_color = undefined;
      } else if (value === "#FFFFFF" && this.selected_color === undefined) {
        this.selected_color = 0;
      }
    },
  },
  computed: {

  },
  methods: {
    toggleColor(index) {
      this.selected_color = index;
      this.color = "#FFFFFF";
    },
    createApp() {
      this.loading = true;
      let params = new URLSearchParams();
      params.append('link', this.link);
      params.append('name', this.name);
      params.append('template', this.template);
      params.append('color', this.color === "#FFFFFF"
          ? this.colors[this.selected_color]
          : this.color
      );
      params.append('theme', !this.title ? 0 : 1);
      this.$http.post(`${this.$serverApiLink}api/account/apps/create`, params).
      then(
          response => {
            this.loading = false;
            this.$router.push({name: 'Main', params: {uid: response.data.uid}});
            this.$emit('close');
            this.name = "";
            this.link = "";
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

  }
}
</script>