<template>
    <div class="flex write-message-page">
        <div class="container">
            <div class="header">
                <q-icon
                    name="arrow_back_ios"
                    style="font-size: 24px; cursor: pointer"
                    @click="$router.go(-1)"
                />
                <p class="header-title" v-show="!getMessage">
                    {{ $t('롤링페이퍼 작성') }}
                </p>
                <p class="header-title" v-show="getMessage">
                    {{ $t('롤링페이퍼 편집') }}
                </p>
            </div>
            <div class="row-div text-area">
                <q-input
                    class="message-input"
                    :class="fontStyle"
                    type="textarea"
                    :rules="[(val) => val.length <= 50]"
                    outlined
                    v-model="message"
                    :placeholder="$t('롤링페이퍼를 작성해주세요')"
                >
                    <span class="input-length"
                        >{{ message.toString().length }}/50</span
                    >
                </q-input>
            </div>
            <div class="row-div id-area">
                <q-input
                    autoComplete="new-password"
                    class="writer-input"
                    :rules="[(val) => val.length <= 12]"
                    outlined
                    v-model="writerNickName"
                    :placeholder="$t('이름이나 단어, 문장을 입력해주세요.')"
                >
                    <span class="input-length"
                        >{{ writerNickName.toString().length }}/12</span
                    >
                </q-input>
                <q-input
                    autoComplete="new-password"
                    class="writer-input password"
                    type="password"
                    :rules="[(val) => val.length <= 12]"
                    outlined
                    v-model="password"
                    :placeholder="$t('최대 12자까지 입력해주세요.')"
                    v-show="!getMessage"
                >
                    <span class="input-length"
                        >{{ password.toString().length }}/12</span
                    >
                </q-input>
                <div class="font-button-group">
                    <q-btn
                        class="font first-font"
                        :class="{ 'active-font': fontStyle === 'first-font' }"
                        :label="$t('폰트') + '1'"
                        @click="
                            () => {
                                changeFont(1);
                            }
                        "
                    />
                    <q-btn
                        class="font second-font"
                        :class="{ 'active-font': fontStyle === 'second-font' }"
                        :label="$t('폰트') + '2'"
                        @click="
                            () => {
                                changeFont(2);
                            }
                        "
                    />
                    <q-btn
                        class="font third-font"
                        :class="{ 'active-font': fontStyle === 'third-font' }"
                        :label="$t('폰트') + '3'"
                        @click="
                            () => {
                                changeFont(3);
                            }
                        "
                    />
                </div>
                <div class="title q-mt-md">
                    <div class="title__left">
                        <div>{{ $t('익명으로 작성') }}</div>
                        <div class="title__sub">
                            {{ $t('오직 주인공만 볼 수 있어') }}
                        </div>
                    </div>
                    <div class="title__right">
                        <q-toggle
                            size="xl"
                            v-model="toggle"
                            color="yellow"
                            keep-color
                        />
                    </div>
                </div>

                <q-btn
                    class="message-button"
                    @click="writeMessage"
                    v-show="!getMessage"
                >
                    {{ $t('메세지 남기기') }}
                </q-btn>
                <q-btn
                    class="message-button"
                    @click="editMessage"
                    v-show="getMessage"
                >
                    {{ $t('메세지 편집') }}
                </q-btn>
            </div>
        </div>
    </div>
</template>

