<template>
    <q-page class="flex flex-center share-group">
        <div class="header">
            <div class="header__left"></div>
            <div class="header__center">
                <div class="group-name">
                    {{ $t('롤링페이퍼 공유하기') }}
                </div>
            </div>
            <div class="header__right" @click="$router.go(-1)">
                <img src="~assets/close.png" alt srcset />
            </div>
        </div>
        <div class="container">
            <!-- {{ groupStatus }} -->
            <div class="share-group__title" v-if="groupStatus != 'done'">
                {{ $t('자 이제 롤링페이퍼를') }}
            </div>
            <div class="share-group__title" v-if="groupStatus != 'done'">
                {{ $t('작성해줄 사람들을 초대해보자!') }}
            </div>
            <div class="share-group__title" v-if="groupStatus == 'done'">
                {{ $t('자 이제 롤링페이퍼를') }}
            </div>
            <div class="share-group__title" v-if="groupStatus == 'done'">
                {{ $t('주인공에게 전달해보자!') }}
            </div>
            <div class="share-group__sub-title">
                {{ $t('지금 옆에 있는 사람에게 공유') }}
            </div>
            <div class="share-group__content">
                {{ $t('QR코드를 통해 옆에 있는 사람들에게') }}
            </div>
            <div class="share-group__content">
                {{ $t('롤링페이퍼를 작성할 수 있게 하자.') }}
            </div>

            <div class="share-group__buttons">
                <q-btn
                    class="share-group__button-left"
                    @click="shareByQrcode = true"
                >
                    <img
                        src="~assets/qrcode.png"
                        alt=""
                        srcset=""
                        style="width: 20px; height: 20px; margin-right: 8px"
                    />
                    <span>
                        {{ $t(' QR코드로 공유하기') }}
                    </span>
                </q-btn>
            </div>
            <div class="share-group__sub-title">
                {{ $t('멀리 있는 사람들에게 공유') }}
            </div>
            <div class="share-group__content">
                {{ $t('라인이나 메시지를 통해 멀리 있는 사람에게') }}
            </div>
            <div class="share-group__content">
                {{ $t('롤링페이퍼 링크를 보내 작성할 수 있게 하자.') }}
            </div>
            <div class="share-group__buttons">
                <q-btn class="share-button line" @click="shareLine">
                    <img src="~assets/line-icon.png" alt="" srcset="" />
                    {{ $t('라인으로 공유하기') }}
                </q-btn>
                <q-btn
                    class="share-button link"
                    :label="$t('링크로 공유하기')"
                    @click="clickShareMobile"
                ></q-btn>
            </div>

            <van-action-sheet
                :round="false"
                v-model="shareByQrcode"
                class="share-by-qrcode-layer"
            >
                <div class="share-by-qrcode-layer__title">
                    {{ $t('옆에 있는 사람에게 공유하자!') }}
                </div>
                <div class="share-by-qrcode-layer__sub-title">
                    {{ $t('카메라를 켜서 QR코드를 통해 접속해.') }}
                </div>
                <div class="share-by-qrcode-layer__sub-title-2">
                    {{ $t('입장 코드') }}
                </div>
                <div class="share-by-qrcode-layer__codes">
                    <div class="share-by-qrcode-layer__number">
                        {{ groupCode.toString()[0] }}
                    </div>
                    <div class="share-by-qrcode-layer__number">
                        {{ groupCode.toString()[1] }}
                    </div>
                    <div class="share-by-qrcode-layer__number">
                        {{ groupCode.toString()[2] }}
                    </div>
                    <div class="share-by-qrcode-layer__number">
                        {{ groupCode.toString()[3] }}
                    </div>
                </div>
                <div class="qrcode-wrapper">
                    <div id="qrcode"></div>
                </div>
                <div class="share-by-qrcode-layer__buttons">
                    <q-btn
                        style="background: #f5f5f5; color: #999999"
                        class="login-guide-layer__cancel"
                        :label="$t('닫기')"
                        @click="shareByQrcode = false"
                    />
                    <q-btn
                        style="background: #fae54d"
                        class="login-guide-layer__confirm"
                        :label="$t('이미지 저장하기')"
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
import { getDatabase, ref, set, child, get } from 'firebase/database';
export default {
    components: {},
    mixins: [ComputedMixin, UtilMethodMixin],
    data() {
        return {
            groupUid: '',
            groupName: '',
            groupCode: '',
            groupStatus: '',
            shareByQrcode: false,
            link: '',
        };
    },
    mounted() {
        // this.showLoading();
        const groupUid = this.$route.query['groupUid'];
        if (!groupUid) {
            this.$router.go(-1);
            return false;
        }
        this.getGroupInfo();
    },
    watch: {
        shareByQrcode(value) {
            if (!value) {
                return false;
            }
            setTimeout(() => {
                $('#qrcode canvas').remove();
                $('#qrcode').qrcode({
                    width: 150,
                    height: 150,
                    text: this.link,
                });
            }, 100);
        },
    },
    methods: {
        shareLine() {
            var link =
                'https://social-plugins.line.me/lineit/share?url=' + this.link;
            window.open(link, 'LINE');
        },
        clickShareMobile() {
            this.shareMobile();
        },
        async shareMobile() {
            let url = this.link;
            // let url = location.href;
            if (!url) {
                return false;
            }
            const shareData = {
                title: `롤링페이퍼를 작성해줘! ${this.groupName} [입장코드] ${this.groupCode}`,
                url,
            };
            if (navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
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
                        this.groupCode = data.code;
                        this.groupStatus = data.status;
                        this.link =
                            'https://rolling-papers.netlify.app' +
                            '/join-group?' +
                            `groupUid=${this.groupUid}`;
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>

<style lang="scss">
.share-group {
    display: flex;
    flex: 1;
    height: 100%;

    &__title {
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;
        color: #333;
        &:nth-child(1) {
            margin-top: 10px;
        }
        &:nth-child(2) {
            margin-bottom: 32px;
        }
    }
    &__sub-title {
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        color: #333;
        margin-bottom: 6px;
    }

    &__content {
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
        color: #999;
    }
    &__button-left {
        background: #fae54d;
        color: #000;
        width: 100%;
        height: 44px;
        font-weight: bold;
    }

    .share-button {
        .q-btn__wrapper {
            padding: 4px 4px;
        }
        &.line {
            background: #06c755;
            color: white;
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 44px;
            border-radius: 8px;
            font-weight: bold;
            img {
                margin-right: 4px;
            }
        }
        &.link {
            width: 50%;
            background: #f5f5f5;
            height: 44px;
            border-radius: 8px;
            font-weight: 700;
            line-height: 20px;
        }
    }

    .share-group__buttons {
        margin-top: 20px;
        margin-bottom: 30px;
        gap: 12px;
        display: flex;
    }

    .container {
        width: 100%;
        height: calc(100% - 56px);
        padding: 20px;
        display: flex;
        flex-direction: column;
        flex: none;
    }

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

    .share-by-qrcode-layer {
        padding: 24px;
        &__title {
            font-size: 24px;
            font-weight: 700;
            line-height: 32px;
            color: #333333;
            margin-bottom: 12px;
        }
        &__sub-title {
            line-height: 20px;
            color: #666;
            margin-bottom: 20px;
        }
        &__sub-title-2 {
            font-weight: 700;
            line-height: 20px;
            color: #666;
            margin-bottom: 20px;
            width: 100%;
            display: flex;
            justify-content: center;
        }
        &__codes {
            display: flex;
            justify-content: space-around;
            margin-bottom: 30px;
        }
        &__number {
            width: 63px;
            height: 63px;
            border: 1px solid #e6e6e6;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
            font-weight: 700;
            line-height: 32px;
        }
        .qrcode-wrapper {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
        }
        &__buttons {
            display: flex;
            width: 100%;
            gap: 10px;

            .q-btn {
                width: 50%;
                height: 44px;
                border-radius: 8px;
                display: flex;
                font-weight: 700;

                .q-btn__wrapper:before {
                    box-shadow: none;
                }
            }
        }
    }
}
</style>
