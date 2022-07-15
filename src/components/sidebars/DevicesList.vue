<template>
  <div>
    <v-divider/>
    <v-list-item
        :style="!$store.state.previewDevices.length ? 'padding-top: 11px; padding-bottom: 12px;' : ''"
    >
      <v-list-item-content>
        <v-list-item-title class="font-weight-medium">
          {{ $tr("project", "key_333") }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <div class="font-weight-bold primary--text">
          {{ $store.state.previewDevices.length }}
        </div>
      </v-list-item-action>
    </v-list-item>
    <template v-if="$store.state.previewDevices.length">
      <v-list two-line>
        <v-list-item
            v-for="(device, index) in $store.state.previewDevices"
            :key="'device_'+index"
        >
          <v-list-item-avatar
              size="40"
              class="device_icon"
          >
            <v-icon
                :color="device.platform === 'android' ? '#00de7a' : 'black'"
                v-text="device.platform === 'android' ? 'mdi-android' : 'mdi-apple'"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium" v-text="device.name"/>
            <v-list-item-subtitle class="blue-grey--text">ID: {{ device.id }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DevicesList',
  components: {

  },
  props: {

  },
  data: () => ({

  }),
  methods: {

  },
  mounted() {

  }
}
</script>