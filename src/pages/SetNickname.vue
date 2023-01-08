<template>
  <q-page class="flex flex-center main-page">

    <div class="setting-nickname">
      <div class="container">
        <div class="row-div">
          계정명을 입력해주세요.
        </div>
        <div class="row-div"><q-input v-model="localNickname" />
        </div>
      </div>
      <div class="footer-div">
        <q-btn color="white" text-color="black" label="저장하기" @click="saveNickname" />
      </div>
    </div>

  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { T } from "../store/module-example/types"
import { getDatabase, ref, set } from "firebase/database";
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
    saveNickname () {
      const db = getDatabase();
      set(ref(db, 'nicknames/' + this.uid), {
        nickname: this.localNickname,
        email: this.email,
      });
      this.$store.dispatch(T.SET_LOGIN_USER_INFO, { nickname: this.localNickname })
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

  .setting-nickname {
    padding: 10vh 0;
    height: 100%;
    width: 100%;

    .container {
      width: 100%;
      padding: 0 20px;
      ;
    }

    .row-div {
      flex: 1;
    }
  }

  .footer-div {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ddd;
    height: 50px;
    bottom: 0;
    position: absolute;
    width: 100%;

    .q-btn {
      width: 100%;
      height: 100%;
      border: 1px solid #ddd;
    }

    .q-btn__wrapper:before {
      box-shadow: none;
    }
  }
}
</style>
