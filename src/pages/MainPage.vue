<template>
    <q-page class="flex flex-center main-page">
        <div class="container">
            <div class="header">
                <div class="header__left" @click="$router.go(-1)">
                    <img src="~assets/back.png" alt srcset />
                </div>
                <div class="header__center">입장코드 입력</div>
                <div class="header__right"></div>
            </div>
            <div class="title-row">
                <div class="main-image">
                    <img src="~assets/main-image.svg" alt srcset />
                </div>
            </div>
            <div class="content">
                <div class="content__main">ローリングペーパーを</div>
                <div class="content__main">作りましょう。</div>
                <div class="content__sub">
                    友達、同僚、気になる人に匿名で伝えられる率直な想い
                </div>
            </div>
            <div class="button-list">
                <div class="add-group" @click="createGroup">
                    ローリングペーパー作成
                </div>
                <div class="join-group" @click="$router.push('join-group')">
                    参加する
                </div>
                <div class="login-join-buttons">
                    <span v-show="!uid">すでに会員であれば</span>
                    <div @click="shareMobile">공유</div>
                    <div @click="$router.push('/login')" v-show="!uid">
                        ログイン
                    </div>
                    <div @click="logout" v-show="uid">로그아웃</div>
                    <!-- 
          <div @click="logout" v-show="uid">로그아웃</div>
          <div @click="$router.push('/join')" v-show="!uid">회원가입</div>-->
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import ComputedMixin from '../ComputedMixin';
import UtilMethodMixin from '../UtilMethodMixin';
import { T } from '../store/module-example/types';
import { getAuth, signOut } from 'firebase/auth';
export default {
    mixins: [ComputedMixin, UtilMethodMixin],
    data() {
        return {
            localNickname: '',
        };
    },
    mounted() {
        // this.showLoading();
    },
    methods: {
        async shareMobile() {
            const shareData = {
                text: `롤링페이퍼를 작성해줘! \n\n [입장코드] 1234 \n\n https://rolling-papers.netlify.app/join-group?groupUid=0d4be956&`,
            };
            if (navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
            }
        },
        saveNickName() {
            this.$store.dispatch(T.SET_LOGIN_USER_INFO, {
                nickname: this.localNickname,
            });
        },
        createGroup() {
            this.$router.push('/create-group');
        },
        logout() {
            const auth = getAuth();
            signOut(auth)
                .then(() => {
                    // Sign-out successful.
                })
                .catch((error) => {
                    // An error happened.
                });
        },
    },
};
</script>

<style lang="scss">
.main-page {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 20px 20px 20px;

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .title-row {
        display: flex;
        justify-content: center;
        align-items: center;

        .main-image {
            top: 0;
            position: relative;
            height: 100%;
        }
    }

    .button-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: auto;
    }

    .add-group {
        width: 100%;
        height: 44px;
        background: #fae54d;
        border-radius: 8px;
        color: #000000;
        font-weight: 700;
        font-size: 14px;
    }

    .join-group {
        width: 335px;
        height: 44px;
        background: #000000;
        border-radius: 8px;
        font-weight: 700;
        font-size: 14px;
        color: white;
        cursor: pointer;
    }

    .bottom-layer {
        padding: 50px;
        display: flex;
        flex: 1;
        height: 100%;
        flex-direction: column;

        &__button {
            height: 50%;

            &:first-child {
                margin-bottom: 10px;
            }
        }
    }

    .logout-button {
        width: 120px;
    }

    .content {
        &__main {
            font-weight: 700;
            font-size: 24px;
            line-height: 32px;
        }

        &__sub {
            margin-top: 12px;
            line-height: 20px;
        }
    }

    .login-join-buttons {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 12px 5px 0 5px;

        & > div {
            margin-left: 5px;
            font-size: 14px;

            color: #065bf5;
        }
    }
}
</style>