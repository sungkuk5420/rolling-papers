<template>
    <q-header class="header">
        <div class="header__left" @click="leftDrawerOpen">
            <img src="~assets/menu.png" alt srcset />
        </div>
        <div class="header__center">{{ centerText }}</div>
        <div class="header__right">
            <img src="~assets/gift.png" alt srcset />
        </div>
    </q-header>
</template>

<script>
export default {
    props: ['centerText', 'leftDrawerOpen'],
    methods: {},
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
