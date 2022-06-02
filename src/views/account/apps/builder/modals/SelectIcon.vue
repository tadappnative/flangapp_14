<template>
  <v-card flat class="modal_bar fill-height" tile>
    <div class="fixed_search">
      <v-toolbar
          flat
          class="modal_bar"
      >
        <v-toolbar-title>
          {{ $tr('project', 'key_62') }}
        </v-toolbar-title>
        <v-spacer/>
        <v-btn
            icon
            @click="$emit('close')"
        >
          <CancelIcon/>
        </v-btn>
      </v-toolbar>
      <v-container fluid class="pt-0 pb-0">
        <v-text-field
            :label="$tr('project', 'key_299')"
            outlined
            color="primary"
            dense
            v-model="search"
        ></v-text-field>
      </v-container>
    </div>
    <v-divider/>
    <div class="icons_list">
      <v-item-group
          v-if="!loading"
          mandatory
          v-model="selectedIcon"
      >
        <div class="icon-results">
          <div
              v-for="(icon, i) in filterIcons"
              :key="`${i}_icon_select`"
              :class="selectedIcon === icon.name ? 'icon_preview active' : 'icon_preview'"
              @click="selectedIcon = icon.name"
          >
            <ion-icon
                :name="icon.name"
            ></ion-icon>
          </div>
        </div>
      </v-item-group>
      <div v-else class="d-flex justify-center align-center align-self-center" style="height: 300px">
        <Loader/>
      </div>
    </div>
    <v-divider/>
    <v-container fluid class="text-right">
      <v-btn :min-width="100" depressed color="primary" class="ml-3" @click="$emit('save', selectedIcon)">
        {{ $tr('project', 'key_173') }}
      </v-btn>
    </v-container>
  </v-card>
</template>

<script>
import CancelIcon from "@/components/icons/CancelIcon";
import Loader from "@/components/blocks/Loader";

export default {
  name: 'SelectIcon',
  components: {
    CancelIcon,
    Loader
  },
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  data: () => ({
    search: "",
    selectedIcon: "",
    loading: true,
    icons: []
  }),
  computed: {
    filterIcons() {
      const termLowerCase = this.search.toLowerCase();
      return this.icons.filter(item =>{
        return item.tags.some(obj => obj.toLowerCase().indexOf(termLowerCase) !== -1)
      });
    }
  },
  methods: {
    getIcons() {
      fetch(this.$store.state.config.ionic_icons)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.icons = data.icons;
            this.loading = false;
          });
    }
  },
  mounted() {
    this.getIcons();
  },
  beforeMount() {
    this.selectedIcon = this.icon;
  }
}
</script>