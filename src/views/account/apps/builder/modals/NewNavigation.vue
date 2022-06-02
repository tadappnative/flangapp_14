<template>
  <v-card flat tile>
    <v-card-title class="pa-0">
      <v-toolbar
          flat
          class="modal_bar"
      >
        <v-toolbar-title>
          {{ $tr('project', !itemName.length ? 'key_54' : 'key_67') }}
        </v-toolbar-title>
        <v-spacer/>
        <v-btn
            icon
            @click="$emit('close')"
        >
          <CancelIcon/>
        </v-btn>
      </v-toolbar>
    </v-card-title>
    <v-divider/>
    <v-card-text class="pa-0">
      <v-container fluid>
        <Title :title="$tr('project', 'key_300')"/>
        <v-row>
          <v-col md="12" sm="12" cols="12" class="pb-0">
            <v-text-field
                :label="$tr('project', 'key_55')"
                outlined
                color="primary"
                dense
                autofocus
                v-model="name"
            ></v-text-field>
          </v-col>
          <v-col md="6" sm="12" cols="12" class="pb-0">
            <v-select
                :label="$tr('project', 'key_56')"
                outlined
                color="primary"
                dense
                :items="actions"
                v-model="action"
            ></v-select>
          </v-col>
          <v-col md="6" sm="12" cols="12" class="pb-0">
            <v-text-field
                :label="label"
                :disabled="action === 2 || action === 5"
                outlined
                color="primary"
                dense
                v-model="link"
            ></v-text-field>
          </v-col>
        </v-row>
        <Title :title="$tr('project', 'key_69')"/>
        <div class="permissions_block  mb-3">
          <div class="d-flex justify-space-between align-center pa-4">
            <div class="d-flex justify-start align-center">
              <v-avatar color="whitesmoke" :size="60" class="mr-4">
                <div class="smoke--text" style="width: 32px; height: 32px; font-size: 30px">
                  <ion-icon :name="icon"></ion-icon>
                </div>
              </v-avatar>
              <div>
                <div class="body-1 font-weight-medium black--text">
                  {{ $tr('project', 'key_62') }}
                </div>
                <div class="body-2 smoke--text smoke--text">
                  {{ $tr('project', 'key_302') }}
                </div>
              </div>
            </div>
            <v-btn small depressed @click="dialog = true">
              {{ $tr('project', 'key_303') }}
            </v-btn>
          </div>
        </div>
      </v-container>
      <v-divider/>
    </v-card-text>
    <v-container fluid class="text-right">
      <v-btn color="primary" :loading="loading" depressed @click="save">
        {{ $tr('project', 'key_173') }}
      </v-btn>
    </v-container>
    <v-dialog
        scrollable
        max-width="680"
        v-model="dialog"
    >
      <SelectIcon
          @save="updateIcon"
          @close="dialog = false"
          :icon="icon"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import CancelIcon from "@/components/icons/CancelIcon";
import Title from "@/components/blocks/Title";
import SelectIcon from "@/views/account/apps/builder/modals/SelectIcon";

export default {
  name: 'NewNavigation',
  components: {
    CancelIcon,
    Title,
    SelectIcon
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    itemName: {
      type: String,
      default: ""
    },
    itemAction: {
      type: Number,
      default: 0
    },
    itemIcon: {
      type: String,
      default: "albums-outline"
    },
    itemLink: {
      type: String,
      default: ""
    },
  },
  data: () => ({
    name: "",
    action: 0,
    icon: "albums-outline",
    link: "",
    search: "",
    selectedIcon: "",
    dialog: false,
  }),
  computed: {
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
    },
    label: function () {
      if (this.action === 0 || this.action === 1) {
        return this.$tr('project', 'key_61')
      } else if (this.action === 2 || this.action === 5) {
        return this.$tr('project', 'key_48')
      } else if (this.action === 3) {
        return this.$tr('auth', 'key_5')
      } else {
        return this.$tr('project', 'key_301')
      }
    }
  },
  methods: {
    updateIcon(icon) {
      this.icon = icon;
      this.dialog = false;
    },
    save() {
      this.$emit("save", {
        name: this.name,
        link: this.link,
        icon: this.icon,
        action: this.action
      });
    },
    clean() {
      this.name = "";
      this.link = "";
      this.action = 0;
      this.icon = "albums-outline";
      this.search = "";
    }
  },
  beforeMount() {
    this.name = this.itemName;
    this.action = this.itemAction;
    this.icon = this.itemIcon;
    this.link = this.itemLink;
  },
  mounted() {

  }
}
</script>