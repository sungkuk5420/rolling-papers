<template>
    <q-page class="flex flex-center send-service-message-page">
        <div class="header">
            <div class="header__left"></div>
            <div class="header__center">
                <div class="header__title">
                    {{ $t('서비스 의견 보내기') }}
                </div>
            </div>
            <div class="header__right" @click="$router.go(-1)">
                <img src="~assets/close.png" alt srcset />
            </div>
        </div>
        <div class="container">
            <div class="title">
                {{ $t('사용 경험이 어땠어?') }}
            </div>
            <div class="content">
                {{ $t('롤링페이퍼에 대해 전반적인 경험을 알려줘') }}
            </div>
            <div class="content">
                {{ $t('롤너의 피드백을 반영하기 위해 노력할게.') }}
            </div>
            <div class="emoticons">
                <div
                    class="emoticon"
                    :class="selectEmoticon == 1 ? 'is-active' : ''"
                    @click="selectEmoticon = 1"
                >
                    <img src="~assets/face-1.png" alt="" />
                </div>
                <div
                    class="emoticon"
                    :class="selectEmoticon == 2 ? 'is-active' : ''"
                    @click="selectEmoticon = 2"
                >
                    <img src="~assets/face-2.png" alt="" />
                </div>
                <div
                    class="emoticon"
                    :class="selectEmoticon == 3 ? 'is-active' : ''"
                    @click="selectEmoticon = 3"
                >
                    <img src="~assets/face-3.png" alt="" />
                </div>
            </div>
            <textarea
                name=""
                id=""
                cols="30"
                rows="6"
                :placeholder="$t('이곳에 작성해주세요.')"
            ></textarea>

            <q-btn
                style="
                    background: #fae54d;
                    color: #000;
                    font-weight: bold;
                    height: 44px;
                    margin-top: 20px;
                    border: 1px solid #d2d2d2;
                    width: 100%;
                "
                >{{ $t('의견 보내기') }}</q-btn
            >
        </div>
    </q-page>
</template>

<script>
import ComputedMixin from '../ComputedMixin';
import UtilMethodMixin from '../UtilMethodMixin';
export default {
    mixins: [ComputedMixin, UtilMethodMixin],
    props: ['changeLeftDrawer'],
    mounted() {},
    data() {
        return { selectEmoticon: 0 };
    },
    methods: {},
};
</script>

<style lang="scss">
.send-service-message-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;

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
        }
        &__title {
            margin-left: 5px;
            font-size: 16px;
            font-weight: bold;
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
        display: flex;
        flex-direction: column;
        width: 100%;
        flex: 1;
        padding: 24px 20px;
        height: 100%;
        flex-wrap: nowrap;
        overflow: auto;
        .title {
            font-weight: 700;
            font-size: 24px;
            line-height: 32px;
            color: #333333;
            margin-bottom: 12px;
        }
        .content {
            line-height: 20px;
            color: #666;
        }
        .emoticons {
            display: flex;
            justify-content: space-between;
            padding: 50px 0;
            .emoticon {
                background: #ddd;
                width: 80px;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
                &:hover {
                    cursor: pointer;
                    opacity: 0.8;
                }
                &.is-active {
                    background: #faf4c6;
                }
            }
        }
        textarea {
            resize: none;
            padding: 20px;
            font-size: 16px;
            line-height: 24px;
            margin-top: 10px;
        }
    }
}
</style>
