<template>
  <q-page class="flex flex-center join-group-page">
    <div class="container">
      <div class="header q-mb-md">
        <div class="header__left">
          <q-icon name="menu" style="font-size: 24px;cursor: pointer;" @click="$router.go(-1)"></q-icon>
        </div>
        <div class="header__center">
        </div>
        <div class="header__right">
        </div>
      </div>
      <div class="group-info">
        <div class="group-info__image">
          <img src="~assets/image-1.png" style="width:103px;height:103px" />
        </div>
        <div class="group-info__group-name">
          {{ groupName?(groupName== 'code-error') ? '초대 코드를 확인해 주세요.' : groupName: '초대 코드를 입력해 주세요.'
          }}
          <div class="flex justify-center q-mt-md" v-show="groupName && groupName != 'code-error'">
            <q-btn outline color="primary" label="입장하기" @click="joinGroup"></q-btn>
          </div>
        </div>
      </div>
      <div class="label">
        초대 코드
      </div>
      <div class="code-group">
        <q-input readonly outlined :value="groupCode[0]" />
        <q-input readonly outlined :value="groupCode[1]" />
        <q-input readonly outlined :value="groupCode[2]" />
        <q-input readonly outlined :value="groupCode[3]" />
      </div>
      <van-number-keyboard v-model="groupCode" :show="show" :maxlength="4" />
    </div>

  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { getDatabase, ref, set, child, get } from "firebase/database";
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  mounted () {
    // this.showLoading();
  },
  data () {
    return {
      show: true,
      code1: '',
      code2: '',
      code3: '',
      code4: '',
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
    groupCode (value) {
      console.log(value);
      this.code1 = value[0]
      this.code2 = value[1]
      this.code3 = value[2]
      this.code4 = value[3]
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
            this.groupName = "code-error"
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
    joinGroup () {
      this.$router.push(`/group-info?groupUid=${this.groupUid}&groupCode=${this.groupCode}`)
    }
  }
};
</script>

<style lang="scss">
.join-group-page {
  .container {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: none;
    padding-bottom: 237px;
  }

  .header {
    padding: 0 0 20px 0;
    display: flex;
    justify-content: space-between;

    &__left {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__center {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      .group-name {
        margin-left: 5px;
        font-size: 20px;
        font-weight: bold;
      }
    }

    &__right {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .group-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    &__image {
      justify-content: center;
    }

    &__group-name {
      font-size: 20px;
      font-weight: bold;
      margin-top: 15px;
    }
  }

  .label {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
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
}
</style>
