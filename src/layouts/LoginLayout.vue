<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view :changeLeftDrawer="changeLeftDrawer" />
    </q-page-container>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1" overlay :width="300">
      <q-list>
        <q-item-label header>
          <div class="join-title">
            회원가입
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
          <div class="join-row">
            <q-btn outline color="primary" class="q-mb-md" label="회원가입" @click="join" />
          </div>
        </q-item-label>
      </q-list>
    </q-drawer>
  </q-layout>
</template>

<script>

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import UtilMethodMixin from "../UtilMethodMixin";
export default {
  mixins: [UtilMethodMixin],
  name: "MainLayout",
  components: {
    // EssentialLink 
  },
  data () {
    return {
      leftDrawerOpen: false,
      email: "",
      password: "",
      // essentialLinks: linksData,
    };
  },
  methods: {
    changeLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    join () {
      const thisObj = this;
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          thisObj.successMessage("회원가입 완료")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          if (errorCode == "auth/email-already-in-use") {
            thisObj.errorMessage("이미 가입된 유저 입니다.")
          } else if (errorCode == "auth/invalid-email") {
            thisObj.errorMessage("이메일의 형식을 확인 해 주세요.")
          } else {
            thisObj.errorMessage("회원가입 실패.")
          }
          console.log(errorMessage)
          // ..
        });

    }
  }
};
</script>

<style lang="scss">
.join-title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 30px;
  ;
}

.join-row {
  margin: 5px 0;
}
</style>