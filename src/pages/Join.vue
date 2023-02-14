<template>
    <q-page class="flex flex-center join-page">
        <div class="container">
            <div class="header">
                <q-icon
                    name="arrow_back_ios"
                    style="font-size: 24px; cursor: pointer"
                    @click="$router.go(-1)"
                ></q-icon>
            </div>
            <div class="join-row label">아이디</div>
            <div class="join-row">
                <q-input outlined v-model="email" />
            </div>
            <div class="join-row label">비밀번호</div>
            <div class="join-row">
                <q-input outlined type="password" v-model="password" />
            </div>
            <div class="join-row label">비밀번호 확인</div>
            <div class="join-row">
                <q-input outlined type="password" v-model="password2" />
            </div>
        </div>
        <div class="buttons">
            <q-btn
                outline
                color="black"
                class="q-mb-md footer-button"
                label="회원가입"
                @click="join"
            />
        </div>
    </q-page>
</template>

<script>
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import ComputedMixin from '../ComputedMixin';
import UtilMethodMixin from '../UtilMethodMixin';
export default {
    mixins: [ComputedMixin, UtilMethodMixin],
    mounted() {},
    data() {
        return {
            email: '',
            password: '',
            password2: '',
        };
    },
    methods: {
        join() {
            if (this.password != this.password2) {
                this.errorMessage('패스워드를 확인해주세요.');
                return false;
            }
            const thisObj = this;
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    thisObj.successMessage('회원가입 완료');
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode);
                    if (errorCode == 'auth/email-already-in-use') {
                        signInWithEmailAndPassword(
                            auth,
                            this.email,
                            this.password
                        )
                            .then((userCredential) => {
                                this.successMessage('login');
                            })
                            .catch((error) => {
                                thisObj.errorMessage(
                                    '이미 가입된 유저 입니다.'
                                );
                                // auth/wrong-password
                                console.log(error);
                                const errorCode = error.code;
                                const errorMessage = error.message;
                            });
                    } else if (errorCode == 'auth/invalid-email') {
                        thisObj.errorMessage('이메일의 형식을 확인 해 주세요.');
                    } else if (errorCode == 'auth/weak-password') {
                        thisObj.errorMessage(
                            '비밀번호는 6자리 이상 입력해주세요.'
                        );
                    } else {
                        thisObj.errorMessage('회원가입 실패.');
                    }
                    console.log(errorMessage);
                    // ..
                });
        },
    },
};
</script>

<style lang="scss">
.join-page {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .header {
        padding: 0 0 20px 0;
    }

    .label {
        font-weight: 700;
        font-size: 20px;
    }

    .container {
        padding: 20px;
        width: 100%;
        max-width: 390px;
    }

    .title-text {
        font-size: 24px;
    }

    .buttons {
        padding: 0 20px;
        width: 100%;
        margin-top: auto;
        display: flex;
        flex-direction: column;
    }

    .join-row {
        margin: 5px 0;
        display: flex;
        justify-content: flex-start;
        flex: 1;
        width: 100%;

        .q-input {
            width: 100%;
        }
    }
}
</style>
