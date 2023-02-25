<template>
    <div class="bottom-buttons-container">
        <q-btn v-if="!isDetailPage" @click="onShared" class="on-share-button">
            {{ $t('롤링페이퍼 공유') }}
        </q-btn>
        <q-btn v-else @click="editActionlayer = true" class="on-share-button">
            {{ $t('내용 편집/삭제') }}
        </q-btn>
        <q-btn class="on-write-button" @click="onCreate" v-if="!isDetailPage">
            {{ $t('롤링페이퍼 작성') }}
        </q-btn>
        <q-btn class="on-write-button" @click="onShared" v-if="isDetailPage">
            {{ $t('롤링페이퍼 공유') }}
        </q-btn>
        <van-popup
            v-model="passwordActionLayer"
            class="password-guide-layer"
            position="center"
            duration="0"
            :style="{ height: '100%' }"
        >
            <div class="header">
                <div class="header__left"></div>
                <div class="header__center">
                    <div class="group-name">
                        {{ $t(editType == 'edit' ? '내용 편집' : '삭제') }}
                    </div>
                </div>
                <div class="header__right" @click="passwordActionLayer = false">
                    <img src="~assets/close.png" alt srcset />
                </div>
            </div>
            <div class="container">
                <div class="title">
                    롤링페이퍼를
                    {{ editType == 'edit' ? '편집' : '삭제' }}하려면
                </div>
                <div class="title">비밀번호를 입력해줘</div>
                <q-input
                    class="password-input"
                    type="password"
                    :rules="[(val) => val.length <= 10]"
                    outlined
                    v-model="password"
                    placeholder="비밀번호를 입력"
                />
                <q-btn class="button" @click="handleButtonOnPasswordPopup">
                    {{ $t(editType == 'edit' ? '내용 편집하기' : '삭제하기') }}
                </q-btn>
            </div>
        </van-popup>
        <van-action-sheet
            :round="false"
            v-model="editActionlayer"
            class="edit-guide-layer"
        >
            <q-btn
                style="
                    background: white;
                    color: #000;
                    border: 1px solid #d2d2d2;
                    width: 100%;
                "
                class="login-guide-layer__login-button"
                :label="$t('내용 편집')"
                @click="
                    passwordActionLayer = true;
                    editType = 'edit';
                "
            />
            <q-btn
                style="
                    background: white;
                    color: #000;
                    border: 1px solid #d2d2d2;
                    width: 100%;
                "
                class="login-guide-layer__login-button"
                :label="$t('롤링페이퍼 삭제')"
                @click="
                    passwordActionLayer = true;
                    editType = 'delete';
                "
            />
        </van-action-sheet>
    </div>
</template>

<script>
import {
    getDatabase,
    ref,
    set,
    child,
    get,
    push,
    update,
} from 'firebase/database';
import { Notify } from 'vant';
export default {
    props: {
        isDetailPage: {
            type: Boolean,
            default: false,
        },
        groupUid: {
            type: String,
            required: true,
        },
        getMessage: {
            type: Map,
            required: false,
        },
    },
    data() {
        return {
            password: '',
            passwordActionLayer: false,
            editActionlayer: false,
            currentGroup: null,
            editType: '',
        };
    },
    methods: {
        handleButtonOnPasswordPopup() {
            if (this.getMessage.password != this.password) {
                Notify({
                    message: '비밀번호가 일치하지 않습니다.',
                    color: '#fff',
                    background: '#EF5350',
                });
                return false;
            }
            this.editType == 'edit' ? this.editMessage() : this.deleteMessage();
        },
        onShared() {
            // 피그마를 봤을 때는 이 공유하기 페이지와 다를 수도 있을 것 같아 확인 필요
            this.$router.push(`/share-group?groupUid=${this.groupUid}`);
        },
        onCreate() {
            this.$router.push(`/write-message?groupUid=${this.groupUid}`);
        },
        editMessage() {
            const db = getDatabase();
            const dbRef = ref(db);
            get(child(dbRef, `groups/${this.groupUid}`))
                .then((snapshot) => {
                    const data = snapshot.val();
                    this.$router.push({
                        name: 'writeMessage',
                        query: {
                            groupUid: this.groupUid,
                            groupCode: data.code,
                        },
                        params: {
                            message: this.getMessage,
                        },
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        deleteMessage() {
            console.log(this.getMessage);
            const updates = {};
            const db = getDatabase();
            const dbRef = ref(db);
            get(child(dbRef, `groups/${this.groupUid}`))
                .then((snapshot) => {
                    const data = snapshot.val();
                    data.messages.splice(this.getMessage.id, 1);
                    updates['/groups/' + this.groupUid] = {
                        ...data,
                        messages: [...data.messages],
                    };
                    update(dbRef, updates);
                    this.$router.push(
                        `/group-info?groupUid=${this.groupUid}&groupCode=${data.code}`
                    );
                    Notify({
                        message: '삭제 완료',
                        type: 'success',
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.bottom-buttons-container {
    display: flex;
    align-items: center;
    gap: 17px;

    > button {
        flex: 1;
        height: 44px;
        border-radius: 8px;
        border: none;
        font-size: 14px;
        font-weight: bold;
    }

    .on-share-button {
        background-color: #f5f5f5;
    }

    .on-write-button {
        background-color: #fae54d;
    }
    .password-guide-layer {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        height: 100%;
        .header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 56px;
            border-bottom: 1px solid #e0e0e0;

            &__left {
                width: 57px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            &__center {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;

                .group-name {
                    margin-left: 5px;
                    font-size: 16px;
                    font-weight: bold;
                }
            }

            &__right {
                width: 57px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
        }

        .container {
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
            height: 100%;
            padding-bottom: 40px;
            .title {
                font-size: 24px;
                font-weight: 700;
                line-height: 32px;
                color: #333;
            }
            .password-input {
                margin-top: 24px;
            }
            .button {
                background: #fae54d;
                font-weight: 700;
                line-height: 20px;
                width: 100%;
                height: 44px;
                margin-top: auto;
            }
        }
    }
}
</style>
