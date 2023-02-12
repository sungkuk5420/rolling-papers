<template>
    <q-page class="flex flex-center share-group">
        <div class="container">
            <div class="header">
                <div class="header__left"></div>
                <div class="header__center">
                    <div class="group-name">롤링페이퍼 공유하기</div>
                </div>
                <div class="header__right" @click="$router.go(-1)">
                    <img src="~assets/close.png" alt srcset />
                </div>
            </div>

            <div class="share-group__title">자 이제 롤링페이퍼를</div>
            <div class="share-group__title">작성해줄 사람들을 초대해보자!</div>
            <div class="share-group__sub-title">
                지금 옆에 있는 사람에게 공유
            </div>
            <div class="share-group__content">
                QR코드를 통해 옆에 있는 사람들에게
            </div>
            <div class="share-group__content">
                롤링페이퍼를 작성할 수 있게 하자.
            </div>

            <div class="share-group__buttons">
                <q-btn
                    style="background: #fae54d; color: #000; width: 100%;height 44px;
                    font-weight: bold;"
                    class="share-group__button-left"
                    @click="shareLayer = false"
                >
                    <img
                        src="~assets/qrcode.png"
                        alt=""
                        srcset=""
                        style="width: 20px; height: 20px; margin-right: 8px"
                    />
                    <span>QR코드로 공유하기</span>
                </q-btn>
            </div>
            <div class="share-group__sub-title">멀리 있는 사람들에게 공유</div>
            <div class="share-group__content">
                라인이나 메시지를 통해 멀리 있는 사람에게
            </div>
            <div class="share-group__content">
                롤링페이러 링크를 보내 작성할 수 있게 하자.
            </div>
            <div class="share-group__buttons">
                <q-btn class="share-button line">
                    <img src="~assets/line-icon.png" alt="" srcset="" />라인으로
                    공유하기</q-btn
                >
                <q-btn
                    class="share-button link"
                    label="링크로 공유하기"
                ></q-btn>
            </div>
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
    methods: {
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
    flex-direction: column;
    flex: 1;
    height: 100%;

    &__title {
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;
        color: #333;
        &:nth-child(2) {
            margin-top: 30px;
        }
        &:nth-child(3) {
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

    .share-button {
        &.line {
            background: #06c755;
            color: white;
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 44px;
            border-radius: 8px;
            font-size: 13px;
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
            font-size: 13px;
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
        height: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        flex: none;
    }

    .header {
        padding: 0 0 20px 0;
        display: flex;
        height: 56px;
        justify-content: space-between;
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
}
</style>
