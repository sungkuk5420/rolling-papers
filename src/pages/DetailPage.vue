<template>
    <div class="detail-page-container">
        <div class="header">
            <div class="header__left">
                <q-icon
                    name="menu"
                    style="font-size: 24px; cursor: pointer"
                    @click="$router.go(-1)"
                ></q-icon>
            </div>
            <div class="header__center">
                <q-icon
                    name="celebration"
                    style="font-size: 24px; cursor: pointer"
                ></q-icon>
                <div class="group-name">롤링페이퍼 상세</div>
            </div>
            <div class="header__right">
                <q-icon
                    name="ios_share"
                    style="font-size: 24px; cursor: pointer"
                ></q-icon>
            </div>
        </div>
        <div class="wrap-contents">
            <div class="contents">
                <p
                    v-show="!getMessage.toggle"
                    class="content"
                    :class="`${getMessage.fontStyle}`"
                >
                    {{ getMessage.message }}
                </p>

                <div
                    v-show="getMessage.toggle"
                    class="flex justify-center items-center column content"
                    style="margin-top: auto; margin-bottom: auto"
                >
                    <div style="font-size: 40px">🤫</div>
                    <div>당사자만 볼 수 있어</div>
                </div>
                <p class="writer">
                    {{
                        getMessage.toggle
                            ? ''
                            : 'from ' + getMessage.writerNickName
                    }}
                </p>
            </div>
        </div>
        <BottomButtons
            :isDetailPage="true"
            :groupUid="groupUid"
            :getMessage="getMessage"
        />
    </div>
</template>

<script>
import BottomButtons from 'src/components/BottomButtons.vue';

export default {
    components: { BottomButtons },
    data() {
        return {
            groupUid: '',
        };
    },
    computed: {
        getMessage() {
            return this.$route.params.message;
        },
    },
    mounted() {
        const groupCode = this.$route.query.groupCode;
        const groupUid = this.$route.query.groupUid;
        // 둘 다 없으면 create-group으로 간다.
        if (!groupCode && !groupUid) {
            this.$router.push('/create-group');
            return;
        }
        // groupCode 없으면 join-group으로 간다
        if (!groupCode) {
            this.$router.push(`/join-group?groupUid=${groupUid}`);
            return;
        }
        if (!this.$route.params.message) {
            this.$router.push(
                `/group-info?groupUid=${groupUid}&groupCode=${groupCode}`
            );
        }

        this.groupUid = groupUid;
    },
};
</script>
<style scoped lang="scss">
.detail-page-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: none;

    .header {
        padding: 0 0 20px 0;
        display: flex;
        justify-content: space-between;

        &__left {
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
                font-size: 20px;
                font-weight: bold;
            }
        }

        &__right {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .wrap-contents {
        flex: 1;
        display: flex;
        justify-content: space-between;

        .contents {
            width: 100%;
            height: 328px;
            background-color: #ff7d5a;
            padding: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-radius: 12px;
            .content {
                color: white;
                font-weight: bold;
            }

            .first-font {
                font-family: 'Black Han Sans', sans-serif;
            }

            .second-font {
                font-size: 20px;
                font-family: 'Dongle', sans-serif;
            }

            .third-font {
                font-size: 20px;
                font-family: 'Nanum Pen Script', cursive;
            }

            .writer {
                text-align: right;
                color: #fff;
                font-weight: 400;
            }
        }
    }
}
</style>
