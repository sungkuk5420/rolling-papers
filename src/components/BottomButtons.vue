<template>
    <div class="bottom-buttons-container">
        <button v-if="!isDetailPage" @click="onModify" class="on-share-button">
            공유하기
        </button>
        <button v-else @click="onShared" class="on-share-button">
            편집
        </button>
        <button class="on-write-button" @click="onCreate">
            롤링페이퍼 작성
        </button>
    </div>
</template>

<script>
export default {
    props: {
        isDetailPage: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        onShared() {
            console.log('나중에 추가할 기능');
        },
        onModify() {
            console.log('나중에 추가할 기능');
        },
        onCreate() {
            console.log('나중에 추가할 기능');
        }
    }
}
</script>

<style lang="scss" scoped>
.bottom-buttons-container {
    display: flex;
    align-items: center;
    gap: 17px;

    >button {
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
</style>
