<template>
  <q-page class="flex flex-center create-group-page">

    <div class="group-name">
      <div class="container">
        <div class="header q-mb-md">
          <q-icon name="arrow_back_ios" style="font-size: 24px;cursor: pointer;" @click="$router.go(-1)"></q-icon>
        </div>
        <div class="row-div title">
          제목 입력
        </div>
        <div class="row-div"><q-input class="group-name-input" :rules="[val => val.length <= 20]" outlined
            v-model="groupName" placeholder="이름이나 단어, 문장을 입력해주세요.">
            <span class="input-length">{{ groupName.toString().length }}/20</span>
          </q-input>
        </div>
        <div class="row-div title q-mt-xl">
          테마 선택
        </div>
        <div class="theme-list">
          <div class="theme" v-for="(item, index) in themeList" :key="index" :class="`theme-${index}`">{{ item }}</div>
        </div>
        <div class="add-group" @click="createGroup">
          롤링페이퍼 만들기
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { T } from "../store/module-example/types"
import { uid } from 'quasar'
import { getDatabase, ref, set, child, get } from "firebase/database";
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
      groupName: "",
      themeList: [
        "직접추가",
        "🎉",
        "🎉",
        "🎉",
        "🎉",
        "🎉",
        "🎉",
        "🎉",
        "🎉",
      ]
    };
  },
  watch: {
    groupName (value) {
      this.groupName = value.slice(0, 20)
    }
  },
  mounted () {
    // this.showLoading();
  },
  methods: {
    async createGroup () {
      let groupUid = "";
      let groupCode = "";
      const db = getDatabase();
      await this.createGroupUid().then(result => {
        groupUid = result
      });
      await this.createGroupCode().then(result => {
        groupCode = result
      });
      if (this.uid) {
        set(ref(db, 'groups/' + groupUid), {
          groupName: this.groupName,
          code: groupCode,
          createUserUid: this.uid,
          createUserEmail: this.email,
        });
        set(ref(db, 'groupCodes/' + groupCode), {
          groupUid: groupUid,
        });
        this.$router.push(`/group-info?groupUid=${groupUid}&groupCode=${groupCode}`)
      } else {
        localStorage.setItem("groupUid", groupUid)
        localStorage.setItem("groupName", this.groupName)
        localStorage.setItem("groupCode", groupCode)
        this.$router.push("/login")
      }
    },
    checkGroupCodeIsUnique ({ groupCode }) {
      return new Promise((resolve, reject) => {
        const db = getDatabase();
        console.log(groupCode)
        const dbRef = ref(getDatabase());
        get(child(dbRef, `groupCodes/${groupCode}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log("그룹코드가 존재합니다")
            reject()
          } else {
            console.log("그룹코드가 없습니다!")
            resolve()
          }
        }).catch((error) => {
          console.error(error);
        });
      })

    },
    checkGroupUidIsUnique ({ groupUid }) {
      return new Promise((resolve, reject) => {
        const db = getDatabase();
        console.log(groupUid)
        const dbRef = ref(getDatabase());
        get(child(dbRef, `groups/${groupUid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            // console.log("그룹코드가 존재합니다")
            reject()
          } else {
            // console.log("그룹코드가 없습니다!")
            resolve()
          }
        }).catch((error) => {
          console.error(error);
        });
      })

    },
    async createGroupCode () {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          let fixGroupCode = "";
          while (fixGroupCode == "") {
            console.log("while")
            function getRandomIntInclusive (min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
            }
            let groupCode = getRandomIntInclusive(1, 9999)
            // let groupCode = uid().slice(0, 4)
            if (groupCode.toString().length == 3) {
              groupCode = "0" + groupCode;
            } else if (groupCode.toString().length == 2) {
              groupCode = "00" + groupCode;
            } else if (groupCode.toString().length == 1) {
              groupCode = "000" + groupCode;
            }
            console.log("그룹 코드 체크!", groupCode)
            await this.checkGroupCodeIsUnique({
              groupCode
            }).then(() => {
              fixGroupCode = groupCode
              console.log("그룹 코드 저장!")
              resolve(fixGroupCode)
            }).catch(() => {
              console.log("그룹 코드 재탐색!")
              fixGroupCode = "";
            })
          }
        }, 0);
      });

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
            let groupUid = uid().slice(0, 8)
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
  height: 100%;

  .header {
    padding: 0 0 20px 0;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 9px;
    ;
  }

  .group-name-input {
    height: 66px;

    .q-field__inner,
    .q-field__control {
      height: 66px;
    }

    .q-field__control {
      padding-left: 20px;
    }
  }

  .input-length {
    color: #000;
    margin-top: 23px;
    margin-right: 10px;
  }

  .theme-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
    ;

    .theme {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 18px;
      background: #ddd;
      width: calc(33.3% - 6.6px);
      height: calc(33.3vw - 26.6px);
      max-height: 100px;
      cursor: pointer;


      &-0 {
        font-size: 14px;
        font-weight: bold;
      }

      &-1,
      &-2,
      &-3,
      &-4,
      &-5,
      &-6,
      &-7,
      &-8 {
        font-size: 40px;
      }
    }
  }



  .group-name {
    height: 100%;
    width: 100%;

    .container {
      width: 100%;
      height: 100%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex: none;
    }

  }

  .add-group {
    margin-top: auto;
    display: flex;
  }
}
</style>
