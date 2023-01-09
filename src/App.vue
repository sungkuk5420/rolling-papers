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

        console.log(`uid is ${uid}`)
        thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, {
          email: user.email,
          uid: user.uid,
        })


        const db = getDatabase();
        const groupUid = localStorage.getItem("groupUid")
        const groupName = localStorage.getItem("groupName")
        if (groupUid) {
          localStorage.removeItem("groupUid")
          localStorage.removeItem("groupName")
          set(ref(db, 'groups/' + groupUid), {
            groupName: groupName,
            uid: user.uid,
            code: groupUid,
            createUserEmail: this.email,
          });
          this.$q.notify({
            position: "top",
            timeout: 500,
            message: "그룹생성완료",
            icon: "announcement"
          });
          this.$router.push(`/group-info?code=${groupUid}`)
        } else {

          const starCountRef = ref(db, 'nicknames/' + user.uid);
          onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data)

            if (data) {
              const nickname = data.nickname
              this.$store.dispatch(T.SET_LOGIN_USER_INFO, { nickname })
            } else {
              thisObj.$router.push("/set-nickname")
            }
          });
        }
      } else {
        // User is signed out
        this.$store.dispatch(T.SET_LOGIN_USER_INFO, { nickname: null, email: null, uid: null })
      }
    });
  },
};
</script>

<style lang="scss">
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

.add-group,
.join-group {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  background: #ddd;
  width: 100%;
  font-weight: bold;
  font-size: 20px;


  &:first-child {
    margin-bottom: 10px;
    ;
  }


  cursor: pointer;
}
</style>
