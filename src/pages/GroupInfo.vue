<template>
    <q-page class="flex flex-center group-info-page">
        <div class="container">
            <div class="group-card">
                <div class="group-card__left">
                    <div class="group-card__left__title">
                        {{
                            currentGroup.selectTheme != 0
                                ? $t(
                                      themeGroupList[
                                          currentGroup.selectTheme - 1
                                      ].name
                                  )
                                : ''
                        }}
                    </div>
                    <div class="group-card__left__sub-title">
                        {{ groupName }}
                    </div>
                </div>
                <div class="group-card__right">
                    <div class="login-guide-layer__image">
                        <img
                            :src="
                                getImgUrl(
                                    themeGroupList[currentGroup.selectTheme - 1]
                                        .img
                                )
                            "
                            alt=""
                            srcset=""
                        />
                    </div>
                </div>
            </div>
            <div class="row-div empty" v-if="loadingStatus == 'empty'">
                <div class="empty-wrapper flex flex-center column-div">
                    <img
                        class="empty-image"
                        :src="getImgUrl('group-info-empty.png')"
                        alt="cat"
                    />
                    <p class="empty-notice">
                        롤링페이퍼를 작성한 사람이 없어요.
                    </p>
                    <p class="empty-notice">제일 먼저 작성해보실래요?</p>
                </div>
            </div>
            <div class="row-div q-mt-md message-wapper" v-else>
                <div class="message-list">
                    <div
                        v-for="(item, index) in messages"
                        :key="index"
                        class="message-post"
                        :class="item.toggle ? 'secret' : ''"
                        @click="goDetail(item)"
                    >
                        <div
                            :class="`${item.fontStyle}`"
                            v-show="!item.toggle"
                            v-html="item.message.replaceAll('\n', '<br>')"
                        ></div>
                        <div
                            v-show="item.toggle"
                            class="flex justify-center items-center column"
                            style="
                                margin-top: auto;
                                margin-bottom: auto;
                                height: 100%;
                            "
                        >
                            <div style="font-size: 40px">🤫</div>
                            <div>비밀글 이에요</div>
                        </div>
                        <div class="message-writer">
                            {{ 'from ' + item.writerNickName }}
                        </div>
                    </div>
                </div>
            </div>
            <BottomButtons :groupUid="groupUid" />
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
import { Toast } from 'vant';
export default {
    components: { BottomButtons },
    mixins: [ComputedMixin, UtilMethodMixin],
    data() {
        return {
            groupUid: '',
            groupName: '',
            groupCode: '',
            currentGroup: '',
            messages: [],
            bottomLayer: false,
            actions: [{ name: '생성하기' }, { name: '참여하기' }],
            loadingStatus: 'loading',
        };
    },
    mounted() {
        Toast.loading({
            message: 'Loading...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 10000,
        });
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
                        this.currentGroup = data;
                        this.groupName = data.groupName;
                        this.$store.dispatch(
                            T.CHANGE_HEADER_TITLE,
                            this.groupName
                        );
                        this.groupCode = data.code;
                        this.messages = data.messages
                            ? [
                                  ...data.messages
                                      .filter((i) => !i.toggle)
                                      .map((i, index) => {
                                          return { ...i, id: index };
                                      })
                                      .sort((a, b) => {
                                          return b.createdAt - a.createdAt;
                                      }),
                                  ...data.messages.filter((i) => i.toggle),
                              ]
                            : [];

                        Toast.clear();
                        if (this.messages.length == 0) {
                            this.loadingStatus = 'empty';
                        }
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

    .code {
        font-size: 22px;
        opacity: 0.3;
        display: flex;
        justify-content: center;
    }

    .empty {
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;

        .empty-wrapper {
            .empty-image {
                width: 255px;
                height: 255px;
                object-fit: contain;
                margin-bottom: 20px;
            }

            .empty-notice {
                color: #999;
                text-align: center;
                font-size: 16px;
                margin: 0;
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
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px 15px;
        overflow: auto;
        height: 100%;
    }

    .message-post {
        height: 200px;
        padding: 20px;
        position: relative;
        border-radius: 12px;
        font-weight: 700;
        color: #333;
        background: #faf4c6;
        &.secret {
            background: #333;
            color: #666;
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
