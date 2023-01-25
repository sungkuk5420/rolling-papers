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
            <div class="row-div group-name-wrapper"><q-input class="group-name-input" :rules="[val => val.length <= 20]"
                outlined v-model="groupName" placeholder="20글자 내로 입력해주세요.">
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
              <div class="theme" v-for="(item, index) in themeGroupList" :key="index" :class="`theme-${index}`">
                <div class="theme__gorup-name">
                  {{ item.groupName }}
                </div>
                <div class="theme__x-scroll">
                  <div class="theme__wrapper" v-for="(currentTheme, index2) in item.themeList" :key="index2">
                    <!-- <img src="" alt="" srcset=""> -->
                    <div class="theme__image"></div>
                    <div class="theme__title">{{ currentTheme.title }}{{ index2+ 1 }}</div>
                    <div class="theme__description">{{ currentTheme.description }}{{ index2+ 1 }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="add-group" @click="createGroup">
              作成完了
            </div>
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
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
      slide: "create1",
      groupName: "",
      themeGroupList: [
        {
          groupName: '퇴사했어요',
          themeList: [
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
          ]
        },
        {
          groupName: '퇴사했어요',
          themeList: [
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
          ]
        },
        {
          groupName: '퇴사했어요',
          themeList: [
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
          ]
        },
        {
          groupName: '퇴사했어요',
          themeList: [
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
          ]
        },
        {
          groupName: '퇴사했어요',
          themeList: [
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
            {
              title: '타이틀',
              description: '디스크립션',
            },
          ]
        },
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
    createStep2 () {
      if (!this.groupName) {
        this.errorMessage('그룹이름을 입력하세요.')
        return false;
      }
      this.slide = 'create2'
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
        flex-wrap: nowrap;
        flex-direction: column;
        width: 100%;
        height: 100%;
        flex: 1;
        margin-bottom: 20px;
        overflow-y: auto;

        .theme {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          border-radius: 18px;
          width: 100%;
          flex: none;
          cursor: pointer;

          .theme__wrapper {
            display: flex;
            flex-direction: column;

            margin-right: 8px;
          }



          &__x-scroll {
            overflow-x: auto;
            display: flex;
            width: 100%;

          }

          &__gorup-name {
            font-weight: 700;
            font-size: 18px;
            line-height: 24px;
            color: #666666;
          }

          &__wrapper {}

          &__image {
            background: #ddd;
            width: 233px;
            height: 134px;
            border-radius: 12px;
            margin-top: 8px;
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
