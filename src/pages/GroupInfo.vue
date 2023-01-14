<template>
  <q-page class="flex flex-center group-info-page">

    <div class="container">
      <div class="header q-mb-md">
        <div class="header__left">
          <q-icon name="menu" style="font-size: 24px;cursor: pointer;" @click="$router.go(-1)"></q-icon>
        </div>
        <div class="header__center">
          <q-icon name="celebration" style="font-size: 24px;cursor: pointer;"></q-icon>
          <div class="group-name">{{ groupName }}</div>
        </div>
        <div class="header__right">
          <q-icon name="ios_share" style="font-size: 24px;cursor: pointer;" @click="bottomLayer = true"></q-icon>
        </div>
      </div>
      <div class="row-div code">
        입장 코드 {{ groupCode }}
      </div>
      <div class="row-div q-mt-xl empty" v-show="messageList.length == 0">
        글 없음
      </div>
      <div class="add-group" @click="writeMessage">
        롤링페이퍼 작성
      </div>
      <van-action-sheet :round="false" v-model="bottomLayer" class="share-action-sheet">
        <q-btn outline color="primary" class="q-mb-md footer-button" label="SNS" />
        <q-btn outline color="black" class="q-mb-md footer-button" label="URL LINK" />
      </van-action-sheet>
    </div>

  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { T } from "../store/module-example/types"
import { getDatabase, ref, set, child, get } from "firebase/database";
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
      groupName: "",
      groupCode: "",
      messageList: [],
      bottomLayer: false,
      actions: [
        { name: '생성하기' },
        { name: '참여하기' },
      ],
    };
  },
  mounted () {
    // this.showLoading();
    const groupCode = this.$route.query["groupCode"];
    const groupUid = this.$route.query["groupUid"];
    if (!groupCode) {
      this.$router.push(`/join-group?groupUid=${groupUid}`)
      return false;
    }
    this.getGroupInfo();
  },
  methods: {
    onSelectBottomLayer (value) {
      console.log(value.name)
      if (value.name == "생성하기") {
        this.$router.push("/create-group")
      }
    },
    getGroupInfo () {
      const groupUid = this.$route.query["groupUid"];
      console.log(groupUid)
      const dbRef = ref(getDatabase());
      get(child(dbRef, `groups/${groupUid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          this.groupName = data.groupName
          this.groupCode = data.code
          // console.log("그룹코드가 존재합니다")
        } else {
          // console.log("그룹코드가 없습니다!")
        }
      }).catch((error) => {
        console.error(error);
      });
    },
    writeMessage () {

    }
  }
};
</script>

<style lang="scss">
.group-info-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;

  .share-action-sheet {
    padding: 20px;

    .van-action-sheet__content {
      display: flex;
      flex-direction: column;
      width: 100%;

      .footer-button:last-child {
        margin-bottom: 0;
      }
    }
  }


  .container {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: none;
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

  .code {
    font-size: 22px;
    opacity: 0.3;
    display: flex;
    justify-content: center;
  }

  .empty {
    font-size: 20px;
    opacity: 0.3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 9px;

  }

}
</style>
