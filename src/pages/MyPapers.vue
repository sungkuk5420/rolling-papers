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
                    class="group-card__button-left"
                    label="작성자에게 공유"
                ></q-btn>
                <q-btn
                    class="group-card__button-right"
                    label="공유 완료"
                ></q-btn>
            </div>
        </div>
    </q-page>
</template>

<script>
import ComputedMixin from '../ComputedMixin';
import UtilMethodMixin from '../UtilMethodMixin';
import { T } from '../store/module-example/types';
import { getDatabase, ref, set, child, get } from 'firebase/database';
export default {
    mixins: [ComputedMixin, UtilMethodMixin],
    data() {
        return {
            myGroups: [],
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
                        allGroups.push(data);
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
}
</style>
