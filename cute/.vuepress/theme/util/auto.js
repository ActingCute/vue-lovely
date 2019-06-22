import storage from '../storage'

const TOKEN_NAME = "ActingCuteTOKEN"

export function setToken(token) {
    console.log("token -- ",token)
    storage.setItem(TOKEN_NAME, token)
}

export function getToken() {
    return storage.getItem(TOKEN_NAME)
}