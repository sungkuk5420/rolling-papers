import { mapGetters } from "vuex";
let UtilMethodMixin = {
    methods: {
        getImgUrl(pic) {
            return require("assets/" + pic);
        },
        showLoading() {
            this.$q.loading.show();
        },
        hideLoading() {
            this.$q.loading.hide();
        },
        successMessage(message) {
            this.$q.notify({
                position: "top",
                timeout: 500,
                message,
                icon: "announcement"
            });
        },
        errorMessage(message) {
            this.$q.notify({
                position: "top",
                timeout: 500,
                message,
                icon: "announcement"
            });
        },
        createNowTime() {
            var today = new Date().valueOf(); // -> 정렬을 위해 타임스탬프로 저장.
            return today
        },
        convertedDateFormat(timestamp) {
            var today = new Date(timestamp) // -> 타임스탬프를 넣어주면 날짜로 변환
            today.setHours(today.getHours() + 9);
            return today.toISOString().replace('T', ' ').substring(0, 19)
        }
    }
};
export default UtilMethodMixin;
