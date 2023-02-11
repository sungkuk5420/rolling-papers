<template>
    <q-layout view="lHh Lpr lFf">
        <MainHeader
            :leftDrawerOpen="leftDrawerOpen"
            :centerText="'롤링 페이퍼'"
        ></MainHeader>

        <q-drawer
            v-model="leftDrawer"
            show-if-above
            bordered
            content-class="bg-grey-1"
            class="left-drawer"
        >
            <q-list>
                <q-item-label
                    header
                    class="left-drawer__title"
                    @click="$router.push('/')"
                >
                    롤링페이퍼
                </q-item-label>
                <q-item-label header class="left-drawer__sub-title">
                    롤링페이퍼 만들기
                </q-item-label>
                <q-item-label header class="left-drawer__sub-title">
                    내 롤링페이퍼
                </q-item-label>
                <q-item-label
                    header
                    class="left-drawer__sub-title"
                    v-show="!uid"
                    @click="login"
                >
                    로그인
                </q-item-label>
                <q-item-label
                    header
                    class="left-drawer__sub-title"
                    v-show="uid"
                    @click="logout"
                >
                    로그아웃
                </q-item-label>
            </q-list>
            <q-list class="left-drawer__bottom">
                <q-item-label header class="left-drawer__sub-title">
                    🙋🏻‍♀️ 만든 사람들
                </q-item-label>
                <q-item-label header class="left-drawer__sub-title">
                    💛 후원하기
                </q-item-label>
                <q-item-label header class="left-drawer__sub-title">
                    ✍🏻 서비스 의견 보내기
                </q-item-label>
            </q-list>
        </q-drawer>

        <q-page-container>
            <LoginActionSheet
                :selectTheme="selectTheme"
                :themeGroupList="themeGroupList"
                :loginGuideLayer="loginGuideLayer"
            ></LoginActionSheet>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
// import EssentialLink from "components/EssentialLink.vue";
import MainHeader from 'src/components/MainHeader.vue';
import ComputedMixin from '../ComputedMixin';
import { getAuth, signOut } from 'firebase/auth';
import LoginActionSheet from '../components/LoginActionSheet.vue';
import { T } from '../store/module-example/types';
export default {
    mixins: [ComputedMixin],
    name: 'MainLayout',
    components: {
        MainHeader,
        LoginActionSheet,
    },
    data() {
        return {
            leftDrawer: false,
            loginGuideLayer: false,
            selectTheme: 1,
            themeGroupList: [
                {
                    name: '이직 성공 축하!',
                    img: 'theme-1.png',
                },
                {
                    name: '고마워요',
                    img: 'theme-2.png',
                },
                {
                    name: '힘내요',
                    img: 'theme-3.png',
                },
                {
                    name: '축하해요',
                    img: 'theme-4.png',
                },
            ],
            // essentialLinks: linksData,
        };
    },
    mounted() {
        console.log(this.uid);
    },
    methods: {
        login() {
            this.leftDrawer = false;
            this.$store.dispatch(T.SET_LOGIN_GUIDE_LAYER, true);
        },
        leftDrawerOpen() {
            console.log();
            this.leftDrawer = !this.leftDrawer;
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
.left-drawer {
    .q-drawer__content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    .q-list {
        width: 100%;
    }
    &__sub-title {
        width: 100%;
        &:active {
            background: #ddd;
        }
    }
    &__title {
        margin-top: 15px;
        margin-bottom: 15px;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
    }
    &__sub-title {
        line-height: 20px;
    }
}
</style>