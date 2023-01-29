import { T } from "./types";

export const mutations = {
  [T.SET_LOGIN_USER_INFO] (state, { email, nickname, uid, loginType }) {
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
  }
};
