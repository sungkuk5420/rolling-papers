import { T } from "./types";
import { ajaxActions } from "./ajaxActions";
import { firestoreAction } from 'vuexfire'
import User from '../../models/User.js'

export const actions = {
    [T.AJAX_ACTION]({ commit }, { data, cb }) {
        console.log(`store action [T.AJAX_ACTION] joinUser = ${data}`);
        ajaxActions.joinUser(
            data,
            results => {
                console.log(`action / AJAX_ACTION / success`);
                console.log(" reults=", results);
                if (cb) {
                    cb(results);
                }
            },
            res => {
                console.log(`action / AJAX_ACTION / error`, res);
                commit(T.AJAX_ACTION);
            }
        );
    },
    [T.ACTION]({ commit }, { data }) {
        console.log(`store action [T.ACTION] data`);
        console.log(data);
        commit(T.ACTION, data);
    },
    [T.SET_LOGIN_USER_INFO]({ commit }, { email = "", nickname = "", uid = "", loginType = "" }) {
        console.log(`store action [T.SET_LOGIN_USER_INFO] email, nickname uid`);
        console.log(email, nickname, uid);
        commit(T.SET_LOGIN_USER_INFO, { email, nickname, uid, loginType });
    },
    [T.SET_LOGIN_GUIDE_LAYER]({ commit }, data) {
        console.log(`store SET_LOGIN_GUIDE_LAYER [T.SET_LOGIN_GUIDE_LAYER] data`);
        console.log(data);
        commit(T.SET_LOGIN_GUIDE_LAYER, data);
    },
    [T.CHANGE_HEADER_TITLE]({ commit }, data) {
        console.log(`store CHANGE_HEADER_TITLE [T.CHANGE_HEADER_TITLE] data`);
        console.log(data);
        commit(T.CHANGE_HEADER_TITLE, data);
    },
};
