import {DEFAULT_HEADERS, SECRET, LOGIN_URL} from './config';

// import cookie from 'cookie_js';

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
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${SECRET}`,
        },
        body: JSON.stringify({username: emailValue, password: passwordValue}),
        method: 'POST',
    };

    const {
        access_token: accessToken,
        refresh_token: refreshToken,
    } = await doFetch(LOGIN_URL, options);
    // cookie.set(ACCESS_TOKEN, accessToken);
    // cookie.set(REFRESH_TOKEN, refreshToken);
}
