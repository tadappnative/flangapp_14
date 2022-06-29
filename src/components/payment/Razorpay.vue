<template>
  <div></div>
</template>

<script>
export default {
  name: "Razorpay",
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
    orderID: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
  },
  data(){
    return{
      script: `https://checkout.razorpay.com/v1/checkout.js`
    }
  },
  methods :{
    async loadRazorPay(){
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
    const result = await this.loadRazorPay()
    if (!result){
      alert('Failed to load razorpay script')
      return
    }
    const self = this;
    const options = {
      key: this.keyID,
      amount: this.amount,
      currency: this.currency,
      name: this.name,
      order_id: this.orderID,
      image: this.$store.state.config.logo,
      handler: function(response) {
        self.$emit("success", response);
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
}
</script>

<style>
</style>