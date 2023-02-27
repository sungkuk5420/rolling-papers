<template>
    <q-page
        class="flex flex-center join-group-page"
        :class="joinFlag ? 'loading' : ''"
    >
        <div class="header">
            <div class="header__left" @click="$router.go(-1)">
                <img src="~assets/back.png" alt="" srcset="" />
            </div>
            <div class="header__center">입장코드 입력</div>
            <div class="header__right"></div>
        </div>
        <div class="container">
            <div class="group-info">
                <div class="group-info__title" v-show="joinFlag">
                    {{ groupName }}
                </div>
                <div class="group-info__title" v-show="joinFlag">
                    롤링페이퍼로 들어가고 있어.
                </div>
                <div
                    class="group-info__sub-title"
                    v-show="joinFlag"
                    style="color: #333333; margin-top: 12px"
                >
                    조금만 기다려줘~~
                </div>
                <div class="gage-wrapper" v-if="joinFlag">
                    <span class="gage1"></span>
                    <span class="gage2"></span>
                </div>
                <div v-show="joinFlag" class="image-wrapper">
                    <img src="~assets/theme-1.png" alt="" srcset="" />
                </div>

                <div class="group-info__title" v-show="!groupName">
                    어떤 롤링페이퍼에 접속할거야?
                </div>
                <div class="group-info__title" v-show="groupName && !joinFlag">
                    {{ groupName }}
                </div>
                <div class="group-info__title" v-show="groupName && !joinFlag">
                    롤링페이퍼의 입장코드를 입력해줘.
                </div>
                <div class="group-info__sub-title" v-show="!joinFlag">
                    인증코드를 모르면 담당자에게 물어봐
                </div>
            </div>
            <div
                v-show="!joinFlag"
                :class="timer ? 'code-group timer-on' : 'code-group'"
            >
                <svg
                    :class="
                        groupCode && groupCode.length >= 1 && groupCode[0]
                            ? 'group-code is-active'
                            : 'group-code'
                    "
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.06 17.04C13.74 17.04 17.58 13.24 17.58 8.52C17.58 3.84 13.74 -1.90735e-06 9.06 -1.90735e-06C4.38 -1.90735e-06 0.54 3.76 0.54 8.52C0.54 13.28 4.38 17.04 9.06 17.04Z"
                        fill="#F5F5F5"
                    />
                    <path
                        d="M9.06 18.04C14.2892 18.04 18.58 13.7953 18.58 8.52H16.58C16.58 12.6847 13.1908 16.04 9.06 16.04V18.04ZM18.58 8.52C18.58 3.28771 14.2923 -1 9.06 -1V0.999998C13.1877 0.999998 16.58 4.39228 16.58 8.52H18.58ZM9.06 -1C3.83385 -1 -0.46 3.2016 -0.46 8.52H1.54C1.54 4.3184 4.92615 0.999998 9.06 0.999998V-1ZM-0.46 8.52C-0.46 13.8384 3.83385 18.04 9.06 18.04V16.04C4.92615 16.04 1.54 12.7216 1.54 8.52H-0.46Z"
                        fill="#E6E6E6"
                    />
                </svg>
                <svg
                    :class="
                        groupCode && groupCode.length >= 2 && groupCode[1]
                            ? 'group-code is-active'
                            : 'group-code'
                    "
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.06 17.04C13.74 17.04 17.58 13.24 17.58 8.52C17.58 3.84 13.74 -1.90735e-06 9.06 -1.90735e-06C4.38 -1.90735e-06 0.54 3.76 0.54 8.52C0.54 13.28 4.38 17.04 9.06 17.04Z"
                        fill="#F5F5F5"
                    />
                    <path
                        d="M9.06 18.04C14.2892 18.04 18.58 13.7953 18.58 8.52H16.58C16.58 12.6847 13.1908 16.04 9.06 16.04V18.04ZM18.58 8.52C18.58 3.28771 14.2923 -1 9.06 -1V0.999998C13.1877 0.999998 16.58 4.39228 16.58 8.52H18.58ZM9.06 -1C3.83385 -1 -0.46 3.2016 -0.46 8.52H1.54C1.54 4.3184 4.92615 0.999998 9.06 0.999998V-1ZM-0.46 8.52C-0.46 13.8384 3.83385 18.04 9.06 18.04V16.04C4.92615 16.04 1.54 12.7216 1.54 8.52H-0.46Z"
                        fill="#E6E6E6"
                    />
                </svg>
                <svg
                    :class="
                        groupCode && groupCode.length >= 3 && groupCode[2]
                            ? 'group-code is-active'
                            : 'group-code'
                    "
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.06 17.04C13.74 17.04 17.58 13.24 17.58 8.52C17.58 3.84 13.74 -1.90735e-06 9.06 -1.90735e-06C4.38 -1.90735e-06 0.54 3.76 0.54 8.52C0.54 13.28 4.38 17.04 9.06 17.04Z"
                        fill="#F5F5F5"
                    />
                    <path
                        d="M9.06 18.04C14.2892 18.04 18.58 13.7953 18.58 8.52H16.58C16.58 12.6847 13.1908 16.04 9.06 16.04V18.04ZM18.58 8.52C18.58 3.28771 14.2923 -1 9.06 -1V0.999998C13.1877 0.999998 16.58 4.39228 16.58 8.52H18.58ZM9.06 -1C3.83385 -1 -0.46 3.2016 -0.46 8.52H1.54C1.54 4.3184 4.92615 0.999998 9.06 0.999998V-1ZM-0.46 8.52C-0.46 13.8384 3.83385 18.04 9.06 18.04V16.04C4.92615 16.04 1.54 12.7216 1.54 8.52H-0.46Z"
                        fill="#E6E6E6"
                    />
                </svg>
                <svg
                    :class="
                        groupCode && groupCode.length >= 4 && groupCode[3]
                            ? 'group-code is-active'
                            : 'group-code'
                    "
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.06 17.04C13.74 17.04 17.58 13.24 17.58 8.52C17.58 3.84 13.74 -1.90735e-06 9.06 -1.90735e-06C4.38 -1.90735e-06 0.54 3.76 0.54 8.52C0.54 13.28 4.38 17.04 9.06 17.04Z"
                        fill="#F5F5F5"
                    />
                    <path
                        d="M9.06 18.04C14.2892 18.04 18.58 13.7953 18.58 8.52H16.58C16.58 12.6847 13.1908 16.04 9.06 16.04V18.04ZM18.58 8.52C18.58 3.28771 14.2923 -1 9.06 -1V0.999998C13.1877 0.999998 16.58 4.39228 16.58 8.52H18.58ZM9.06 -1C3.83385 -1 -0.46 3.2016 -0.46 8.52H1.54C1.54 4.3184 4.92615 0.999998 9.06 0.999998V-1ZM-0.46 8.52C-0.46 13.8384 3.83385 18.04 9.06 18.04V16.04C4.92615 16.04 1.54 12.7216 1.54 8.52H-0.46Z"
                        fill="#E6E6E6"
                    />
                </svg>
            </div>
            <div class="key-pad" v-show="!joinFlag">
                <div
                    class="key-pad__number number-1"
                    @click="
                        () => {
                            clickKeyPad('1');
                        }
                    "
                >
                    <img src="~assets/1.png" alt="" srcset="" />
                </div>
                <div
                    class="key-pad__number number-2"
                    @click="
                        () => {
                            clickKeyPad('2');
                        }
                    "
                >
                    <img src="~assets/2.png" alt="" srcset="" />
                </div>
                <div
                    class="key-pad__number number-3"
                    @click="
                        () => {
                            clickKeyPad('3');
                        }
                    "
                >
                    <img src="~assets/3.png" alt="" srcset="" />
                </div>
                <div
                    class="key-pad__number number-4"
                    @click="
                        () => {
                            clickKeyPad('4');
                        }
                    "
                >
                    <img src="~assets/4.png" alt="" srcset="" />
                </div>
                <div
                    class="key-pad__number number-5"
                    @click="
                        () => {
                            clickKeyPad('5');
                        }
                    "
                >
                    <img src="~assets/5.png" alt="" srcset="" />
                </div>
                <div
                    class="key-pad__number number-6"
                    @click="
                        () => {
                            clickKeyPad('6');
                        }
                    "
                >
                    <img src="~assets/6.png" alt="" srcset="" />
                </div>
                <div
                    class="key-pad__number number-7"
                    @click="
                        () => {
                            clickKeyPad('7');
                        }
                    "
                >
                    <img src="~assets/7.png" alt="" srcset="" />
                </div>
                <div
                    class="key-pad__number number-8"
                    @click="
                        () => {
                            clickKeyPad('8');
                        }
                    "
                >
                    <img src="~assets/8.png" alt="" srcset="" />
                </div>
                <div
                    class="key-pad__number number-9"
                    @click="
                        () => {
                            clickKeyPad('9');
                        }
                    "
                >
                    <img src="~assets/9.png" alt="" srcset="" />
                </div>
                <div class="key-pad__number number-block"></div>
                <div
                    class="key-pad__number number-0"
                    @click="
                        () => {
                            clickKeyPad('0');
                        }
                    "
                >
                    <img src="~assets/0.png" alt="" srcset="" />
                </div>
                <div
                    class="key-pad__number number-back"
                    @click="
                        () => {
                            clickKeyPad('back');
                        }
                    "
                >
                    <img src="~assets/back.png" alt="" srcset="" />
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import ComputedMixin from '../ComputedMixin';
import UtilMethodMixin from '../UtilMethodMixin';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import { Notify } from 'vant';
export default {
    mixins: [ComputedMixin, UtilMethodMixin],
    mounted() {
        // this.showLoading();
    },
    data() {
        return {
            show: true,
            groupCode: '',
            groupName: '',
            groupUid: '',
            joinFlag: false,
            timer: 0,
            failCount: 0,
        };
    },
    beforeMount() {
        this.groupUid = this.$route.query['groupUid'];
        this.groupCode = this.$route.query['groupCode'];
        if (this.groupUid) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `groups/${this.groupUid}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val());
                        const data = snapshot.val();
                        this.groupName = data.groupName;
                    } else {
                        // console.log("그룹코드가 없습니다!")
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    },
    watch: {
        joinFlag(value) {
            setTimeout(() => {
                this.$router.push(
                    `/group-info?groupUid=${this.groupUid}&groupCode=${this.groupCode}`
                );
            }, 2100);
        },
        groupCode(value) {
            console.log(value);
            if (value?.toString().length == 4) {
                const dbRef = ref(getDatabase());
                get(child(dbRef, `groupCodes/${value}`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            console.log(snapshot.val());
                            const data = snapshot.val();
                            this.groupUid = data.groupUid;

                            get(child(dbRef, `groups/${this.groupUid}`))
                                .then((snapshot) => {
                                    if (snapshot.exists()) {
                                        console.log(snapshot.val());
                                        const data = snapshot.val();
                                        this.groupName = data.groupName;
                                        this.groupCode = value;
                                        this.joinFlag = true;
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        } else {
                            // this.groupName = "code-error"
                            if (this.failCount < 4) {
                                Notify({
                                    message:
                                        '인증코드를 확인하신 후 다시 입력해주세요.',
                                    color: '#fff',
                                    background: '#EF5350',
                                });
                                this.failCount = this.failCount + 1;
                                this.groupCode = '';
                            } else {
                                this.timer = 30000;
                                Notify({
                                    message:
                                        '입장 코드를 다시 확인해주세요.(30초 후 입력 가능)',
                                    color: '#fff',
                                    background: '#EF5350',
                                    duration: 30000,
                                });
                                setTimeout(() => {
                                    this.timer = 0;
                                    this.groupCode = '';
                                    this.failCount = 0;
                                }, this.timer);
                            }
                            // console.log("그룹코드가 없습니다!")
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },
    },
    methods: {
        clickKeyPad(number) {
            if (number == 'back' && this.timer == 0) {
                this.groupCode = this.groupCode
                    .toString()
                    .slice(0, this.groupCode.toString().length - 1);
                return false;
            }

            if (this.groupCode.toString().length == 4) {
                return false;
            }
            this.groupCode = this.groupCode.toString() + number;
        },
        joinGroup() {
            this.$router.push(
                `/group-info?groupUid=${this.groupUid}&groupCode=${this.groupCode}`
            );
        },
    },
};
</script>

<style lang="scss">
.join-group-page {
    &.loading {
        background: #fae54d;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 57px;
        width: 100%;

        &__left {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            :hover {
                transform: scale(1.2);
            }

            img {
                padding: 20.5px;
                width: 57px;
                height: 57px;
            }
        }

        &__center {
            font-weight: Bold;
            font-size: 16px;
            line-height: 24px;
        }

        &__right {
            width: 57px;
            height: 57px;
        }
    }

    .container {
        width: 100%;
        height: calc(100% - 57px);
        padding: 24px 20px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        flex: none;
    }

    .group-info {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: flex-start;
        justify-content: flex-start;

        &__title {
            font-weight: 700;
            font-size: 23px;
            line-height: 32px;
        }

        &__sub-title {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            margin-top: 12px;
            color: #666666;
        }
    }

    .gage-wrapper {
        position: relative;
        width: 100%;
        height: 30vh;
        display: flex;
        align-items: center;
    }

    .gage1 {
        position: absolute;
        width: 100%;
        height: 13px;
        background: #b6c5d5;
    }

    .gage2 {
        position: absolute;
        width: 100%;
        height: 13px;
        background: #ef5350;
        animation: widthFull 2s ease-in-out;
    }

    @-webkit-keyframes widthFull {
        from {
            width: 0px;
        }

        to {
            width: 100%;
        }
    }

    @keyframes widthFull {
        from {
            width: 0px;
        }

        to {
            width: 100%;
        }
    }

    .image-wrapper {
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: auto;

        img {
            width: 100%;
            max-width: 160px;
            height: auto;
        }
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

    .code-group {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        height: 80px;

        .group-code {
            &.is-active {
                path {
                    fill: #fae54d;
                }
            }
        }
        &.timer-on {
            .group-code {
                &.is-active {
                    path {
                        fill: #ef5350;
                    }
                }
            }
        }
    }

    .key-pad {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 274px;

        &__number {
            display: flex;
            flex: 1;
            min-width: 33.3%;
            width: 100%;
            width: 100%;
            justify-content: center;
            align-items: center;

            img {
                -webkit-user-drag: none;
                -khtml-user-drag: none;
                -moz-user-drag: none;
                -o-user-drag: none;
                user-drag: none;
            }

            &:active {
                background: #f0f0f0;
                cursor: pointer;
            }

            &:hover {
                cursor: pointer;
            }

            &.number-block {
                cursor: default;

                &:active {
                    background: white;
                }
            }
        }
    }
}
</style>
