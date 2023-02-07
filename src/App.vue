<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { T } from "./store/module-example/types"
import { getDatabase, ref, set, get, child } from "firebase/database";
export default {
  name: "App",
  mounted () {

    const thisObj = this;
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log("change!")
      if (user) {
        console.log("login완료!")
        console.log(user)
        const uid = user.uid;

        console.log(`uid is ${uid}`)
        const isGoogleLogin = (user?.providerData[0]?.providerId === "google.com") ? true : false
        const isLineLogin = (!user.providerData[0] && providerId === "firebase") ? true : false
        let loginType = "email"
        if (isGoogleLogin) {
          loginType = "google"
        }
        if (isLineLogin) {
          loginType = "line"
        }
        thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, {
          email: user.email,
          uid: user.uid,
          loginType
        })
        const db = getDatabase();
        const groupUid = localStorage.getItem("groupUid")
        const groupName = localStorage.getItem("groupName")
        const groupCode = localStorage.getItem("groupCode")
        if (groupUid) {
          localStorage.removeItem("groupUid")
          localStorage.removeItem("groupName")
          localStorage.removeItem("groupCode")
          set(ref(db, 'groups/' + groupUid), {
            groupName: groupName,
            code: groupCode,
            createUserUid: user.uid,
            createUserEmail: user.email,
          });
          setTimeout(() => {

            thisObj.$q.notify({
              position: "top",
              timeout: 500,
              message: "그룹생성완료",
              icon: "announcement"
            });
          }, 0);
          this.$router.push(`/group-info?groupUid=${groupUid}&groupCode=${groupCode}`)
        }
      } else {
        thisObj.$q.notify({
          position: "top",
          timeout: 500,
          message: "로그아웃",
          icon: "announcement"
        });
        thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, { nickname: null, email: null, uid: null })
      }
    });
  },
};
</script>

<style lang="scss">
.share-action-sheet,
.login-guide-layer,
.van-number-keyboard {
  width: 100%;
  max-width: 390px;
  left: 0;
  right: 0;
  margin: auto;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 12px 18px;
}

html {
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: auto;
  bottom: 0;

}

html,
body,
#q-app,
.q-layout,
.q-footer,
.q-header {
  width: 100%;
  max-width: 390px;
  height: 100%;
  max-height: 844px;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  align-items: flex-end;
  justify-content: flex-start;
  border: 1px solid #ddd;
}

#q-app {
  overflow: auto;
}

.q-page-container,
.q-layout,
.q-page {
  height: 100%;
  min-height: inherit !important;
}

.footer-button {
  font-size: 20px;
  font-weight: bold;
}

.join-group {
  margin-top: 12px;
}

.add-group,
.join-group {
  width: 100%;
  height: 60px;
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  background: #ddd;
  width: 100%;
  font-weight: bold;
  font-size: 20px;



  cursor: pointer;
}
</style>
