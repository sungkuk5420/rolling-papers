import { T } from "./types";

export const mutations = {
	[T.SET_LOGIN_USER_INFO](state, { email, nickname, uid, loginType }) {
		console.log("mutation SET_LOGIN_USER_INFO", email, nickname, uid, loginType)
		if (email || email === null) {
			state.email = email;
		}
		if (nickname || nickname === null) {
			state.nickname = nickname;
		}
		if (uid || uid === null) {
			state.uid = uid;
		}
		if (loginType || loginType === null) {
			state.loginType = loginType;
		}
	},
	[T.SET_LOGIN_GUIDE_LAYER](state, data) {
		console.log("mutation SET_LOGIN_GUIDE_LAYER", data)
		state.loginGuideLayer = data;
	},
	[T.CHANGE_HEADER_TITLE](state, data) {
		console.log("mutation CHANGE_HEADER_TITLE", data)
		state.headerTitle = data;
	},
	[T.SET_THEME_GROUP_LIST](state, data) {
		console.log("mutation SET_THEME_GROUP_LIST", data)
		state.themeGroupList = data;
	}
};
