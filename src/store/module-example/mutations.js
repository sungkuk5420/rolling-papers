import { T } from "./types";

export const mutations = {
  [T.SET_LOGIN_USER_INFO] (state, { email, nickname, uid }) {
    console.log("mutation SET_LOGIN_USER_INFO", email, nickname, uid)
    if (email || email === null) {
      state.email = email;
    }
    if (nickname || nickname === null) {
      state.nickname = nickname;
    }
    if (uid || uid === null) {
      state.uid = uid;
    }
  }
};
