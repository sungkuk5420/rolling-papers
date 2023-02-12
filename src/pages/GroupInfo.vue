<template>
    <q-page class="flex flex-center group-info-page">
        <div class="container">
            <div class="row-div q-mt-xl empty" v-if="messages.length == 0">
                <div class="empty-wrapper flex flex-center column-div">
                    <img
                        class="empty-image"
                        :src="getImgUrl('theme-1.png')"
                        alt="cat"
                    />
                    <p class="empty-notice">
                        아직 롤링페이퍼를 쓴 사람이 없어~ <br />
                        너가 제일 먼저 작성해봐
                    </p>
                </div>
            </div>
            <div class="row-div q-mt-md message-wapper">
                <div class="message-list">
                    <div
                        v-for="(item, index) in messages"
                        :key="index"
                        class="message-post"
                        @click="goDetail(item)"
                    >
                        <div
                            :class="`${item.fontStyle}`"
                            v-show="
                                uid ? uid == item.createUserUid : !item.toggle
                            "
                            v-html="item.message.replaceAll('\n', '<br>')"
                        ></div>
                        <div
                            v-show="
                                uid ? uid !== item.createUserUid : item.toggle
                            "
                            class="flex justify-center"
                        >
                            <div style="font-size: 40px">🤫</div>
                            <div>당사자만 볼 수 있어</div>
                        </div>
                        <div class="message-writer">
                            from
                            {{
                                (uid ? uid !== item.createUserUid : item.toggle)
                                    ? '익명'
                                    : item.writerNickName
                            }}
                        </div>
                    </div>
                </div>
            </div>
            <BottomButtons />
            <van-action-sheet
                :round="false"
                v-model="bottomLayer"
                class="share-action-sheet"
            >
                <q-btn
                    outline
                    color="primary"
                    class="q-mb-md footer-button"
                    label="SNS"
                />
                <q-btn
                    outline
                    color="black"
                    class="q-mb-md footer-button"
                    label="URL LINK"
                />
            </van-action-sheet>
        </div>
    </q-page>
</template>

<script>
import ComputedMixin from '../ComputedMixin';
import UtilMethodMixin from '../UtilMethodMixin';

import { T } from '../store/module-example/types';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import BottomButtons from 'src/components/BottomButtons.vue';
export default {
    components: { BottomButtons },
    mixins: [ComputedMixin, UtilMethodMixin],
    data() {
        return {
            groupUid: '',
            groupName: '',
            groupCode: '',
            messages: [],
            bottomLayer: false,
            actions: [{ name: '생성하기' }, { name: '참여하기' }],
        };
    },
    mounted() {
        // this.showLoading();
        const groupCode = this.$route.query['groupCode'];
        const groupUid = this.$route.query['groupUid'];
        if (!groupCode) {
            this.$router.push(`/join-group?groupUid=${groupUid}`);
            return false;
        }
        this.getGroupInfo();
    },
    methods: {
        async shareMobile() {
            const _this = this;
            let url = location.href;
            const shareData = {
                title: 'Share',
                url,
            };
            if (navigator.canShare && navigator.canShare(shareData)) {
                _this.shareModalVisiable = false;
                await navigator.share(shareData);
            } else {
                _this.shareModalVisiable = true;
            }
        },
        onSelectBottomLayer(value) {
            console.log(value.name);
            if (value.name == '생성하기') {
                this.$router.push('/create-group');
            }
        },
        getGroupInfo() {
            this.groupUid = this.$route.query['groupUid'];
            const dbRef = ref(getDatabase());
            get(child(dbRef, `groups/${this.groupUid}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val());
                        const data = snapshot.val();
                        this.groupName = data.groupName;
                        this.$store.dispatch(
                            T.CHANGE_HEADER_TITLE,
                            this.groupName
                        );
                        this.groupCode = data.code;
                        this.messages = data.messages ? data.messages : [];
                        // console.log("그룹코드가 존재합니다")
                    } else {
                        // console.log("그룹코드가 없습니다!")
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        goDetail(message) {
            const groupUid = this.$route.query.groupUid;
            const groupCode = this.$route.query.groupCode;
            this.$router.push({
                name: 'detailPage',
                query: {
                    groupUid,
                    groupCode,
                },
                params: {
                    message,
                },
            });
        },
    },
};
</script>

<style lang="scss">
.group-info-page {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;

    .share-action-sheet {
        padding: 20px;

        .van-action-sheet__content {
            display: flex;
            flex-direction: column;
            width: 100%;

            .footer-button:last-child {
                margin-bottom: 0;
            }
        }
    }

    .container {
        width: 100%;
        height: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        flex: none;
    }

    .header {
        padding: 0 0 20px 0;
        display: flex;
        justify-content: space-between;

        &__left {
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
                font-size: 20px;
                font-weight: bold;
            }
        }

        &__right {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .code {
        font-size: 22px;
        opacity: 0.3;
        display: flex;
        justify-content: center;
    }

    .empty {
        font-size: 20px;
        opacity: 0.3;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;

        .empty-wrapper {
            gap: 20px;

            .empty-image {
                width: 145px;
                height: 181px;
                object-fit: contain;
            }

            .empty-notice {
                color: #999;
                text-align: center;
                font-size: 16px;
            }
        }
    }

    .message-wapper {
        display: block;
        flex: 1;
        width: 100%;
        height: 100%;
        overflow: auto;
        overflow: hidden;
        padding-bottom: 10px;
    }

    .message-list {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex: 0;
        gap: 10px;
        height: 100%;
        overflow: auto;
        flex-wrap: wrap;
    }

    .message-post {
        width: calc(50% - 5px);
        height: calc(50% - 30px);
        max-height: 200px;
        padding: 20px;
        position: relative;
        border-radius: 12px;
        font-weight: 700;
        color: #fff;

        &:nth-child(4n-3) {
            background-color: #4b69fe;
        }

        &:nth-child(4n-2) {
            background-color: #ff7d5a;
        }

        &:nth-child(4n-1) {
            background-color: #6532e9;
        }

        &:nth-child(4n) {
            background-color: #32e978;
        }
    }

    .message-writer {
        position: absolute;
        bottom: 20px;
        right: 20px;
        font-size: 12px;
        font-weight: 400;
    }

    .wrap-add-group {
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
    }

    .first-font {
        font-family: 'Black Han Sans', sans-serif;
    }

    .second-font {
        font-size: 20px;
        font-family: 'Dongle', sans-serif;
    }

    .third-font {
        font-size: 20px;
        font-family: 'Nanum Pen Script', cursive;
    }

    .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 9px;
    }
}
</style>
