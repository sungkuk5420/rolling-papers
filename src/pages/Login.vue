<template>
  <q-page class="flex flex-center login-page">
    <div class="container">
      <div class="q-mb-xs title-text">
        간편하게 로그인하고
      </div>
      <div class="title-text">
        롤링페이퍼를 이용해보세요.
      </div>
      <div class="join-row">
        아이디
      </div>
      <div class="join-row">
        <q-input outlined v-model="email" />
      </div>
      <div class="join-row">
        비밀번호
      </div>
      <div class="join-row">
        <q-input outlined type="password" v-model="password" />
      </div>
      <div class="join-row"><q-btn outline color="primary" class="q-mb-md" label="로그인" @click="login" />
      </div>
    </div>
    <div class="buttons">
      <q-btn outline color="primary" class="q-mb-md" label="이메일 회원가입" @click="openDrawer" />
      <q-btn outline color="primary" label="카카오로 로그인" />
    </div>
  </q-page>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  props: ["changeLeftDrawer"],
  mounted () {
  },
  data () {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    openDrawer () {
      this.changeLeftDrawer()
    },
    login () {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }
};
</script>

<style lang="scss">
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 10vh;

  .container {
    max-width: 375px;
    ;
  }


  .title-text {
    font-size: 24px;
  }

  .buttons {
    padding-bottom: 10vh;
    margin-top: auto;
    display: flex;
    flex-direction: column;

  }

  .join-row {
    margin: 5px 0;
    display: flex;
    justify-content: flex-start;
    flex: 1;
    width: 100%;

    .q-input {
      width: 100%;
    }
  }
}
</style>