<script>
import ComputedMixin from '../ComputedMixin';
import UtilMethodMixin from '../UtilMethodMixin';
import { T } from '../store/module-example/types';
import { uid } from 'quasar';
import {
    getDatabase,
    ref,
    set,
    child,
    get,
    push,
    update,
} from 'firebase/database';
export default {
    mixins: [ComputedMixin, UtilMethodMixin],
    data() {
        return {
            toggle: false,
            message: '',
            writerNickName: '',
            fontStyle: 'first-font',
            password: '',
        };
    },
    computed: {
        getMessage() {
            return this.$route.params.message;
        },
    },
    watch: {
        message(value) {
            this.message = value.slice(0, 50);
        },
        writerNickName(value) {
            this.writerNickName = value.slice(0, 12);
        },
        password(value) {
            this.password = value.slice(0, 12);
        },
    },
    mounted() {
        // this.showLoading();
        if (this.getMessage) {
            this.message = this.getMessage.message;
            this.writerNickName = this.getMessage.writerNickName;
            this.password = this.getMessage.password;
            this.toggle = this.getMessage.toggle;
            this.fontStyle = this.getMessage.fontStyle;
        }
    },
    methods: {
        changeFont(value) {
            switch (value) {
                case 1:
                    this.fontStyle = 'first-font';
                    break;
                case 2:
                    this.fontStyle = 'second-font';
                    break;
                case 3:
                    this.fontStyle = 'third-font';
                    break;

                default:
                    break;
            }
        },
        async writeMessage() {
            let groupUid = this.$route.query['groupUid'];
            const db = getDatabase();
            const updates = {};
            const dbRef = ref(db);
            get(child(dbRef, `groups/${groupUid}`))
                .then((snapshot) => {
                    const data = snapshot.val();
                    const groupCode = data.code;

                    let originalMessage = data.messages ? data.messages : [];
                    updates['/groups/' + groupUid] = {
                        ...data,
                        messages: [
                            ...originalMessage,
                            {
                                message: this.message,
                                writerNickName: this.toggle
                                    ? this.$t('익명')
                                    : this.writerNickName,
                                password: this.password,
                                toggle: this.toggle,
                                fontStyle: this.fontStyle,
                                createdAt: this.createNowTime(),
                            },
                        ],
                    };
                    update(dbRef, updates);
                    this.$router.push(
                        `/group-info?groupUid=${groupUid}&groupCode=${groupCode}`
                    );
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async editMessage() {
            let groupUid = this.$route.query['groupUid'];
            const db = getDatabase();
            if (this.uid) {
                const updates = {};
                const dbRef = ref(db);
                get(child(dbRef, `groups/${groupUid}`))
                    .then((snapshot) => {
                        const data = snapshot.val();
                        const groupCode = data.code;

                        data.messages ? data.messages : [];
                        let editMessage = data.messages[this.getMessage.id];
                        editMessage = {
                            ...editMessage,
                            fontStyle: this.fontStyle,
                            message: this.message,
                            toggle: this.toggle,
                            writerNickName: this.writerNickName,
                        };

                        data.messages[this.getMessage.id] = editMessage;
                        const newMessage = data.messages;
                        updates['/groups/' + groupUid] = {
                            ...data,
                            messages: [...newMessage],
                        };
                        update(dbRef, updates);
                        this.$router.push(
                            `/group-info?groupUid=${groupUid}&groupCode=${groupCode}`
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                this.$router.push('/login');
            }
        },
    },
};
</script>

<style lang="scss">
.write-message-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    height: 100%;

    .container {
        width: 100%;

        .header {
            height: 57px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            border-bottom: solid 1px #e0e0e0;

            .header-title {
                margin: 0;
                font-size: 16px;
                font-weight: 700;
            }
        }

        .row-div {
            padding: 0 19px;
        }

        .text-area {
            margin-top: 24px;

            .q-field--outlined .q-field__control:before {
                border: none;
            }

            textarea {
                font-size: 24px;
                font-weight: 700;
                resize: none;

                &::placeholder {
                    color: #999;
                    font-size: 24px;
                    font-weight: 700;
                }
            }
        }

        .id-area {
            margin-top: 16px;

            .writer-input {
                box-sizing: border-box;
                height: 44px;

                .q-field__control {
                    height: 44px;
                }
            }

            .password {
                margin-top: 16px;
            }
        }
    }

    .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 9px;
        display: flex;
        width: 100%;

        &__left {
            flex: 1;
        }

        &__sub {
            opacity: 0.2;
            font-weight: bold;
            font-size: 14px;
        }

        &__right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
        }
    }

    .q-textarea .q-field__native {
        line-height: 1 !important;
    }

    .first-font {
        .q-btn__content,
        textarea {
            font-family: 'Black Han Sans', sans-serif;
        }
    }

    .second-font {
        .q-btn__content {
            font-size: 17px !important;
        }

        .q-btn__content,
        textarea {
            font-family: 'Dongle', sans-serif;
        }
    }

    .third-font {
        .q-btn__content {
            font-size: 17px !important;
        }

        .q-btn__content,
        textarea {
            font-family: 'Nanum Pen Script', cursive;
        }
    }

    .font {
        flex: 1;
        height: 44px;
        border-radius: 8px;
        background-color: #faf4c6;
        color: #666;
    }

    .active-font {
        background-color: #fae54d;
        color: #000;
    }

    .q-toggle__track {
        height: 0.5em;
        margin-top: -0.08em;
        border-radius: 15px;
    }

    .message-input {
        background-color: #faf4c6;
        border: none;
        height: 300px;
        font-size: 18px;
        letter-spacing: 0;
        border-radius: 12px;
    }

    .q-field__inner,
    .q-field__control {
        height: 300px;
    }

    .q-field__control {
        padding-left: 20px;
    }

    .input-length {
        position: absolute;
        color: #000;
        bottom: 15px;
        right: 10px;
        font-size: 14px;
    }
}

.writer-input {
    height: 66px;
    letter-spacing: 0;
    position: relative;

    .q-field__inner,
    .q-field__control {
        height: 66px;
    }

    .q-field__control {
        padding-left: 20px;
    }

    .input-length {
        position: absolute;
        color: #000;
        height: 20px;
        bottom: 0;
        top: 0;
        margin: auto;
        right: 10px;
        font-size: 14px;
    }
}

.font-button-group {
    margin-top: 24px;
    display: flex;
    gap: 10px;
    justify-content: space-between;

    .q-btn {
        flex: 1;
    }

    .container {
        width: 100%;
        height: 100%;
        padding: 20px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        flex: none;
    }
}

.message-button {
    margin-top: auto;
    display: flex;
    background: #fae54d;
    width: 100%;
    height: 44px;
    font-weight: 700;
    line-height: 20px;
}
</style>
