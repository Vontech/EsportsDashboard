
import axios from 'axios'

const Endpoints = {
    USERS: '/api/users',
    LOGIN: '/oauth/token',
    LOGOUT: '/api/s/logout',
    PREFERENCES: 'api/s/preferences'
}

export default class EsportsDashboardApi {

    getBasicInstance() {
        return axios.create({
            headers: {
                'Authorization': 'Basic ZXNwb3J0cy1kYXNoYm9hcmQtY2xpZW50Ojk3SDdGNEZENzJKRjdFUFFMMEdBQ1ox',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    getBearerInstance() {
        return axios.create({
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
    
    createUser(username, email, password) {
        return axios.post(Endpoints.USERS, {
            username: username,
            email: email,
            password: password,
            passwordConf: password
        })
    }

    login(username, password) {

        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('grant_type', 'password');

        return this.getBasicInstance().post(Endpoints.LOGIN, params)
            .then(function (response) {
                storeAccessToken(response.data['access_token']);
                return;
            })
    }

    logout() {
        return this.getBearerInstance().post(Endpoints.LOGOUT)
            .then(() => deleteAccessToken())
    }

    isLoggedIn() {
        return localStorage.esportsAccessToken != null;
    }

    getPreferences() {
        return this.getBearerInstance().get(Endpoints.PREFERENCES)
    }

    savePreferences(newPrefs) {
        return this.getBearerInstance().post(Endpoints.PREFERENCES, {prefs: newPrefs}, {headers: {'Content-Type': 'application/json'}})
    }

}

function storeAccessToken(token) {
    localStorage.esportsAccessToken = token;
}

function deleteAccessToken(token) {
    localStorage.removeItem('esportsAccessToken');
}

function getAccessToken() {
    return localStorage.esportsAccessToken;
}