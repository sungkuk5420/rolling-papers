<template>
    <q-page class="flex flex-center creators-page">
        <div class="header">
            <div class="header__left"></div>
            <div class="header__center">
                <div class="title">
                    {{ $t('만든사람들') }}
                </div>
            </div>
            <div class="header__right" @click="$router.go(-1)">
                <img src="~assets/close.png" alt srcset />
            </div>
        </div>
        <div class="container">
            <div class="container__title">
                {{ $t('우리가 만들었어!') }}
            </div>
            <div
                v-for="(item, index) in list"
                :key="index"
                class="profile"
                @click="
                    () => {
                        openLinkedIn(item.url);
                    }
                "
            >
                <div class="profile__image">
                    <img src="~assets/profile.png" alt="" />
                </div>
                <div class="profile__content">
                    <div class="profile__name">{{ item.name }}</div>
                    <div class="profile__position">{{ item.position }}</div>
                    <div class="profile__description">
                        {{ item.description }}
                    </div>
                </div>
                <div class="profile__button">
                    <img src="~assets/arrow-right.png" alt="" />
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import ComputedMixin from '../ComputedMixin';
import UtilMethodMixin from '../UtilMethodMixin';
export default {
    mixins: [ComputedMixin, UtilMethodMixin],
    props: ['changeLeftDrawer'],
    mounted() {
        this.list = [
            {
                name: 'Jason',
                position: '개발자',
                description: '하고싶은말 적기',
                url: 'https://www.linkedin.com/in/sungkuk-kim-914748142/',
            },
            {
                name: 'East',
                position: '디자이너',
                description: '하고싶은말 적기',
                url: 'https://www.linkedin.com/in/sungkuk-kim-914748142/',
            },
            {
                name: 'Jyn',
                position: '디자이너',
                description: '하고싶은말 적기',
                url: 'https://www.linkedin.com/in/sungkuk-kim-914748142/',
            },
            {
                name: 'Sophia',
                position: '디자이너',
                description: '하고싶은말 적기',
                url: 'https://www.linkedin.com/in/sungkuk-kim-914748142/',
            },
            {
                name: 'Alex',
                position: '8년차 개발자',
                description: '오사카에 거주하는 프리랜서입니다',
                url: 'https://www.linkedin.com/in/sungkuk-kim-914748142/',
            },
        ];
    },
    data() {
        return { list: [] };
    },
    methods: {
        openLinkedIn(url) {
            window.open(url);
        },
    },
};
</script>

<style lang="scss">
.creators-page {
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

            .title {
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
        display: flex;
        flex-direction: column;
        width: 100%;
        flex: 1;
        padding: 24px 20px;
        height: 100%;
        flex-wrap: nowrap;
        overflow: auto;
        &__title {
            font-weight: 700;
            font-size: 24px;
            line-height: 32px;
            color: #333333;
            margin-bottom: 10px;
        }

        .profile {
            display: flex;
            border-bottom: 1px solid #f0f0f0;
            height: 120px;
            width: 100%;
            flex: 1;
            &:hover {
                background: #f0f0f0;
                cursor: pointer;
            }
            &__image {
                width: 100px;
                display: flex;
                align-items: center;
            }
            &__content {
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                justify-content: center;
                flex: 1;
            }
            &__name {
                font-size: 16px;
                font-weight: 700;
                line-height: 24px;
                margin-bottom: 3px;
            }
            &__position {
                font-size: 12px;
                font-weight: 700;
                line-height: 18px;
                margin-bottom: 2px;
            }
            &__description {
                font-size: 12px;
                line-height: 18px;
                color: #999;
            }
            &__button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 60px;
            }
        }
    }
}
</style>
