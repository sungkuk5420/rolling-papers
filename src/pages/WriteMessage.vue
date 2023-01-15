<template>
  <q-page class="flex flex-center write-message-page">

    <div class="group-name">
      <div class="container">
        <div class="header q-mb-md">
          <q-icon name="arrow_back_ios" style="font-size: 24px;cursor: pointer;" @click="$router.go(-1)"></q-icon>
        </div>
        <div class="row-div"><q-input class="message-input" :class="fontClass" type="textarea"
            :rules="[val => val.length <= 20]" outlined v-model="message" placeholder="메세지를 남겨주세요.">
            <span class="input-length">{{ message.toString().length }}/20</span>
          </q-input>
        </div>
        <div class="row-div title q-mt-md">
          작성자명
        </div>
        <div class="row-div"><q-input class="writer-input" :rules="[val => val.length <= 10]" outlined v-model="writer"
            placeholder="이름이나 단어, 문장을 입력해주세요.">
            <span class="input-length">{{ writer.toString().length }}/10</span>
          </q-input>
          <div class="row-div title q-mt-md">
            폰트
          </div>
          <div class="font-button-group">
            <q-btn class="first-font" push label="폰트 1" @click="function () {
              changeFont(1)
            }" />
            <q-btn class="second-font" push label="폰트 2" @click="function () {
              changeFont(2)
            }" />
            <q-btn class="third-font" push label="폰트 3" @click="function () {
              changeFont(3)
            }" />
          </div>
          <div class="row-div title q-mt-md">
            <div class="title__left">
              <div>익명</div>
              <div class="title__sub">작성자만 볼 수 있습니다.</div>
            </div>
            <div class="title__right">
              <q-toggle size="xl" v-model="toggle" />
            </div>
          </div>
        </div>
        <div class="add-group" @click="createGroup">
          메세지 남기기
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
      toggle: false,
      message: "",
      writer: "",
      fontClass: "",
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
    message (value) {
      this.message = value.slice(0, 20)
    },
    writer (value) {
      this.writer = value.slice(0, 10)
    }
  },
  mounted () {
    // this.showLoading();
  },
  methods: {
    changeFont (value) {
      switch (value) {
        case 1:
          this.fontClass = "first-font"
          break;
        case 2:
          this.fontClass = "second-font"
          break;
        case 3:
          this.fontClass = "third-font"
          break;

        default:
          break;
      }
    },
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
.write-message-page {
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
    display: flex;
    width: 100%;

    &__left {
      flex: 1;
    }

    &__sub {
      opacity: 0.2;
      font-weight: bold;
      font-size: 14px;
    }

    &__right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }

  .q-textarea .q-field__native {
    line-height: 1 !important;
  }

  .first-font {

    .q-btn__content,
    textarea {
      font-family: 'Black Han Sans', sans-serif;
    }
  }

  .second-font {

    .q-btn__content {
      font-size: 20px;
    }

    .q-btn__content,
    textarea {
      font-family: 'Dongle', sans-serif;
    }
  }

  .third-font {
    .q-btn__content {
      font-size: 20px;
    }

    .q-btn__content,
    textarea {
      font-family: 'Nanum Pen Script', cursive;
    }
  }

  .q-toggle__track {
    height: 0.5em;
    margin-top: -0.08em;
    border-radius: 15px;

  }

  .message-input {
    height: 300px;
    font-size: 30px;
    letter-spacing: 0;

  }

  .q-field__inner,
  .q-field__control {
    height: 300px;
  }

  .q-field__control {
    padding-left: 20px;
  }

  position: relative;

  .input-length {
    position: absolute;
    color: #000;
    bottom: 15px;
    right: 10px;
    font-size: 14px;
  }

}

.writer-input {
  height: 66px;
  letter-spacing: 0;
  position: relative;

  .q-field__inner,
  .q-field__control {
    height: 66px;
  }

  .q-field__control {
    padding-left: 20px;
  }


  .input-length {
    position: absolute;
    color: #000;
    height: 20px;
    bottom: 0;
    top: 0;
    margin: auto;
    right: 10px;
    font-size: 14px;
  }
}

.font-button-group {
  display: flex;
  gap: 10px;
  justify-content: space-between;

  .q-btn {
    flex: 1;
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
</style>
