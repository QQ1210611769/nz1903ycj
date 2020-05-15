<template>
  <div>
    <Head title="影院"></Head>
    <!-- <h3>影院</h3> -->
  </div>
</template>

<script>
import { myMixin } from "@/utils";
export default {
  mixins: [myMixin],
  data() {
    return {
      cinemaList: []
    };
  },
  mountded() {
    this.$axios
      .get("/maizuo/gateway?ticketFlag=1&k=1768044", {
        params: {
          // this.city混入的
          cityId: this.city.cityId
        },
        headers: {
          //   "X-Client-Info":
          //     '{"a":"3000","ch":"1002","v":"5.0.4","e":"15876471501902670512274"}',
          //   "X-Host": "mall.film-ticket.city.list"
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"15876471501902670512274"}',
          "X-Host": "mall.film-ticket.cinema.list"
        }
      })
      .then(res => {
        console.log(res);
      });
  }
};
</script>

<style lang="scss" scoped>
</style>