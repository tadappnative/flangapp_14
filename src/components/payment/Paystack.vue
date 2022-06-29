<template>
  <div></div>
</template>

<script>
export default {
  name: "Paystack",
  props: {
    amount: {
      type: Number,
      required: true
    },
    keyID: {
      type: String,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    planID: {
      type: Number,
      required: true
    },
    appUID: {
      type: String,
      required: true
    },
  },
  data(){
    return{
      script: `https://js.paystack.co/v1/inline.js`
    }
  },
  methods :{
    async loadPayStack(){
      return new Promise(resolve=>{
        const script = document.createElement('script')
        script.src = this.script
        script.onload = () =>{
          resolve(true)
        }
        script.onerror = () =>{
          resolve(false)
        }
        document.body.appendChild(script)
      })
    }
  },
  async created(){
    const result = await this.loadPayStack()
    if (!result){
      alert('Failed to load PayStack script')
      return
    }
    const self = this;
    // eslint-disable-next-line no-unused-vars
    const options = {
      key: this.keyID,
      amount: this.amount,
      currency: this.currency,
      email: this.email,
      metadata: {
        plan: this.planID,
        app: this.appUID
      },
      callback: function(response) {
        self.$emit("success", response.reference);
      },
      onClose: function() {
        self.$emit("close");
      },
    };
    const paymentObject = window.PaystackPop.setup(options);
    paymentObject.openIframe();
  }
}
</script>

<style>
</style>