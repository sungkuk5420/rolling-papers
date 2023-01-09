<template>
  <q-page class="flex flex-center create-group-page">

    <div class="group-name">
      <div class="container">
        <div class="row-div">
          그룹 이름을 입력해주세요.
        </div>
        <div class="row-div"><q-input v-model="groupName" />
        </div>
      </div>
      <div class="footer-div">
        <q-btn color="white" text-color="black" label="다음" @click="saveNickname" />
      </div>
    </div>

  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { T } from "../store/module-example/types"
import { getDatabase, ref, set, child, get } from "firebase/database";
import { uid } from 'quasar'
import { resolve } from "path";
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
      groupName: "",
    };
  },
  mounted () {
    // this.showLoading();
  },
  methods: {
    async saveNickname () {
      let groupUid = "";
      const db = getDatabase();
      await this.createGroupUid().then(resultGroupId => {
        groupUid = resultGroupId
      });
      localStorage.setItem("groupUid", groupUid)
      localStorage.setItem("groupName", this.groupName)
      if (this.uid) {
        set(ref(db, 'groups/' + groupUid), {
          groupName: this.groupName,
          uid: this.uid
        });
        this.$router.push("/group-info")
      } else {
        // this.$router.push("/login")
      }
    },
    checkGroupUidIsUnique ({ groupUid }) {
      return new Promise((resolve, reject) => {
        const db = getDatabase();
        console.log(groupUid)
        const dbRef = ref(getDatabase());
        get(child(dbRef, `groups/${groupUid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            console.log("그룹코드가 존재합니다")
            reject()
          } else {
            console.log("No data available");
            console.log("그룹코드가 없습니다!")
            resolve()
          }
        }).catch((error) => {
          console.error(error);
        });
      })

    },
    async createGroupUid () {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          let fixGroupUid = "";
          while (fixGroupUid == "") {
            console.log("while")
            function getRandomIntInclusive (min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
            }
            let groupUid = getRandomIntInclusive(1, 999)
            // let groupUid = uid().slice(0, 4)
            if (groupUid.toString().length == 3) {
              groupUid = "0" + groupUid;
            } else if (groupUid.toString().length == 2) {
              groupUid = "00" + groupUid;
            } else if (groupUid.toString().length == 1) {
              groupUid = "000" + groupUid;
            }
            console.log("그룹 코드 체크!", groupUid)
            await this.checkGroupUidIsUnique({
              groupUid
            }).then(() => {
              fixGroupUid = groupUid
              console.log("그룹 코드 저장!")
              resolve(groupUid)
            }).catch(() => {
              console.log("그룹 코드 재탐색!")
              fixGroupUid = "";
            })
          }
        }, 0);
      });

    }
  }
};
</script>

<style lang="scss">
.create-group-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;

  .group-name {
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
