<template>
  <q-page class="flex flex-center main-page">

    <div class="container">
      <div class="title-row">
        <div class="title">롤링 페이퍼 로고</div>
      </div>
      <div class="button-list">
        <div class="add-group" @click="createGroup">
          롤링페이퍼 만들기
        </div>
        <div class="join-group" @click="$router.push('join-group')">
          참가하기
        </div>
        <div class="login-join-buttons">
          <div @click="$router.push('/login')" v-show="!uid">로그인</div>
          <div @click="logout" v-show="uid">로그아웃</div>
          <div @click="$router.push('/join')" v-show="!uid">회원가입</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { T } from "../store/module-example/types";
import { getAuth, signOut } from "firebase/auth";
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
      localNickname: "",
    };
  },
  mounted () {
    // this.showLoading();
  },
  methods: {

    saveNickName () {
      this.$store.dispatch(T.SET_LOGIN_USER_INFO, {
        nickname: this.localNickname
      })
    },
    createGroup () {
      this.$router.push("/create-group")
    },
    logout () {
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }
  }
};
</script>

<style lang="scss">
.main-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .title-row {
    display: flex;
    background: #ddd;
    justify-content: center;
    align-items: center;
    height: 300px;
    ;


    .title {
      font-size: 36px;
      font-weight: bold;
    }
  }

  .button-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: auto;
  }

  .bottom-layer {
    padding: 50px;
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: column;

    &__button {
      height: 50%;


      &:first-child {
        margin-bottom: 10px;
      }
    }
  }

  .logout-button {
    width: 120px;
    ;
  }

  .login-join-buttons {
    display: flex;
    justify-content: space-between;

    padding: 0 5px;

    &>div {
      font-size: 20px;
      font-weight: bold;
      margin-top: 15px;
      ;
    }
  }
}
</style>
