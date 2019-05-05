//gist
import gist from '../util/gist'
import {
    Service
} from './index'

import Gist from '../util/config'

import store from '../store'

export function GistGetToken() {
    let name = Gist.name
    if (name) {
        let url = Service.GistGetToken
        url = url.replace(":name", name)
        return gist({
            url,
            method: 'GET'
        })
    } else {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                reject('no name')
            }, 500);
        });
    }
}

export function GistCreated() {
    return gist({
        url: Service.GistCreated,
        method: 'POST',
        data: {
            "description": "lovely json",
            "public": true,
            "files": {
                "lovely.json": {
                    "content": "{\"twitter\": [{\"user\": \"ActingCute酱\",\"time\": \"2019-05-05 13:14:00\",\"content\":\"hello world\"}]}"
                }
            }
        }
    })
}

export function GistModify(data) {
    let token = store.getters.gist_token_data
    if (token) {
        return gist({
            url: Service.Gist + token,
            method: 'GET',
            data
        })
    } else {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                reject('no token')
            }, 500);
        });
    }
}

export function GistGetData() {
    let token = store.getters.gist_token_data
    if (token) {
        return gist({
            url: Service.Gist + token,
            method: 'GET'
        })
    } else {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                reject('no token')
            }, 500);
        });
    }
}