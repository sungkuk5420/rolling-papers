<template>
  <q-page class="flex flex-center group-info-page">

    <div class="container">
      <div class="header q-mb-md">
        <div class="header__left">
          <q-icon name="menu" style="font-size: 24px;cursor: pointer;"></q-icon>
        </div>
        <div class="header__center">
          <q-icon name="celebration" style="font-size: 24px;cursor: pointer;"></q-icon>
          {{ groupName }}
        </div>
        <div class="header__right">
          <q-icon name="ios_share" style="font-size: 24px;cursor: pointer;"></q-icon>
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
      messageList: []
    };
  },
  mounted () {
    // this.showLoading();
    this.getGroupInfo();
  },
  methods: {
    getGroupInfo () {
      const groupUid = this.$route.query.code;
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
  height: 100vh;


  .container {
    width: 100%;
    height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: none;
  }


  .header {
    padding: 0 0 20px 0;
    display: flex;
    justify-content: space-between;

    &__left {}

    &__center {}

    &__right {}
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
    ;
  }

}
</style>
