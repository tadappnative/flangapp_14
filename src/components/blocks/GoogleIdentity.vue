<template>
  <div>
    <div class="mt-5 mb-5 caption text-uppercase smoke--text text-center">
      {{ $tr("auth", "key_7") }}
    </div>
    <div style="height: 60px">
      <div ref="gLogin">
        <div class="d-flex justify-center align-center">
          <v-progress-circular
              indeterminate
              color="smoke"
              width="2"
              class="mt-4"
              size="18"
          ></v-progress-circular>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoogleIdentity',
  props: {
    keyId: {
      type: String,
      required: true
    },
  },
  components: {

  },
  data: () => ({

  }),
  methods: {
    loadClient() {
      return new Promise((resolve) => {
        var script = document.createElement('script')
        script.src = "https://accounts.google.com/gsi/client";
        script.onreadystatechange = script.onload = function () {
          if (!script.readyState || /loaded|complete/.test(script.readyState)) {
            setTimeout(function () {
              resolve()
            }, 500)
          }
        }
        document.getElementsByTagName('head')[0].appendChild(script)
      });
    }
  },
  mounted() {
    this.loadClient().then(() => {
      window.google.accounts.id.initialize({
        client_id: this.keyId,
        callback: (result) => {
          this.$emit("callback", result.credential)
        },
      })
      window.google.accounts.id.renderButton(
          this.$refs.gLogin,
          {
            theme: 'outline',
            size: 'large',
            width:  this.$refs.gLogin.clientWidth,
          }
      )
    }).catch((e) => {
      console.log(e);
    })
  }
}
</script>