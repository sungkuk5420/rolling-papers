<template>
    <div id="q-app">
        <router-view />
    </div>
</template>
<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { T } from './store/module-example/types';
import { getDatabase, ref, set, get, child } from 'firebase/database';
export default {
    name: 'App',
    mounted() {
        this.$i18n.locale = 'ja';
        this.$i18n.locale = '';

        this.$store.dispatch(T.SET_THEME_GROUP_LIST, [
            {
                name: this.$t('축하해요'),
                content: this.$t('축하의 메세지를 전해보세요'),
                img: 'theme-1.png',
                background: '#F3F3F3',
            },
            {
                name: this.$t('고마워요'),
                content: this.$t('감사의 메세지를 전해보세요'),
                img: 'theme-2.png',
                background: '#F3F3F3',
            },
            {
                name: this.$t('힘내요'),
                content: this.$t('응원의 메세지를 전해보세요'),
                img: 'theme-3.png',
                background: '#F3F3F3',
            },
            {
                name: this.$t('기뻐요'),
                content: this.$t('기쁨의 메세지를 전해보세요'),
                img: 'theme-4.png',
                background: '#F3F3F3',
            },
            {
                name: this.$t('슬퍼요'),
                content: this.$t('슬픔의 메세지를 전해보세요'),
                img: 'theme-5.png',
                background: '#F3F3F3',
            },
            {
                name: this.$t('아쉬워요'),
                content: this.$t('아쉬움의 메세지를 전해보세요'),
                img: 'theme-6.png',
                background: '#F3F3F3',
            },
        ]);
        const thisObj = this;
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            console.log('change!');
            if (user) {
                console.log('login완료!');
                this.$store.dispatch(T.SET_LOGIN_GUIDE_LAYER, false);

                console.log(user);
                const uid = user.uid;

                console.log(`uid is ${uid}`);
                if (!this.uid) {
                    const isGoogleLogin =
                        user?.providerData[0]?.providerId === 'google.com'
                            ? true
                            : false;
                    const isLineLogin =
                        !user.providerData[0] && user.providerId === 'firebase'
                            ? true
                            : false;
                    let loginType = 'email';
                    if (isGoogleLogin) {
                        loginType = 'google';
                    }
                    if (isLineLogin) {
                        loginType = 'line';
                    }
                    thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, {
                        email: user.email,
                        uid: user.uid,
                        loginType,
                    });
                }
                const db = getDatabase();
                const groupUid = localStorage.getItem('groupUid');
                const groupName = localStorage.getItem('groupName');
                const groupCode = localStorage.getItem('groupCode');
                const selectTheme = localStorage.getItem('selectTheme');
                if (groupUid) {
                    localStorage.removeItem('groupUid');
                    localStorage.removeItem('groupName');
                    localStorage.removeItem('groupCode');
                    localStorage.removeItem('selectTheme');
                    set(ref(db, 'groups/' + groupUid), {
                        groupName: groupName,
                        selectTheme: selectTheme,
                        code: groupCode,
                        createUserUid: user.uid,
                        createUserEmail: user.email,
                        createdAt: this.createNowTime(),
                        status: 'created',
                    });
                    setTimeout(() => {
                        thisObj.$q.notify({
                            position: 'top',
                            timeout: 500,
                            message: '그룹생성완료',
                            icon: 'announcement',
                        });
                    }, 0);
                    this.$router.push(
                        `/group-info?groupUid=${groupUid}&groupCode=${groupCode}`
                    );
                }

                if (this.$route.path == '/line-login') {
                    this.$q.loading.hide();
                    this.$router.push(`/`);
                }
            } else {
                thisObj.$q.notify({
                    position: 'top',
                    timeout: 500,
                    message: '로그아웃',
                    icon: 'announcement',
                });

                thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, {
                    nickname: null,
                    email: null,
                    uid: null,
                });
            }
        });
    },
    methods: {
        createNowTime() {
            var today = new Date();
            today.setHours(today.getHours() + 9);
            return today.toISOString().replace('T', ' ').substring(0, 19);
        },
    },
};
</script>

<style lang="scss">
.q-drawer.fixed {
    position: absolute !important;
}

.share-by-qrcode-layer,
.share-layer-on-my-papers,
.share-action-sheet,
.login-guide-layer,
.van-number-keyboard {
    width: 100%;
    max-width: 390px;
    left: 0;
    right: 0;
    margin: auto;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 12px 18px;
}

html {
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: auto;
    bottom: 0;
}

body {
    align-items: flex-end;
    display: flex;
}
html,
body,
#q-app,
.q-layout,
.q-footer {
    width: 100%;
    max-width: 390px;
    height: 100%;
    max-height: 844px;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-top: auto !important;
    left: 0 !important;
    top: inherit !important;
    right: 0 !important;
    bottom: 0 !important;
    align-items: flex-end;
    justify-content: flex-start;
}

#q-app {
    border: 1px solid #ddd;
}

.q-header {
    width: 100%;
    max-width: 390px;
    height: 100%;
    max-height: 844px;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    left: 0 !important;
    top: inherit !important;
    right: 0 !important;
    align-items: flex-end;
    justify-content: flex-start;
    border: 1px solid #ddd;
}

#q-app {
    overflow: auto;
}

.q-page-container,
.q-layout,
.q-page {
    height: 100%;
    min-height: inherit !important;
}

.footer-button {
    font-size: 20px;
    font-weight: bold;
}

.join-group {
    margin-top: 12px;
}

.add-group,
.join-group {
    width: 100%;
    height: 60px;
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    background: #ddd;
    width: 100%;
    font-weight: bold;
    font-size: 20px;

    cursor: pointer;
}

.login-guide-layer {
    &.create-group {
        padding-top: 30px;
    }
    & > * {
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
    .group-card {
        display: flex;
        background: #f2f2f2;
        width: 100%;
        height: 100px;
        justify-content: space-between;
        align-items: center;
        padding: 20px 26px;
        border-radius: 12px;
        margin-top: 20px;
        margin-bottom: 20px;
        &__left {
            &__title {
                font-size: 18px;
                font-weight: 700;
                line-height: 24px;
                margin-bottom: 5px;
            }
            &__sub-title {
                font-size: 12px;
                line-height: 18px;
            }
        }
        &__right {
            img {
                height: 85px;
            }
        }
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
                opacity: 0.8;
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
            height: 44px;
            display: flex;
            font-weight: bold;
            border-radius: 8px;

            .q-btn__wrapper:before {
                box-shadow: none;
            }
        }
    }
}
</style>
