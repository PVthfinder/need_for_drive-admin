import {DEFAULT_HEADERS, LOGIN_URL, SYMBOLS} from './config';

// import cookie from 'cookie_js';

function createRandomString(size = 7) {
    let randomString = '';
    while (randomString.length <= size) {
        randomString += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    }
    return randomString;
}

function addHeaders(headers, options) {
    const newHeaders = options.headers ? {...options.headers, ...headers} : headers;
    return {...options, headers: newHeaders};
}

const doFetch = async (url, options = {}) => {
    const newOptions = addHeaders(DEFAULT_HEADERS, options);

    try {
        const response = await fetch(url, newOptions);
        return await response.json();
    } catch (err) {
        console.error('Возникла проблема с запросом: ', err);
        alert('Возникла проблема с запросом!');
        return '';
    }
};

export async function login(emailValue, passwordValue) {
    const salt = createRandomString(5, true);
    const basic = window.btoa(`${salt}:4cbcea96de`);

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
