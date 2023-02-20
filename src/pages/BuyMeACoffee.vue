<template>
    <q-page class="flex flex-center buy-me-a-coffee">
        <div class="header">
            <div class="header__left"></div>
            <div class="header__center">
                <div class="group-name">
                    {{ $t('후원하기') }}
                </div>
            </div>
            <div class="header__right" @click="$router.go(-1)">
                <img src="~assets/close.png" alt srcset />
            </div>
        </div>
        <div class="container">
            <!-- {{ groupStatus }} -->
            <div class="buy-me-a-coffee__title" v-if="groupStatus != 'done'">
                {{ $t('개발자에게 고마운 마음 표현하기') }}❤️
            </div>
            <div class="buy-me-a-coffee__sub-title">
                {{
                    $t('이용하는데 불편함이 없도록 광고 없이 운영을 하고 있어')
                }}
            </div>
            <img
                src="~assets/bmc_qr.png"
                style="width: 160px; margin-left: auto; margin-right: auto"
                alt
                srcset
            />

            <div class="buy-me-a-coffee__buttons">
                <q-btn
                    class="share-button buy-me-a-coffee"
                    @click="openBuyMeACoffee"
                >
                    <img src="~assets/qrcode.png" alt="" srcset="" />
                    {{ $t('buy me a coffee') }}
                </q-btn>
                <q-btn
                    class="share-button link"
                    :label="$t('광고/제휴 문의')"
                    @click="clickShareMobile"
                ></q-btn>
            </div>
        </div>
    </q-page>
</template>

<script>
import ComputedMixin from '../ComputedMixin';
import UtilMethodMixin from '../UtilMethodMixin';
import { T } from '../store/module-example/types';
export default {
    components: {},
    mixins: [ComputedMixin, UtilMethodMixin],
    data() {
        return {};
    },
    mounted() {
        // this.showLoading();
    },
    watch: {},
    methods: {
        openBuyMeACoffee() {
            window.open('https://www.buymeacoffee.com/WtLjsqJ', '_blank');
        },
    },
};
</script>

<style lang="scss">
.buy-me-a-coffee {
    display: flex;
    flex: 1;
    height: 100%;

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
    &__buttons {
        margin-top: 20px;
        gap: 12px;
        display: flex;
        flex-direction: column;
        width: 100%;
        flex: 0;
        height: 120px;
        .q-btn {
            width: 100%;
            min-height: 44px;
            border-radius: 8px;
            display: flex;
            font-weight: 700;

            .q-btn__wrapper:before {
                box-shadow: none;
            }
        }
    }

    .share-button {
        .q-btn__wrapper {
            padding: 4px 4px;
        }
        &.buy-me-a-coffee {
            background: #fae54d;
            color: #000;
            width: 100%;
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
        &.line {
            background: #06c755;
            color: white;
            width: 100%;
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
            width: 100%;
            background: #f5f5f5;
            height: 44px;
            border-radius: 8px;
            font-weight: 700;
            line-height: 20px;
        }
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
}
</style>
