<template>
    <q-page class="flex flex-center login-page">
        <div class="container">
            <div class="header q-mb-md">
                <q-icon name="arrow_back_ios" style="font-size: 24px;cursor: pointer;" @click="$router.go(-1)"></q-icon>
            </div>
            <div class="join-row label">
                아이디
            </div>
            <div class="join-row">
                <q-input outlined v-model="email2" />
            </div>
            <div class="join-row label">
                비밀번호
            </div>
            <div class="join-row">
                <q-input outlined type="password" v-model="password" />
            </div>
        </div>
        <div class="buttons">
            <q-btn outline color="primary" class="q-mb-md footer-button" label="로그인" @click="login" />
            <q-btn outline color="black" class="q-mb-md footer-button" label="회원가입" @click="$router.push('join')" />
        </div>
    </q-page>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
export default {
    mixins: [ComputedMixin, UtilMethodMixin],
    props: ["changeLeftDrawer"],
    mounted() {
    },
    data() {
        return {
            email2: "",
            password: "",
        };
    },
    methods: {
        openDrawer() {
            this.changeLeftDrawer()
        },
        login() {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email2, this.password)
                .then((userCredential) => {
                    this.successMessage("login")
                    const groupUid = localStorage.getItem("groupUid")
                    if (!groupUid) {
                        this.$router.push("/")
                    }
                })
                .catch((error) => {
                    this.errorMessage(error)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    }
};
</script>

<style lang="scss">
.login-page {
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

        .q-btn {
            min-height: 60px;
        }
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
