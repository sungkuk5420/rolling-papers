import { mapGetters } from "vuex";
let ComputedMixin = {
    computed: {
        ...mapGetters({
            email: "getEmail",
            nickname: "getNickname",
            uid: "getUid",
            themeGroupList: "getThemeGroupList",
            loginGuideLayer: "getLoginGuideLayer",
        }),
    },
    watch: {
        loginGuideLayer(value) {
            if (!value) {
                localStorage.removeItem('groupUid');
                localStorage.removeItem('groupName');
                localStorage.removeItem('groupCode');
                localStorage.removeItem('selectTheme');
            }
        }
    }
};
export default ComputedMixin;
