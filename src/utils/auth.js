/**
 * Created by zhuyiming on 2016/5/7.
 */
const TOKEN_NAME = 'TOKEN'
const UID = 'UID'

module.exports = {
    saveToken(token) {
        localStorage.setItem(TOKEN_NAME, token)
    },

    getToken() {
        return localStorage.getItem(TOKEN_NAME)
    },

    getUid() {
        return localStorage.getItem(UID)
    },

    getExp() {
        return localStorage.getItem(LOGINTIME)
    },

    login(token, uid) {
        localStorage.setItem(TOKEN_NAME, token)
        localStorage.setItem(UID, uid)
    },

    logout() {
        console.log('erase token')
        localStorage.clear()
    },

    loggedIn(token) {
        return localStorage.setItem(TOKEN_NAME, token)
    },

    onChange() {}
}