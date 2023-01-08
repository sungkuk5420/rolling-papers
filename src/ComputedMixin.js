import { mapGetters } from "vuex";
let ComputedMixin = {
    computed: {
        ...mapGetters({
            email: "getEmail",
            nickname: "getNickname",
            uid: "getUid",
        }),
    },
    watch: {
    }
};
export default ComputedMixin;
