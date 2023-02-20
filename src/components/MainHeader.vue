<template>
    <q-header class="header">
        <div class="header__left" @click="leftDrawerOpen">
            <img src="~assets/menu.png" alt srcset />
        </div>
        <div class="header__center">{{ headerTitle }}</div>
        <div class="header__right" @click="changeLangage">
            <img src="~assets/gift.png" alt srcset />
        </div>
    </q-header>
</template>

<script>
import { T } from '../store/module-example/types';
export default {
    props: ['centerText', 'leftDrawerOpen'],
    methods: {},

    computed: {
        headerTitle: {
            get() {
                return this.$store.getters.getHeaderTitle;
            },
            set(value) {
                return this.$store.dispatch(T.CHANGE_HEADER_TITLE, value);
            },
        },
    },
    methods: {
        changeLangage() {
            if (this.$i18n.locale == 'ja') {
                this.$i18n.locale = '';
            } else {
                this.$i18n.locale = 'ja';
            }
            this.$store.dispatch(T.CHANGE_HEADER_TITLE, this.$t('롤링 페이퍼'));

            this.$store.dispatch(T.SET_THEME_GROUP_LIST, [
                {
                    name: this.$t('축하해요'),
                    content: this.$t('축하의 메세지를 전해보세요'),
                    img: 'theme-1.png',
                    background: '#F3F3F3',
                },
                {
                    name: this.$t('고마워요'),
                    content: this.$t('감사의 메세지를 전해보세요'),
                    img: 'theme-2.png',
                    background: '#F3F3F3',
                },
                {
                    name: this.$t('힘내요'),
                    content: this.$t('응원의 메세지를 전해보세요'),
                    img: 'theme-3.png',
                    background: '#F3F3F3',
                },
                {
                    name: this.$t('기뻐요'),
                    content: this.$t('기쁨의 메세지를 전해보세요'),
                    img: 'theme-4.png',
                    background: '#F3F3F3',
                },
                {
                    name: this.$t('슬퍼요'),
                    content: this.$t('슬픔의 메세지를 전해보세요'),
                    img: 'theme-5.png',
                    background: '#F3F3F3',
                },
                {
                    name: this.$t('아쉬워요'),
                    content: this.$t('아쉬움의 메세지를 전해보세요'),
                    img: 'theme-6.png',
                    background: '#F3F3F3',
                },
            ]);
        },
    },
};
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 57px;
    width: 100%;
    background: #fff;
    color: #000;

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
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 57px;
        height: 57px;
    }
}
</style>
