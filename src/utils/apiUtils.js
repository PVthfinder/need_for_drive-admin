import {
    DEFAULT_HEADERS,
    SECRET,
    LOGIN_URL,
    CHECK_URL,
    LOGOUT_URL,
    ITEMS_PER_PAGE,
    API_DB_URL,
} from '../constants/fetchConstants';

import { createRandomString } from './commonUtils';

function addHeaders(headers, options) {
    const newHeaders = options.headers ? {...options.headers, ...headers} : headers;
    return { ...options, headers: newHeaders};
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

const getAuthHeader = () => {
    const accessToken = localStorage.getItem('access_token');
    return {Authorization: `Bearer ${accessToken}`};
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

export async function checkUser() {
    const options = {
        headers: getAuthHeader(),
    };

    const response = await doFetch(CHECK_URL, options);
    return response;
}

export async function logout() {
    const options = {
        headers: getAuthHeader(),
        method: 'POST',
    };

    const response = await doFetch(LOGOUT_URL, options);
    return response;
}

export async function getEntityList(entityName, searchParamsStr, page) {
    const options = {
        headers: getAuthHeader(),
    };

    let url = `${API_DB_URL}/${entityName}`;

    if (searchParamsStr && searchParamsStr.length) {
        url += `${searchParamsStr}`;
        url = page ? `${url}&page=${page - 1}&limit=${ITEMS_PER_PAGE}` : url;
    } else {
        url = page ? `${url}?page=${page - 1}&limit=${ITEMS_PER_PAGE}` : url;
    }

    const response = await doFetch(url, options);
    return response;
}

export async function getSingleEntity(entityName, id = '') {
    const options = {
        headers: getAuthHeader(),
    };

    const response = await doFetch(`${API_DB_URL}/${entityName}/${id}`, options);
    return response;
}

export async function createEntity(entityName, entityObj) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        },
        body: JSON.stringify(entityObj),
        method: 'POST',
    };

    const response = await doFetch(`${API_DB_URL}/${entityName}`, options);
    return response;
}

export async function changeEntity(entityName, entityObj) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        },
        method: 'PUT',
        body: JSON.stringify(entityObj),
    };

    const response = await doFetch(`${API_DB_URL}/${entityName}/${entityObj.id}`, options);
    return response;
}

export async function deleteEntity(entityName, id) {
    const options = {
        headers: getAuthHeader(),
        method: 'DELETE',
    };

    const response = await doFetch(`${API_DB_URL}/${entityName}/${id}`, options);
    return response;
}
