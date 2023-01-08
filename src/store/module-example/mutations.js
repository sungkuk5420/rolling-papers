import { T } from "./types";

export const mutations = {
  [T.SET_LOGIN_USER_INFO] (state, { email, nickname, uid }) {
    console.log("mutation SET_LOGIN_USER_INFO", email, nickname, uid)
    if (email) {
      state.email = email;
    }
    if (nickname) {
      state.nickname = nickname;
    }
    if (uid) {
      state.uid = uid;
    }
  }
};
