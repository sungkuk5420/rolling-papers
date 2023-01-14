<template>
  <q-page class="flex flex-center main-page">

    <div class="container">
      <!-- <q-btn v-show="uid" outline color="primary" class="q-mb-md logout-button" label="로그아웃" @click="logout" /> -->
      <div class="title-row">
        <div class="title">롤링 페이퍼 로고</div>
      </div>
      <div class="button-list">
        <div class="add-group" @click="createGroup">
          롤링페이퍼 만들기
        </div>
        <div class="join-group" @click="bottomLayer = true">
          참가하기
        </div>
      </div>
      <van-action-sheet v-model="bottomLayer" :actions="actions" @select="onSelectBottomLayer" cancel-text="Cancel"
        close-on-click-action>
      </van-action-sheet>
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
      bottomLayer: false,
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
  height: 100vh;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;

  .container {
    width: 100%;
    height: 667px;
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
}
</style>
