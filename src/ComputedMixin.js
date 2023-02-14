import { mapGetters } from "vuex";
let ComputedMixin = {
    computed: {
        ...mapGetters({
            email: "getEmail",
            nickname: "getNickname",
            uid: "getUid",
            themeGroupList: "getThemeGroupList",
        }),
    },
    watch: {
    }
};
export default ComputedMixin;
