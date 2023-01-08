<template>
  <q-page class="flex flex-center main-page">

    <div class="setting-nickname">
      <div class="container">
        <div class="row-div">
          당신이 진행중인 롤링 페이퍼
        </div>
      </div>
      <div class="footer-div">
        <q-btn color="white" text-color="black" label="저장하기" @click="saveNickName" />
      </div>
    </div>

  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { T } from "../store/module-example/types"
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
      localNickname: "",
    };
  },
  watch: {
    nickname () {
      console.log("닉네임저장완료 ")
      this.$router.push("/main")
    }
  },
  mounted () {
    // this.showLoading();
  },
  methods: {
    saveNickName () {
      this.$store.dispatch(T.SET_LOGIN_USER_INFO, {
        nickname: this.localNickname
      })
    }
  }
};
</script>

<style lang="scss">
.main-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;

}
</style>
