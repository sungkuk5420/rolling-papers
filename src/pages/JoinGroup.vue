<template>
  <q-page class="flex flex-center join-group-page" :class="groupName ? 'loading' : ''">
    <div class="container">
      <div class="group-info">
        <div class="group-info__title" v-show="groupName">
          {{ groupName }}
        </div>
        <div class="group-info__title" v-show="groupName">
          롤링페이퍼로 들어가고 있어.
        </div>
        <div class="group-info__sub-title" v-show="groupName" style="color:#333333; margin-top:12px;">
          조금만 기다려줘~~
        </div>
        <div class="gage-wrapper" v-if="groupName">
          <span class="gage1"></span>
          <span class="gage2"></span>
        </div>
        <div v-show="groupName" class="image-wrapper">
          <img src="~assets/theme-1.png" alt="" srcset="">
        </div>

        <div class="group-info__title" v-show="!groupName">
          롤링페이퍼 작성하기 위해
        </div>
        <div class="group-info__title" v-show="!groupName">
          인증코드를 입력해주세요.
        </div>
        <div class="group-info__sub-title" v-show="!groupName">
          인증코드를 모르신다면 담당자에게 물어보세요.
        </div>
      </div>
      <div class="code-group" v-show="!groupName">
        <svg :class="groupCode[0] ? 'group-code is-active' : 'group-code'" width="18" height="18" viewBox="0 0 18 18"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.06 17.04C13.74 17.04 17.58 13.24 17.58 8.52C17.58 3.84 13.74 -1.90735e-06 9.06 -1.90735e-06C4.38 -1.90735e-06 0.54 3.76 0.54 8.52C0.54 13.28 4.38 17.04 9.06 17.04Z"
            fill="#F5F5F5" />
          <path
            d="M9.06 18.04C14.2892 18.04 18.58 13.7953 18.58 8.52H16.58C16.58 12.6847 13.1908 16.04 9.06 16.04V18.04ZM18.58 8.52C18.58 3.28771 14.2923 -1 9.06 -1V0.999998C13.1877 0.999998 16.58 4.39228 16.58 8.52H18.58ZM9.06 -1C3.83385 -1 -0.46 3.2016 -0.46 8.52H1.54C1.54 4.3184 4.92615 0.999998 9.06 0.999998V-1ZM-0.46 8.52C-0.46 13.8384 3.83385 18.04 9.06 18.04V16.04C4.92615 16.04 1.54 12.7216 1.54 8.52H-0.46Z"
            fill="#E6E6E6" />
        </svg>
        <svg :class="groupCode[1] ? 'group-code is-active' : 'group-code'" width="18" height="18" viewBox="0 0 18 18"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.06 17.04C13.74 17.04 17.58 13.24 17.58 8.52C17.58 3.84 13.74 -1.90735e-06 9.06 -1.90735e-06C4.38 -1.90735e-06 0.54 3.76 0.54 8.52C0.54 13.28 4.38 17.04 9.06 17.04Z"
            fill="#F5F5F5" />
          <path
            d="M9.06 18.04C14.2892 18.04 18.58 13.7953 18.58 8.52H16.58C16.58 12.6847 13.1908 16.04 9.06 16.04V18.04ZM18.58 8.52C18.58 3.28771 14.2923 -1 9.06 -1V0.999998C13.1877 0.999998 16.58 4.39228 16.58 8.52H18.58ZM9.06 -1C3.83385 -1 -0.46 3.2016 -0.46 8.52H1.54C1.54 4.3184 4.92615 0.999998 9.06 0.999998V-1ZM-0.46 8.52C-0.46 13.8384 3.83385 18.04 9.06 18.04V16.04C4.92615 16.04 1.54 12.7216 1.54 8.52H-0.46Z"
            fill="#E6E6E6" />
        </svg>
        <svg :class="groupCode[2] ? 'group-code is-active' : 'group-code'" width="18" height="18" viewBox="0 0 18 18"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.06 17.04C13.74 17.04 17.58 13.24 17.58 8.52C17.58 3.84 13.74 -1.90735e-06 9.06 -1.90735e-06C4.38 -1.90735e-06 0.54 3.76 0.54 8.52C0.54 13.28 4.38 17.04 9.06 17.04Z"
            fill="#F5F5F5" />
          <path
            d="M9.06 18.04C14.2892 18.04 18.58 13.7953 18.58 8.52H16.58C16.58 12.6847 13.1908 16.04 9.06 16.04V18.04ZM18.58 8.52C18.58 3.28771 14.2923 -1 9.06 -1V0.999998C13.1877 0.999998 16.58 4.39228 16.58 8.52H18.58ZM9.06 -1C3.83385 -1 -0.46 3.2016 -0.46 8.52H1.54C1.54 4.3184 4.92615 0.999998 9.06 0.999998V-1ZM-0.46 8.52C-0.46 13.8384 3.83385 18.04 9.06 18.04V16.04C4.92615 16.04 1.54 12.7216 1.54 8.52H-0.46Z"
            fill="#E6E6E6" />
        </svg>
        <svg :class="groupCode[3] ? 'group-code is-active' : 'group-code'" width="18" height="18" viewBox="0 0 18 18"
          fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.06 17.04C13.74 17.04 17.58 13.24 17.58 8.52C17.58 3.84 13.74 -1.90735e-06 9.06 -1.90735e-06C4.38 -1.90735e-06 0.54 3.76 0.54 8.52C0.54 13.28 4.38 17.04 9.06 17.04Z"
            fill="#F5F5F5" />
          <path
            d="M9.06 18.04C14.2892 18.04 18.58 13.7953 18.58 8.52H16.58C16.58 12.6847 13.1908 16.04 9.06 16.04V18.04ZM18.58 8.52C18.58 3.28771 14.2923 -1 9.06 -1V0.999998C13.1877 0.999998 16.58 4.39228 16.58 8.52H18.58ZM9.06 -1C3.83385 -1 -0.46 3.2016 -0.46 8.52H1.54C1.54 4.3184 4.92615 0.999998 9.06 0.999998V-1ZM-0.46 8.52C-0.46 13.8384 3.83385 18.04 9.06 18.04V16.04C4.92615 16.04 1.54 12.7216 1.54 8.52H-0.46Z"
            fill="#E6E6E6" />
        </svg>
      </div>
      <div class="key-pad" v-show="!groupName">
        <div class="key-pad__number number-1" @click="() => { clickKeyPad('1') }"><img src="~assets/1.png" alt=""
            srcset="">
        </div>
        <div class="key-pad__number number-2" @click="() => { clickKeyPad('2') }"><img src="~assets/2.png" alt=""
            srcset="">
        </div>
        <div class="key-pad__number number-3" @click="() => { clickKeyPad('3') }"><img src="~assets/3.png" alt=""
            srcset="">
        </div>
        <div class="key-pad__number number-4" @click="() => { clickKeyPad('4') }"><img src="~assets/4.png" alt=""
            srcset="">
        </div>
        <div class="key-pad__number number-5" @click="() => { clickKeyPad('5') }"><img src="~assets/5.png" alt=""
            srcset="">
        </div>
        <div class="key-pad__number number-6" @click="() => { clickKeyPad('6') }"><img src="~assets/6.png" alt=""
            srcset="">
        </div>
        <div class="key-pad__number number-7" @click="() => { clickKeyPad('7') }"><img src="~assets/7.png" alt=""
            srcset="">
        </div>
        <div class="key-pad__number number-8" @click="() => { clickKeyPad('8') }"><img src="~assets/8.png" alt=""
            srcset="">
        </div>
        <div class="key-pad__number number-9" @click="() => { clickKeyPad('9') }"><img src="~assets/9.png" alt=""
            srcset="">
        </div>
        <div class="key-pad__number number-block"></div>
        <div class="key-pad__number number-0" @click="() => { clickKeyPad('0') }"><img src="~assets/0.png" alt=""
            srcset=""></div>
        <div class="key-pad__number number-back" @click="() => { clickKeyPad('back') }"><img src="~assets/back.png"
            alt="" srcset=""></div>
      </div>
    </div>

  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { Notify } from 'vant';
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  mounted () {
    // this.showLoading();
  },
  data () {
    return {
      show: true,
      groupCode: '',
      groupName: '',
      groupUid: '',
    };
  },
  mounted () {
    this.groupUid = this.$route.query["groupUid"];
    if (this.groupUid) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `groups/${this.groupUid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          this.groupName = data.groupName
        } else {
          // console.log("그룹코드가 없습니다!")
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  },
  watch: {
    groupName (value) {
      setTimeout(() => {
        this.$router.push(`/group-info?groupUid=${this.groupUid}&groupCode=${this.groupCode}`)
      }, 2100);
    },
    groupCode (value) {
      console.log(value);
      if (value.toString().length == 4) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `groupCodes/${value}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            const data = snapshot.val();
            this.groupUid = data.groupUid


            get(child(dbRef, `groups/${this.groupUid}`)).then((snapshot) => {
              if (snapshot.exists()) {
                console.log(snapshot.val());
                const data = snapshot.val();
                this.groupName = data.groupName
              }
            }).catch((error) => {
              console.error(error);
            });

          } else {
            // this.groupName = "code-error"
            Notify(
              {
                message: '인증코드를 확인하신 후 다시 입력해주세요.',
                color: '#fff',
                background: '#EF5350',
              }
            );
            // console.log("그룹코드가 없습니다!")
          }
        }).catch((error) => {
          console.error(error);
        });
      } else {
        this.groupName = ''
      }
    }
  },
  methods: {
    clickKeyPad (number) {
      if (number == 'back') {
        this.groupCode = this.groupCode.toString().slice(0, this.groupCode.toString().length - 1)
        return false;
      }

      if (this.groupCode.toString().length == 4) {
        return false
      }
      this.groupCode = this.groupCode.toString() + number
    },
    joinGroup () {
      this.$router.push(`/group-info?groupUid=${this.groupUid}&groupCode=${this.groupCode}`)
    }
  }
};
</script>

