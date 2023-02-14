<template>
    <q-page class="flex flex-center my-papers-page">
        <div
            class="group-card"
            v-for="(currentGroup, index) in myGroups"
            :key="index"
        >
            <div class="group-card__image-content">
                <div
                    class="group-card__image"
                    :style="`background:${
                        themeGroupList[currentGroup.selectTheme - 1].background
                    };`"
                >
                    <img
                        :src="
                            getImgUrl(
                                themeGroupList[currentGroup.selectTheme - 1].img
                            )
                        "
                        alt=""
                        srcset=""
                    />
                </div>
                <div class="group-card__content">
                    <div class="group-card__content__group-name">
                        {{ currentGroup.groupName }}
                    </div>
                    <div class="group-card__content__count">
                        {{
                            (currentGroup.message &&
                                currentGroup.message.length) ||
                            0
                        }}명 참여중
                    </div>
                    <div class="group-card__content__created-at">
                        {{ convertedDateFormat(currentGroup.createdAt) }}
                    </div>
                </div>
            </div>
            <div class="group-card__buttons">
                <q-btn
                    v-show="currentGroup.status == 'done'"
                    class="group-card__button-left"
                    disabled
                    label="공유완료"
                ></q-btn>
                <q-btn
                    v-show="currentGroup.status == 'created'"
                    class="group-card__button-left"
                    label="작성자에게 공유"
                    @click="
                        () => {
                            shareOtherPeople(currentGroup);
                        }
                    "
                ></q-btn>
                <q-btn
                    class="group-card__button-right"
                    label="주인공에게 공유"
                    @click="
                        () => {
                            openShareMainPersonModal(currentGroup);
                        }
                    "
                ></q-btn>
            </div>
        </div>
        <van-action-sheet
            :round="false"
            v-model="shareLayer"
            class="share-layer-on-my-papers"
        >
            <div class="share-layer-on-my-papers__title">롤링페이퍼를</div>
            <div class="share-layer-on-my-papers__title">
                주인공에게 공유할거야?
            </div>
            <div class="share-layer-on-my-papers__sub-title">
                공유하면 롤링페이퍼는 이제 못 쓰게 될거야.
            </div>
            <div class="group-card" v-if="selectGroup">
                <div class="group-card__image-content">
                    <div
                        class="group-card__image"
                        :style="`background:${
                            themeGroupList[selectGroup.selectTheme - 1]
                                .background
                        };`"
                    >
                        <img
                            :src="
                                getImgUrl(
                                    themeGroupList[selectGroup.selectTheme - 1]
                                        .img
                                )
                            "
                            alt=""
                            srcset=""
                        />
                    </div>
                    <div class="group-card__content">
                        <div class="group-card__content__group-name">
                            {{ selectGroup.groupName }}
                        </div>
                        <div class="group-card__content__count">
                            {{
                                (selectGroup.message &&
                                    selectGroup.message.length) ||
                                0
                            }}명 참여중
                        </div>
                        <div class="group-card__content__created-at">
                            {{ convertedDateFormat(selectGroup.createdAt) }}
                        </div>
                    </div>
                </div>
                <div class="group-card__buttons">
                    <q-btn
                        class="group-card__button-left"
                        @click="shareLayer = false"
                        label="취소"
                    ></q-btn>
                    <q-btn
                        class="group-card__button-right"
                        label="주인공에게 공유"
                        @click="shareToMainPerson"
                    ></q-btn>
                </div>
            </div>
        </van-action-sheet>
    </q-page>
</template>

<script>
import ComputedMixin from '../ComputedMixin';
import UtilMethodMixin from '../UtilMethodMixin';
import { T } from '../store/module-example/types';
import { getDatabase, ref, set, child, get, update } from 'firebase/database';
export default {
    mixins: [ComputedMixin, UtilMethodMixin],
    data() {
        return {
            selectGroup: null,
            myGroups: [],
            shareLayer: false,
        };
    },
    mounted() {
        this.$store.dispatch(T.CHANGE_HEADER_TITLE, '내 롤링 페이퍼');
        const dbRef = ref(getDatabase());
        get(child(dbRef, `groups/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    let allGroups = [];
                    snapshot.forEach((questionSnapshot) => {
                        let data = questionSnapshot.val();
                        allGroups.push({
                            groupUid: questionSnapshot.key,
                            ...data,
                        });
                    });
                    this.myGroups = allGroups
                        .filter((i) => i.createUserUid == this.uid)
                        .sort((a, b) => {
                            return b.createdAt - a.createdAt;
                        });
                    // console.log("그룹코드가 존재합니다")
                } else {
                    // console.log("그룹코드가 없습니다!")
                }
            })
            .catch((error) => {
                console.error(error);
            });
    },
    methods: {
        shareOtherPeople(currentGroup) {
            console.log(currentGroup);
            let groupUid = currentGroup.groupUid;
            this.$router.push(`/share-group?groupUid=${groupUid}`);
        },
        openShareMainPersonModal(currentGroup) {
            console.log(currentGroup);
            this.selectGroup = currentGroup;
            this.shareLayer = true;
        },

        shareToMainPerson() {
            const data = { ...this.selectGroup };
            let groupUid = this.selectGroup.groupUid;
            if (data.status == 'created') {
                delete data.groupUid;
                const updates = {};
                const db = getDatabase();

                const dbRef = ref(db);
                updates['/groups/' + groupUid] = {
                    ...data,
                    status: 'done',
                };
                update(dbRef, updates);
            }
            this.$router.push(`/share-group?groupUid=${groupUid}`);
        },
    },
};
</script>

