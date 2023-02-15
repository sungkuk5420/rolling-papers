<template>
    <van-action-sheet
        :round="false"
        v-model="loginGuideLayer"
        class="login-guide-layer"
    >
        <div class="login-guide-layer__title" v-show="isCreateGroup">
            {{ $t('롤링페이퍼를 만드려면') }}
        </div>
        <div class="login-guide-layer__title" v-show="isCreateGroup">
            {{ $t('로그인이 필요해') }}
        </div>
        <div class="login-guide-layer__title" v-show="!isCreateGroup">
            {{ $t('로그인') }}
        </div>
        <div
            class="login-guide-layer__image"
            v-show="selectTheme == index + 1"
            v-for="(item, index) in themeGroupList"
            :key="index"
        >
            <img :src="getImgUrl(item.img)" alt="" srcset="" />
        </div>
        <!-- <q-btn
            style="background: #000; color: white; width: 100%"
            class="login-guide-layer__login-button"
        >
            <span>애플로 시작하기</span>
        </q-btn> -->
        <a
            class="login-guide-layer__login-button line"
            href="https://access.line.me/dialog/oauth/weblogin?response_type=code&client_id=1657857854&redirect_uri=https://rolling-papers.netlify.app/line-login&state=asmdkf"
        >
            <img src="~assets/line-icon.png" alt="" srcset="" />
            {{ $t('라인으로 시작하기') }}
        </a>
        <!-- <a class="login-guide-layer__login-button line"
                href="https://access.line.me/dialog/oauth/weblogin?response_type=code&client_id=1657857854&redirect_uri=http://localhost:8080/line-login&state=asmdkf">
                <img src="~assets/line-icon.png"  alt="" srcset="">로컬 라인</a> -->

        <q-btn
            style="background: #f5f5f5; color: #666666; width: 100%"
            class="login-guide-layer__login-button google"
            @click="googleLogin"
        >
            <img src="~assets/google-icon.png" alt="" srcset="" />
            <span>
                {{ $t('구글로 시작하기') }}
            </span>
        </q-btn>
        <q-btn
            style="
                background: white;
                color: #000;
                border: 1px solid #d2d2d2;
                width: 100%;
            "
            class="login-guide-layer__login-button"
            :label="$t('이메일로 시작하기')"
            @click="$router.push('/login')"
        />
    </van-action-sheet>
</template>

<script>
import UtilMethodMixin from '../UtilMethodMixin';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { T } from '../store/module-example/types';
export default {
    name: 'LoginActionSheet',
    props: ['selectTheme', 'themeGroupList', 'isCreateGroup'],
    mixins: [UtilMethodMixin],
    data() {
        return {};
    },
    computed: {
        loginGuideLayer: {
            get() {
                return this.$store.getters.getLoginGuideLayer;
            },
            set(value) {
                return this.$store.dispatch(T.SET_LOGIN_GUIDE_LAYER, value);
            },
        },
    },
    methods: {
        googleLogin() {
            const auth = getAuth();
            auth.languageCode = 'ja';

            const provider = new GoogleAuthProvider();
            console.log(provider);
            provider.addScope(
                'https://www.googleapis.com/auth/contacts.readonly'
            );

            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential =
                        GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // ...
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential =
                        GoogleAuthProvider.credentialFromError(error);
                    // ...
                });
        },
    },
};
</script>