<style lang="scss">
.join-group-page {
  &.loading {
    background: #FAE54D;
  }

  .container {
    width: 100%;
    height: 100%;
    padding: 30px 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: none;
  }

  .group-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;

    &__title {
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
    }

    &__sub-title {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      margin-top: 12px;
      color: #666666;
    }
  }

  .gage-wrapper {
    position: relative;
    width: 100%;
    height: 30vh;
    display: flex;
    align-items: center;
  }

  .gage1 {
    position: absolute;
    width: 100%;
    height: 13px;
    background: #b6c5d5;
  }

  .gage2 {
    position: absolute;
    width: 100%;
    height: 13px;
    background: #EF5350;
    animation: widthFull 2s ease-in-out;
  }

  @-webkit-keyframes widthFull {
    from {
      width: 0px;
    }

    to {
      width: 100%;
    }
  }

  @keyframes widthFull {
    from {
      width: 0px;
    }

    to {
      width: 100%;
    }
  }

  .image-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: auto;

    img {
      width: 100%;
      max-width: 160px;
      height: auto;
    }
  }

  .code-group {
    display: flex;
    gap: 10px;
    height: 80px;
    top: auto;

    input {
      display: flex;
      justify-content: center;
      text-align: center;
    }

    .q-field__control {
      border-radius: 0;
      font-size: 32px;
      font-weight: bold;
    }
  }

  .code-group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    height: 80px;

    .group-code {

      &.is-active {
        path {
          fill: #FAE54D;

        }
      }
    }
  }

  .key-pad {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 274px;

    &__number {
      display: flex;
      flex: 1;
      min-width: 33.3%;
      width: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;

      img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
      }

      &:active {
        background: #f0f0f0;
        cursor: pointer;
      }

      &:hover {
        cursor: pointer;
      }

      &.number-block {
        cursor: default;

        &:active {
          background: white;
        }
      }



    }
  }

}
</style>
