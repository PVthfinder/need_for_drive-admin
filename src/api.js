import {
    DEFAULT_HEADERS,
    SECRET,
    LOGIN_URL,
    CHECK_URL,
    LOGOUT_URL,
} from './constants/fetchConstants';
import {SYMBOLS} from './constants/commonConstants';

function createRandomString(size = 7) {
    let randomString = '';
    while (randomString.length <= size) {
        randomString += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    }
    return randomString;
}

function addHeaders(headers, options) {
    const newHeaders = options.headers ? {...options.headers, ...headers} : headers;
    return {headers: newHeaders, ...options};
}

const doFetch = async (url, options = {}) => {
    const newOptions = addHeaders(DEFAULT_HEADERS, options);

    let response;

    try {
        response = await fetch(url, newOptions);
    } catch (err) {
        console.error('Возникла проблема с запросом: ', err);
        return Promise.reject(new Error(err.message));
    }

    if (!response.ok) {
        const text = await response.text();
        return Promise.reject({httpStatus: response.status, httpText: text});
    }

    return response.json();
};

export async function login(emailValue, passwordValue) {
    const salt = createRandomString(5, true);
    const basic = window.btoa(`${salt}:${SECRET}`);

    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${basic}`,
        },
        body: JSON.stringify({username: emailValue, password: passwordValue}),
        method: 'POST',
    };

    const response = await doFetch(LOGIN_URL, options);
    return {
        access_token: response.access_token,
        refresh_token: response.refresh_token,
    };
}

export async function checkUser(accessToken) {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const response = await doFetch(CHECK_URL, options);
    return response;
}

export async function logout(accessToken) {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
    };

    const response = await doFetch(LOGOUT_URL, options);
    return response;
}
