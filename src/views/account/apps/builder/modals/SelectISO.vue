<template>
  <v-card flat class="modal_bar fill-height" tile>
    <div class="fixed_search">
      <v-toolbar
          flat
          class="modal_bar"
      >
        <v-toolbar-title>
          {{ $tr('project', 'key_290') }}
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
            :label="$tr('project', 'key_291')"
            outlined
            color="primary"
            dense
            v-model="search"
        ></v-text-field>
      </v-container>
    </div>
    <v-divider/>
    <v-card-text style="height: 400px; padding: 0">
      <v-list v-if="filteredCodes.length">
        <div v-for="(country, index) in filteredCodes" :key="'country_'+index">
          <v-divider
              v-if="index > 0"
              :key="'country_line_'+index"
          />
          <v-list-item
              :key="'country_item_'+index"
              exact
              @click="$emit('set', country.code)"
          >
            <v-list-item-title>
              {{ country.name }}
            </v-list-item-title>
            <v-list-item-action>
              <v-list-item-action-text class="text-uppercase">
                {{ country.code }}
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </div>
      </v-list>
      <v-list v-else>
        <v-list-item>
          <v-list-item-title>
            {{ $tr('project', 'key_282') }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import CancelIcon from "@/components/icons/CancelIcon";
import { iso } from "@/data/iso";

export default {
  name: 'SelectISO',
  components: {
    CancelIcon
  },
  props: {

  },
  data: () => ({
    list: iso,
    search: ''
  }),
  computed: {
    filteredCodes () {
      const filterBy = (term) => {
        const termLowerCase = term.toLowerCase()
        return (person) =>
            Object.keys(person)
                .some(prop => person[prop].toLowerCase().indexOf(termLowerCase) !== -1)
      }
      return this.list.filter(filterBy(this.search));
    }
  },
  methods: {

  },
}
</script>