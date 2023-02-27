<template>
    <q-page class="flex flex-center create-group-page">
        <div class="group-name">
            <div class="container">
                <div class="header">
                    <div class="header__left" @click="backPage">
                        <img src="~assets/back.png" alt="" srcset="" />
                    </div>
                    <div class="header__center">
                        {{ $t('롤링페이퍼 만들기') }}
                    </div>
                    <div class="header__right"></div>
                </div>
                <q-carousel
                    v-model="slide"
                    transition-prev="slide-right"
                    transition-next="slide-left"
                    animated
                    control-color="primary"
                    class="rounded-borders"
                >
                    <q-carousel-slide
                        name="create1"
                        class="column no-wrap create1"
                    >
                        <div class="row-div create2__title">
                            {{
                                $t(
                                    '만들려는 롤링페이퍼에 어울리는 테마를 선택해주세요'
                                )
                            }}
                        </div>
                        <div class="row-div create2__sub-title">
                            {{
                                $t(
                                    '롤링페이퍼와 가장 잘 어울리는 감정을 선택하면 좋아요!'
                                )
                            }}
                        </div>
                        <div class="theme-list">
                            <div
                                class="theme"
                                :class="
                                    selectTheme == index + 1 ? 'is-active' : ''
                                "
                                :style="`background:${themeGroupList[index].background};`"
                                v-for="(item, index) in themeGroupList"
                                :key="index"
                                @click="
                                    () => {
                                        selectThemeFunc(index);
                                    }
                                "
                            >
                                <div class="theme__wrapper">
                                    <!-- <img src="" alt="" srcset=""> -->

                                    <div class="theme__title-wrapper">
                                        <div class="theme__title">
                                            {{ item.name }}
                                        </div>
                                        <div class="theme__content">
                                            {{ item.content }}
                                        </div>
                                    </div>
                                    <div class="theme__image">
                                        <img
                                            :src="getImgUrl(item.img)"
                                            alt=""
                                            srcset=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </q-carousel-slide>
                    <q-carousel-slide
                        name="create2"
                        class="column no-wrap create2"
                    >
                        <div class="row-div create2__title">
                            {{ $t('롤링페이퍼를 어떻게 불러드리면 될까요?') }}
                        </div>
                        <div class="row-div create2__sub-title">
                            {{ $t('모두가') }}
                            {{
                                $t(
                                    '메세지를 쓸 수 있도록 제목으로 롤링페이퍼의 주인공과 목적을 알려주세요'
                                )
                            }}
                        </div>
                        <div class="row-div group-name-wrapper">
                            <q-input
                                ref="groupName"
                                class="group-name-input"
                                :rules="[(val) => val.length <= 20]"
                                outlined
                                v-model="groupName"
                                :placeholder="
                                    selectTheme != 0
                                        ? changeThemePlaceholder(
                                              $t(
                                                  themeGroupList[
                                                      selectTheme - 1
                                                  ].name
                                              )
                                          )
                                        : ''
                                "
                            >
                            </q-input>
                            <span class="input-length"
                                >{{ groupName.toString().length }}/20</span
                            >
                        </div>
                        <q-btn
                            class="add-group"
                            @click="createGroup"
                            :disabled="selectTheme == 0"
                        >
                            {{ $t('생성하기') }}
                        </q-btn>
                    </q-carousel-slide>
                </q-carousel>
            </div>

            <LoginActionSheet
                :selectTheme="selectTheme"
                :themeGroupList="themeGroupList"
                :isCreateGroup="true"
            ></LoginActionSheet>
            <van-action-sheet
                :round="false"
                v-model="createLayer"
                class="login-guide-layer create-group"
            >
                <!-- <div class="login-guide-layer__title">
                    {{ groupName }}
                </div> -->
                <div class="login-guide-layer__title">
                    {{ $t('이제 롤링페이퍼 룸을 만들어볼까요?') }}
                </div>
                <div class="group-card">
                    <div class="group-card__left">
                        <div class="group-card__left__title">
                            {{
                                selectTheme != 0
                                    ? $t(themeGroupList[selectTheme - 1].name)
                                    : ''
                            }}
                        </div>
                        <div class="group-card__left__sub-title">
                            {{ groupName }}
                        </div>
                    </div>
                    <div class="group-card__right">
                        <div
                            class="login-guide-layer__image"
                            v-show="selectTheme == index + 1"
                            v-for="(item, index) in themeGroupList"
                            :key="index"
                        >
                            <img :src="getImgUrl(item.img)" alt="" srcset="" />
                        </div>
                    </div>
                </div>
                <div class="login-guide-layer__buttons">
                    <q-btn
                        style="background: #f5f5f5; color: #999999"
                        class="login-guide-layer__cancel"
                        :label="$t('취소')"
                        @click="createLayer = false"
                    />
                    <q-btn
                        style="background: #fae54d"
                        class="login-guide-layer__confirm"
                        :label="$t('만들기')"
                        @click="createGroupConfirm"
                    />
                </div>
            </van-action-sheet>
        </div>
    </q-page>
