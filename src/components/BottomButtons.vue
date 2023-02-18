<template>
    <div class="bottom-buttons-container">
        <button v-if="!isDetailPage" @click="onShared" class="on-share-button">
            공유하기
        </button>
        <button v-else @click="onModify" class="on-share-button">
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
        },
        groupUid: {
          type: String,
          required: true,
        }
    },
    methods: {
        onShared() {
            // 피그마를 봤을 때는 이 공유하기 페이지와 다를 수도 있을 것 같아 확인 필요
            this.$router.push(`/share-group?groupUid=${this.groupUid}`);
        },
        onModify() {
            console.log('나중에 추가할 기능');
        },
        onCreate() {
          this.$router.push(`/write-message?groupUid=${this.groupUid}`);
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
