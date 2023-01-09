<template>
  <q-page class="flex flex-center main-page">

    <div class="container">
      <q-btn v-show="uid" outline color="primary" class="q-mb-md logout-button" label="로그아웃" @click="logout" />
      <div class="title-row">
        <div class="title">{{ nickname?nickname: "게스트" }}의 롤인 그룹</div>
      </div>
      <div class="group-list">
        <div class="add-group" @click="bottomLayer = true">
          + 추가하기
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
      actions: [
        { name: '생성하기' },
        { name: '참여하기' },
      ],
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
    onSelectBottomLayer (value) {
      console.log(value.name)
      if (value.name == "생성하기") {
        this.$router.push("/create-group")
      }
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
  justify-content: flex-start;
  padding: 10vh 5vw;

  .container {
    width: 100%;
  }

  .title-row {
    display: flex;
    padding-bottom: 5vh;
    ;

    .title {
      font-size: 24px;

    }
  }

  .group-list {
    width: 100%;
    display: flex;
    flex-direction: column;

    .add-group {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      border-radius: 15px;
      background: black;
      width: 100%;

      cursor: pointer;
    }
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
