<template>
    <q-page class="flex flex-center main-page">
        <div class="container">
            <div class="main-image"></div>
            <div class="content">
                <div class="content__main">
                    {{ $t('롤링페이퍼를') }}
                </div>
                <div class="content__main">{{ $t('작성해보자!') }}</div>
                <div class="content__sub">
                    {{ $t('친구,이성,동료가 생각하는 익명의 솔직한 이야기') }}
                </div>
            </div>
            <div class="button-list">
                <q-btn class="add-group" @click="createGroup">
                    {{ $t('롤링페이퍼 만들기') }}
                </q-btn>
                <q-btn class="join-group" @click="$router.push('join-group')">
                    {{ $t('참여하기') }}
                </q-btn>
                <div class="login-join-buttons">
                    <span v-show="!uid">{{
                        $t('이미 계정이 있으신가요?')
                    }}</span>
                    <div @click="login" v-show="!uid" style="cursor: pointer">
                        {{ $t('로그인') }}
                    </div>
                </div>
            </div>
        </div>
        <LoginActionSheet
            :selectTheme="selectTheme"
            :themeGroupList="themeGroupList"
        ></LoginActionSheet>
    </q-page>
</template>

<script>
import ComputedMixin from '../ComputedMixin';
import UtilMethodMixin from '../UtilMethodMixin';
import { T } from '../store/module-example/types';
import { getAuth, signOut } from 'firebase/auth';
import LoginActionSheet from '../components/LoginActionSheet.vue';
export default {
    mixins: [ComputedMixin, UtilMethodMixin],
    components: {
        LoginActionSheet,
    },
    data() {
        return {
            localNickname: '',
            selectTheme: 1,
        };
    },
    mounted() {
        // this.showLoading();

        this.$store.dispatch(T.CHANGE_HEADER_TITLE, this.$t('롤링 페이퍼'));
    },
    methods: {
        login() {
            this.$store.dispatch(T.SET_LOGIN_GUIDE_LAYER, true);
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
    .main-image {
        top: 0;
        position: relative;
        background-image: url('../assets/main-image.svg');
        height: 100%;
        background-size: cover;
        background-position: center top;
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
        width: 100%;
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
            margin-bottom: 30px;
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