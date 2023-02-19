<template>
    <div class="bottom-buttons-container">
        <button v-if="!isDetailPage" @click="onShared" class="on-share-button">
            공유하기
        </button>
        <button v-else @click="onModify" class="on-share-button">편집</button>
        <button class="on-write-button" @click="onCreate">
            롤링페이퍼 작성
        </button>
        <van-action-sheet
            :round="false"
            v-model="editActionlayer"
            class="login-guide-layer"
        >
            <q-btn
                style="
                    background: white;
                    color: #000;
                    border: 1px solid #d2d2d2;
                    width: 100%;
                "
                class="login-guide-layer__login-button"
                :label="$t('내용 편집')"
                @click="editMessage"
            />
            <q-btn
                style="
                    background: white;
                    color: #000;
                    border: 1px solid #d2d2d2;
                    width: 100%;
                "
                class="login-guide-layer__login-button"
                :label="$t('롤링페이퍼 삭제')"
                @click="deleteMessage"
            />
        </van-action-sheet>
    </div>
</template>

<script>
import {
    getDatabase,
    ref,
    set,
    child,
    get,
    push,
    update,
} from 'firebase/database';
export default {
    props: {
        isDetailPage: {
            type: Boolean,
            default: false,
        },
        groupUid: {
            type: String,
            required: true,
        },
        getMessage: {
            type: Map,
            required: false,
        },
    },
    data() {
        return {
            editActionlayer: false,
        };
    },
    methods: {
        onShared() {
            // 피그마를 봤을 때는 이 공유하기 페이지와 다를 수도 있을 것 같아 확인 필요
            this.$router.push(`/share-group?groupUid=${this.groupUid}`);
        },
        onModify() {
            this.editActionlayer = true;
        },
        onCreate() {
            this.$router.push(`/write-message?groupUid=${this.groupUid}`);
        },
        editMessage() {},
        deleteMessage() {
            console.log(this.getMessage);
            const updates = {};
            const db = getDatabase();
            const dbRef = ref(db);
            get(child(dbRef, `groups/${this.groupUid}`))
                .then((snapshot) => {
                    const data = snapshot.val();
                    data.messages.splice(this.getMessage.id, 1);
                    updates['/groups/' + this.groupUid] = {
                        ...data,
                        messages: [...data.messages],
                    };
                    update(dbRef, updates);
                    this.$router.push(
                        `/group-info?groupUid=${this.groupUid}&groupCode=${data.code}`
                    );
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.bottom-buttons-container {
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
</style>