<style lang="scss">
.my-papers-page {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .group-card {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        margin-bottom: 20px;
        padding: 10px;
        border-radius: 12px;
        &:hover,
        &:active {
            cursor: pointer;
            background: #ddd;
        }

        &__image-content {
            display: flex;
            margin-bottom: 16px;
            width: 100%;
            justify-content: flex-start;
        }
        &__buttons {
            display: flex;
            width: 100%;
            gap: 12px;
        }
        &__button-left {
            width: calc(50% - 6px);
            height: 44px;
            background: #f5f5f5;
            border-radius: 8px;
            flex: none;
            flex-grow: 1;
            font-weight: 700;
            font-size: 14px;
            line-height: 20px;
        }
        &__button-right {
            width: calc(50% - 6px);
            height: 44px;
            background: #fae54d;
            border-radius: 8px;
            flex: none;
            flex-grow: 2;
            font-weight: 700;
            font-size: 14px;
            line-height: 20px;
        }
        &__image {
            border-radius: 12px;
            width: 80px;
            height: 80px;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 12px;
            img {
                width: auto;
                height: 100%;
            }
        }
        &__content {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            &__group-name {
                //styleName: Subtitle2;
                font-family: Spoqa Han Sans Neo;
                font-size: 16px;
                font-weight: 700;
                line-height: 24px;
                letter-spacing: 0em;
                text-align: left;
                color: #333333;
            }
            &__count {
                //styleName: Subtitle4;
                font-family: Spoqa Han Sans Neo;
                font-size: 12px;
                font-weight: 700;
                line-height: 18px;
                letter-spacing: 0em;
                text-align: left;
                color: #333333;
            }
            &__created-at {
                //styleName: Caption1;
                font-family: Spoqa Han Sans Neo;
                font-size: 12px;
                font-weight: 400;
                line-height: 18px;
                letter-spacing: 0em;
                text-align: left;
                color: #999999;
            }
        }
    }

    .share-layer-on-my-papers {
        padding: 30px 24px;
        padding-bottom: 0;
        .group-card {
            &:hover,
            &:active {
                cursor: default;
                background: #fff;
            }
        }
        &__title {
            font-size: 24px;
            font-weight: 700;
            line-height: 32px;
            color: #333;
            margin-bottom: 12px;
        }
        &__sub-title {
            line-height: 20px;
            color: #666666;
            margin-bottom: 19px;
        }
    }
}
</style>
