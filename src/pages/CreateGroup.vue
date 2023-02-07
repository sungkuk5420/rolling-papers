<template>
  <q-page class="flex flex-center create-group-page">

    <div class="group-name">
      <div class="container">
        <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" animated
          control-color="primary" class="rounded-borders">
          <q-carousel-slide name="create1" class="column no-wrap create1">
            <div class="row-div create1__title">
              롤링페이퍼를
            </div>
            <div class="row-div create1__title">
              어떻게 불러드리면 될까요?
            </div>
            <div class="row-div create1__sub-title">
              김성국의 퇴사 등 한번에 알 수 있도록 설정해주세요.
            </div>
            <div class="row-div group-name-wrapper"><q-input ref="groupName" class="group-name-input"
                :rules="[val => val.length <= 20]" outlined v-model="groupName" placeholder="20글자 내로 입력해주세요.">
                <span class="input-length">{{ groupName.toString().length }}/20</span>
              </q-input>
            </div>
            <div class="add-group" @click="createStep2">
              次へ
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="create2" class="column no-wrap create2">
            <div class="row-div create1__title">
              {{ groupName }}와
            </div>
            <div class="row-div create1__title">
              어울리는 테마를 선택해주세요
            </div>
            <div class="theme-list">
              <div class="theme" :class="selectTheme == index + 1 ? 'is-active' : ''"
                v-for="(item, index) in themeGroupList" :key="index" @click="() => { selectThemeFunc(index) }">
                <div class="theme__wrapper">
                  <!-- <img src="" alt="" srcset=""> -->
                  <div class="theme__title">{{ item.name }}</div>
                  <div class="theme__image">
                    <img :src="getImgUrl(item.img)" alt="" srcset="">
                  </div>
                </div>
              </div>
            </div>
            <div class="add-group" @click="createGroup" :disabled="selectTheme == 0">
              作成完了
            </div>
            <van-action-sheet :round="false" v-model="loginGuideLayer" class="login-guide-layer">
              <div class="login-guide-layer__title">롤링페이퍼를 만드려면</div>
              <div class="login-guide-layer__title">로그인이 필요해</div>
              <div class="login-guide-layer__image" v-show="selectTheme == index + 1"
                v-for="(item, index) in themeGroupList" :key="index">
                <img :src="getImgUrl(item.img)" alt="" srcset="">
              </div>
              <q-btn style="background:#000; color:white; width:100%;" class="login-guide-layer__login-button"
                @click="lineLogin">
                <span :slot="label">애플로 시작하기</span>
              </q-btn>
              <a class="login-guide-layer__login-button line"
                href="https://access.line.me/dialog/oauth/weblogin?response_type=code&client_id=1657857854&redirect_uri=https://rolling-papers.netlify.app/line-login&state=asmdkf">
                <img src="~assets/line-icon.png" :slot="icon" alt="" srcset="">라인으로
                시작하기</a>
              <!-- <a class="login-guide-layer__login-button line"
                href="https://access.line.me/dialog/oauth/weblogin?response_type=code&client_id=1657857854&redirect_uri=http://localhost:8080/line-login&state=asmdkf">
                <img src="~assets/line-icon.png" :slot="icon" alt="" srcset="">로컬 라인</a> -->

              <q-btn style="background:#F5F5F5;color:#666666;width:100%;" class="login-guide-layer__login-button google"
                @click="googleLogin">
                <img src="~assets/google-icon.png" :slot="icon" alt="" srcset="">
                <span :slot="label">구글로 시작하기</span>
              </q-btn>
              <q-btn style="background:white; color:#999999; border:1px solid #d2d2d2; width:100%;"
                class="login-guide-layer__login-button" label="이메일로 시작하기" @click="$router.push('/login')" />
            </van-action-sheet>
            <van-action-sheet :round="false" v-model="createLayer" class="login-guide-layer">
              <div class="login-guide-layer__title">{{ groupName }}</div>
              <div class="login-guide-layer__title">롤링 페이퍼를 시작해보자!</div>
              <div class="login-guide-layer__image" v-show="selectTheme == index + 1"
                v-for="(item, index) in themeGroupList" :key="index">
                <img :src="getImgUrl(item.img)" alt="" srcset="">
              </div>
              <div class="login-guide-layer__buttons">
                <q-btn style="background:#F5F5F5; color:#999999;" class="login-guide-layer__cancel" label="취소"
                  @click="createLayer = false" />
                <q-btn style="background:#FAE54D;" class="login-guide-layer__confirm" label="만들기"
                  @click="createGroupConfirm" />
              </div>
            </van-action-sheet>
          </q-carousel-slide>
        </q-carousel>
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
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
      slide: "create1",
      groupName: "",
      groupUid: "",
      groupCode: "",
      selectTheme: 0,
      loginGuideLayer: false,
      createLayer: false,
      actions: [
        { name: '생성하기' },
        { name: '참여하기' },
      ],
      themeGroupList: [
        {
          name: "이직 성공 축하!",
          img: "theme-1.png"
        },
        {
          name: "고마워요",
          img: "theme-2.png"
        },
        {
          name: "힘내요",
          img: "theme-3.png"
        },
        {
          name: "축하해요",
          img: "theme-4.png"
        },
      ],

    };
  },
  watch: {
    groupName (value) {
      this.groupName = value.slice(0, 20)
    }
  },
  mounted () {
    // this.showLoading();
    this.$refs.groupName.focus()
  },
  methods: {
    googleLogin () {
      const auth = getAuth();
      auth.languageCode = 'ja'

      const provider = new GoogleAuthProvider();
      console.log(provider)
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
    selectThemeFunc (index) {
      this.selectTheme = index + 1;
    },
    createStep2 () {
      if (!this.groupName) {
        this.errorMessage('그룹이름을 입력하세요.')
        return false;
      }
      this.slide = 'create2'
    },
    async createGroup () {
      if (this.selectTheme == 0) {
        this.errorMessage("테마를 선택해주세요.")
        return false;
      }
      await this.createGroupUid().then(result => {
        this.groupUid = result
      });
      await this.createGroupCode().then(result => {
        this.groupCode = result
      });
      if (this.uid) {
        this.createLayer = true
      } else {
        localStorage.setItem("groupUid", this.groupUid)
        localStorage.setItem("groupName", this.groupName)
        localStorage.setItem("groupCode", this.groupCode)
        this.loginGuideLayer = true;
        // this.$router.push("/login")
      }
    },
    createGroupConfirm () {
      const db = getDatabase();
      set(ref(db, 'groups/' + this.groupUid), {
        groupName: this.groupName,
        code: this.groupCode,
        createUserUid: this.uid,
        createUserEmail: this.email,
      });
      set(ref(db, 'groupCodes/' + this.groupCode), {
        groupUid: this.groupUid,
      });
      this.$router.push(`/group-info?groupUid=${this.groupUid}&groupCode=${this.groupCode}`)
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

  .q-carousel {
    height: 100%;
  }

  .create1 {
    padding: 0;

    &__title {
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      margin-bottom: 12px;
      ;
    }

    &__sub-title {
      line-height: 20px;
      color: #666666;
    }

    .group-name-wrapper {
      display: flex;
      flex: 1;
    }

    .group-name-input {
      width: 100%;
      height: 100%;
      position: relative;
      font-size: 16px;
      line-height: 24px;

      .q-field__inner,
      .q-field__control {
        height: 100%;
      }

      .q-field__control {
        padding-left: 20px;
      }
    }

    .q-field--outlined .q-field__control:before,
    .q-field--outlined .q-field__control:after {
      border: 0 !important;
    }

    .input-length {
      color: #000;
      height: 22px;

      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }

    .add-group {
      margin-top: auto;
      display: flex;
      height: 44px;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;

      background: #FAE54D;
      border-radius: 8px;
    }
  }

  .q-carousel {
    display: flex;
    height: 100%;
    width: 100%;

    .q-carousel__slides-container {
      height: 100%;
      width: 100%;

    }

    .create2 {
      padding: 0;

      .theme-list {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        margin-bottom: 20px;
        overflow-y: auto;
        padding: 10px;
        gap: 20px;
        overflow: visible;

        .theme {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 18px;
          flex: 1;
          width: calc(50% - 10px);
          flex: none;
          cursor: pointer;
          position: relative;
          padding: 18px 12px;
          box-sizing: border-box;

          &:hover,
          &.is-active {
            transform: scale(1.05);
          }

          &.is-active {
            border: 2px solid #000;
          }

          &:nth-child(1) {
            background: #FAE54D;
          }

          &:nth-child(2) {
            background: #4B69FE;
          }

          &:nth-child(3) {
            background: #FF7D5A;
          }

          &:nth-child(4) {
            background: #6532E9;
          }

          &__gorup-name {
            font-weight: 700;
            font-size: 18px;
            line-height: 24px;
            color: #666666;
          }

          &__wrapper {
            display: flex;
            flex-direction: column;
            flex: 1;
            width: 50%;
            height: 100%;
          }

          &__image {
            flex: 1;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            margin-right: 10px;

            img {
              -webkit-user-drag: none;
              -khtml-user-drag: none;
              -moz-user-drag: none;
              -o-user-drag: none;
              user-drag: none;
            }
          }

          &__title {
            font-weight: 700;
            font-size: 14px;
            line-height: 20px;
            color: #000000;
            margin-top: 8px;
          }

          &__description {
            font-size: 12px;
            line-height: 18px;
            color: #000000;
            margin-top: 3px;
          }

        }

      }

      .add-group {
        margin-top: auto;
        display: flex;
        height: 44px;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;

        background: #FAE54D;
        border-radius: 8px;
      }

      .login-guide-layer {
        &>* {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        &__title {
          font-weight: 700;
          font-size: 24px;
          line-height: 32px;
        }

        &__image {
          margin: 20px 0;
        }

        &__login-button {
          border-radius: 8px;
          height: 44px;
          margin-bottom: 12px;

          img {
            margin-right: 8px;
          }

          .q-btn__wrapper:before {
            box-shadow: none !important;
          }

          &.line {
            background: rgb(6, 199, 85);
            color: white;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
              opacity: 0.8
            }
          }
        }

        &__buttons {
          display: flex;
          width: 100%;
          gap: 10px;
          padding-bottom: 20px;

          .q-btn {
            width: 50%;
            display: flex;

            .q-btn__wrapper:before {
              box-shadow: none;
            }
          }
        }
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

}
</style>