</template>

<script>
import ComputedMixin from '../ComputedMixin';
import UtilMethodMixin from '../UtilMethodMixin';
import { T } from '../store/module-example/types';
import { uid } from 'quasar';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import LoginActionSheet from '../components/LoginActionSheet.vue';

export default {
    components: { LoginActionSheet },
    mixins: [ComputedMixin, UtilMethodMixin],
    data() {
        return {
            slide: 'create1',
            groupName: '',
            groupUid: '',
            groupCode: '',
            selectTheme: 0,
            createLayer: false,
            actions: [{ name: '생성하기' }, { name: '참여하기' }],
        };
    },
    watch: {
        groupName(value) {
            this.groupName = value.slice(0, 20);
        },
    },
    mounted() {
        // this.showLoading();
    },
    methods: {
        changeThemeTitle(value) {
            let returnValue = '';

            console.log(value);
            switch (value) {
                case '축하해요':
                    returnValue = '축하';
                    break;
                case '고마워요':
                    returnValue = '감사';
                    break;
                case '힘내요':
                    returnValue = '응원';
                    break;
                case '기뻐요':
                    returnValue = '기쁨';
                    break;
                case '슬퍼요':
                    returnValue = '슬픔';
                    break;
                case '아쉬워요':
                    returnValue = '아쉬움';
                    break;
                case 'おめでとう':
                    returnValue = 'お祝い';
                    break;
                case 'ありがとう':
                    returnValue = '感謝';
                    break;
                case 'がんばれ':
                    returnValue = '応援';
                    break;
                case 'うれしい':
                    returnValue = '喜び';
                    break;
                case '悲しい':
                    returnValue = '悲しみ';
                    break;
                case '残念':
                    returnValue = '名残';
                    break;

                default:
                    break;
            }
            return returnValue;
        },
        changeThemePlaceholder(value) {
            let returnValue = '';

            console.log(value);
            switch (value) {
                case '축하해요':
                    returnValue = '리사의 새로운 출발을 축하해!';
                    break;
                case '고마워요':
                    returnValue = '리사, 지난 3년간 감사했어요';
                    break;
                case '힘내요':
                    returnValue = '리사, 앞으로의 인생을 응원해요';
                    break;
                case '기뻐요':
                    returnValue = '리사가 바라는 대로 되어서 기뻐요!';
                    break;
                case '슬퍼요':
                    returnValue = '리사가 떠나서 너무 슬퍼요';
                    break;
                case '아쉬워요':
                    returnValue = '리사와 더 이상 함께할 수 없어서 아쉬워요';
                    break;
                case 'おめでとう':
                    returnValue = 'リサ、お誕生日おめでとう！';
                    break;
                case 'ありがとう':
                    returnValue = 'リサ、3年間ありがとう！';
                    break;
                case 'がんばれ':
                    returnValue = 'リサの夢を応援します！';
                    break;
                case 'うれしい':
                    returnValue = 'リサが来てくれてうれしい！';
                    break;
                case '悲しい':
                    returnValue = 'リサへのお別れメッセージ';
                    break;
                case '残念':
                    returnValue = 'リサ、落選残念だったね。';
                    break;

                default:
                    break;
            }
            return returnValue;
        },
        backPage() {
            if (this.slide == 'create2') {
                this.slide = 'create1';
            } else {
                this.$router.go(-1);
            }
        },
        selectThemeFunc(index) {
            this.selectTheme = index + 1;
            this.createStep2();
        },
        createStep2() {
            if (this.selectTheme == 0) {
                this.errorMessage('테마를 선택해주세요.');
                return false;
            }
            this.slide = 'create2';
            setTimeout(() => {
                this.$refs.groupName.focus();
            }, 100);
        },
        async createGroup() {
            if (!this.groupName) {
                this.errorMessage('그룹이름을 입력하세요.');
                return false;
            }
            await this.createGroupUid().then((result) => {
                this.groupUid = result;
            });
            await this.createGroupCode().then((result) => {
                this.groupCode = result;
            });
            if (this.uid) {
                this.createLayer = true;
            } else {
                localStorage.setItem('groupUid', this.groupUid);
                localStorage.setItem('groupName', this.groupName);
                localStorage.setItem('groupCode', this.groupCode);
                localStorage.setItem('selectTheme', this.selectTheme);
                this.$store.dispatch(T.SET_LOGIN_GUIDE_LAYER, true);
                // this.$router.push("/login")
            }
        },
        createGroupConfirm() {
            const db = getDatabase();
            set(ref(db, 'groups/' + this.groupUid), {
                selectTheme: this.selectTheme,
                groupName: this.groupName,
                code: this.groupCode,
                createUserUid: this.uid,
                createUserEmail: this.email,
                createdAt: this.createNowTime(),
                status: 'created',
            });
            set(ref(db, 'groupCodes/' + this.groupCode), {
                groupUid: this.groupUid,
            });
            this.$router.push(
                `/group-info?groupUid=${this.groupUid}&groupCode=${this.groupCode}`
            );
        },
        checkGroupCodeIsUnique({ groupCode }) {
            return new Promise((resolve, reject) => {
                const db = getDatabase();
                console.log(groupCode);
                const dbRef = ref(getDatabase());
                get(child(dbRef, `groupCodes/${groupCode}`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            console.log('그룹코드가 존재합니다');
                            reject();
                        } else {
                            console.log('그룹코드가 없습니다!');
                            resolve();
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        },
        checkGroupUidIsUnique({ groupUid }) {
            return new Promise((resolve, reject) => {
                const db = getDatabase();
                console.log(groupUid);
                const dbRef = ref(getDatabase());
                get(child(dbRef, `groups/${groupUid}`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            // console.log("그룹코드가 존재합니다")
                            reject();
                        } else {
                            // console.log("그룹코드가 없습니다!")
                            resolve();
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });
        },
        async createGroupCode() {
            return new Promise((resolve, reject) => {
                setTimeout(async () => {
                    let fixGroupCode = '';
                    while (fixGroupCode == '') {
                        console.log('while');
                        function getRandomIntInclusive(min, max) {
                            min = Math.ceil(min);
                            max = Math.floor(max);
                            return Math.floor(
                                Math.random() * (max - min + 1) + min
                            ); // The maximum is inclusive and the minimum is inclusive
                        }
                        let groupCode = getRandomIntInclusive(1, 9999);
                        // let groupCode = uid().slice(0, 4)
                        if (groupCode.toString().length == 3) {
                            groupCode = '0' + groupCode;
                        } else if (groupCode.toString().length == 2) {
                            groupCode = '00' + groupCode;
                        } else if (groupCode.toString().length == 1) {
                            groupCode = '000' + groupCode;
                        }
                        console.log('그룹 코드 체크!', groupCode);
                        await this.checkGroupCodeIsUnique({
                            groupCode,
                        })
                            .then(() => {
                                fixGroupCode = groupCode;
                                console.log('그룹 코드 저장!');
                                resolve(fixGroupCode);
                            })
                            .catch(() => {
                                console.log('그룹 코드 재탐색!');
                                fixGroupCode = '';
                            });
                    }
                }, 0);
            });
        },
        async createGroupUid() {
            return new Promise((resolve, reject) => {
                setTimeout(async () => {
                    let fixGroupUid = '';
                    while (fixGroupUid == '') {
                        console.log('while');
                        function getRandomIntInclusive(min, max) {
                            min = Math.ceil(min);
                            max = Math.floor(max);
                            return Math.floor(
                                Math.random() * (max - min + 1) + min
                            ); // The maximum is inclusive and the minimum is inclusive
                        }
                        let groupUid = uid().slice(0, 8);
                        console.log('그룹 코드 체크!', groupUid);
                        await this.checkGroupUidIsUnique({
                            groupUid,
                        })
                            .then(() => {
                                fixGroupUid = groupUid;
                                console.log('그룹 코드 저장!');
                                resolve(groupUid);
                            })
                            .catch(() => {
                                console.log('그룹 코드 재탐색!');
                                fixGroupUid = '';
                            });
                    }
                }, 0);
            });
        },
    },
};
</script>

<style lang="scss">
.create-group-page {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    .q-carousel {
        height: 100%;
    }

    .create2 {
        padding: 0;

        &__title {
            font-weight: 700;
            font-size: 24px;
            line-height: 32px;
            margin-bottom: 12px;
        }

        &__sub-title {
            line-height: 20px;
            color: #666666;
        }

        .group-name-wrapper {
            display: flex;
            flex: 1;
            position: relative;
        }

        .group-name-input {
            width: 100%;
            height: 100%;
            position: relative;
            font-size: 16px;
            line-height: 24px;
            padding-right: 25px;
            padding-bottom: 0;

            .q-field__inner,
            .q-field__control {
                height: 100%;
            }

            .q-field__control {
                padding-left: 20px;
            }
        }

        .q-field--outlined .q-field__control:before,
        .q-field--outlined .q-field__control:after {
            border: 0 !important;
        }

        .input-length {
            color: #000;
            height: 22px;

            position: absolute;
            top: 0;
            bottom: 0;
            right: 0px;
            margin: auto;
        }

        .add-group {
            margin-top: auto;
            display: flex;
            height: 44px;
            font-weight: 700;
            font-size: 14px;
            line-height: 20px;

            background: #fae54d;
            border-radius: 8px;
        }
    }

    .q-carousel {
        display: flex;
        height: 100%;
        width: 100%;

        .q-carousel__slides-container {
            height: 100%;
            width: 100%;
        }

        .create1 {
            padding: 0;

            .theme-list {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                margin-bottom: 20px;
                overflow-y: auto;
                padding: 10px;
                gap: 20px;
                overflow: visible;
                flex-direction: column;

                .theme {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 18px;
                    flex: 1;
                    width: 100%;
                    height: 100px;

                    flex: none;
                    cursor: pointer;
                    position: relative;
                    padding: 0px 12px;
                    box-sizing: border-box;

                    &:hover,
                    &.is-active {
                        transform: scale(1.05);
                    }

                    &.is-active {
                        border: 2px solid #000;
                    }

                    // &:nth-child(1) {
                    //     background: #fae54d;
                    // }

                    // &:nth-child(2) {
                    //     background: #4b69fe;
                    // }

                    // &:nth-child(3) {
                    //     background: #ff7d5a;
                    // }

                    // &:nth-child(4) {
                    //     background: #6532e9;
                    // }

                    &__gorup-name {
                        font-weight: 700;
                        font-size: 18px;
                        line-height: 24px;
                        color: #666666;
                    }

                    &__wrapper {
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                        width: 50%;
                        height: 100%;
                        flex-direction: row;
                    }

                    &__image {
                        flex: 1;
                        height: 100%;
                        display: flex;
                        justify-content: flex-end;
                        align-items: flex-end;
                        margin-right: 5px;
                        position: absolute;
                        right: 0;
                        bottom: 0;

                        img {
                            width: 130px;
                            -webkit-user-drag: none;
                            -khtml-user-drag: none;
                            -moz-user-drag: none;
                            -o-user-drag: none;
                            user-drag: none;
                        }
                    }

                    &__title-wrapper {
                        display: flex;
                        flex-direction: column;
                        padding: 26px 20px;
                        width: 75%;
                    }

                    &__title {
                        font-weight: 700;
                        font-size: 18px;
                        line-height: 20px;
                        color: #000000;
                        margin-top: 8px;
                        margin-bottom: 5px;
                    }
                    &__content {
                        font-size: 12px;
                        color: #000000;
                    }

                    &__description {
                        font-size: 12px;
                        line-height: 18px;
                        color: #000000;
                        margin-top: 3px;
                    }
                }
            }

            .add-group {
                margin-top: auto;
                display: flex;
                height: 44px;
                font-weight: 700;
                font-size: 14px;
                line-height: 20px;

                background: #fae54d;
                border-radius: 8px;
            }
        }
    }
    .q-carousel {
        padding: 20px;
    }
    .group-name {
        height: 100%;
        width: 100%;

        .container {
            width: 100%;
            height: 100%;
            padding: 0;
            display: flex;
            flex-direction: column;
            flex: none;
        }
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
}

@media screen and (max-width: 375px) {
    .create-group-page {
        .q-carousel {
            .create2 {
                .theme-list {
                    flex-direction: column;

                    .theme {
                        width: 100%;

                        .theme__wrapper {
                            flex-direction: row;
                        }
                    }
                }
            }
        }
    }
}
</style>
