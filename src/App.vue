<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { T } from "./store/module-example/types"
import { getDatabase, ref, set, onValue } from "firebase/database";
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

        const database = getDatabase();
        console.log(`uid is ${uid}`)
        console.log(database)
        thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, {
          email: user.email,
          uid: user.uid,
        })
        const db = getDatabase();
        const starCountRef = ref(db, 'nicknames/' + user.uid);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          const nickname = data.nickname
          if (nickname) {
            this.$store.dispatch(T.SET_LOGIN_USER_INFO, { nickname })
            thisObj.$router.push("/main")
          } else {
            thisObj.$router.push("/set-nickname")
          }
        });
      } else {
        // User is signed out
        // ...
      }
    });
  },
};
</script>

<style>
#q-app,
.q-footer,
.q-header {
  width: 100%;
  max-width: 375px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #ddd;
}
</style>
