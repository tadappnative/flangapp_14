<template>
  <div class="pa-4">
    <div class="caption mb-2 smoke--text text-uppercase">
      {{ $tr('project', 'key_251') }}
    </div>
    <div class="d-flex justify-start align-content-center">
      <v-tooltip top color="blue_dark">
        <template v-slot:activator="{ on, attrs }">
          <div
              v-bind="attrs"
              v-on="on"
              class="mr-3"
          >
            <v-hover
                v-slot="{ hover }"
                :disabled="current === 1"
            >
              <v-icon
                  :color="current === 1 ? 'danger' : hover ? 'danger' : 'smoke'"
                  style="cursor: pointer"
                  @click="$emit('set', {value: 1, index: index})"
              >
                mdi-emoticon-confused
              </v-icon>
            </v-hover>
          </div>
        </template>
        <span v-text="$tr('project', 'key_248')" />
      </v-tooltip>
      <v-tooltip top color="blue_dark">
        <template v-slot:activator="{ on, attrs }">
          <div
              v-bind="attrs"
              v-on="on"
              class="mr-3"
          >
            <v-hover
                v-slot="{ hover }"
                :disabled="current === 2"
            >
              <v-icon
                  :color="current === 2 ? 'orange' : hover ? 'orange' : 'smoke'"
                  style="cursor: pointer"
                  @click="$emit('set', {value: 2, index: index})"
              >
                mdi-emoticon-happy
              </v-icon>
            </v-hover>
          </div>
        </template>
        <span v-text="$tr('project', 'key_249')" />
      </v-tooltip>
      <v-tooltip top color="blue_dark">
        <template v-slot:activator="{ on, attrs }">
          <div
              v-bind="attrs"
              v-on="on"
              class="mr-3"
          >
            <v-hover
                v-slot="{ hover }"
                :disabled="current === 3"
            >
              <v-icon
                  :color="current === 3 ? 'success' : hover ? 'success' : 'smoke'"
                  style="cursor: pointer"
                  @click="$emit('set', {value: 3, index: index})"
              >
                mdi-emoticon-excited
              </v-icon>
            </v-hover>
          </div>
        </template>
        <span v-text="$tr('project', 'key_250')" />
      </v-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rate',
  components: {

  },
  props: {
    current: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data: () => ({

  }),
  methods: {

  },
}
</script>