<template>
  <div class="box">
    <Head title="当前城市" :show="true"></Head>
    <van-notice-bar text="通知内容通知内容通知内容通知内容通知内容" left-icon="volume-o" />
    <!-- indexBar索引栏 -->
    <van-index-bar :index-list="pylist">
      <div v-for="(py,i) in pylist" :key="i">
        <van-index-anchor :index="py" />
        <!-- indexOf等于0，即首字母位置 -->
        <van-cell
          v-for="(city,index) in cityList.filter(item=>item.pinyin.indexOf(py.toLowerCase())=='0')"
          :key="index"
          :title="city.name"
          @click="selectCity(city)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>


export default {
  data() {
    return {
      cityList: [],
      pylist: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        // "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        // "U",
        // "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  mounted() {
    this.$axios({
      url: "/maizuo/gateway?k=4987132",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"15876471501902670512274"}',
        "X-Host": "mall.film-ticket.city.list"
      }
    }).then(res => {
      this.cityList = res.data.data.cities;
    });
  },
  methods:{
      selectCity(city){
          localStorage.setItem("city",JSON.stringify(city))
          this.$router.push({name:"movie"})
      }
  }
};
</script>