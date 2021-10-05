import {
    DEFAULT_HEADERS,
    SECRET,
    LOGIN_URL,
    CHECK_URL,
    LOGOUT_URL,
    ITEMS_PER_PAGE,
    ORDERS_URL,
    API_DB_URL,
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

export async function getOrders(page) {
    const options = {
        headers: getAuthHeader(),
    };

    let filterUrl = ORDERS_URL;

    filterUrl = page ? `${filterUrl}?page=${page - 1}&limit=${ITEMS_PER_PAGE}` : filterUrl;

    const response = await doFetch(filterUrl, options);
    return response;
}

export async function getSingleOrder(id) {
    const options = {
        headers: getAuthHeader(),
    };

    const response = await doFetch(`${ORDERS_URL}/${id}`, options);
    return response;
}

export async function changeOrder(orderObj) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
        },
        method: 'PUT',
        body: JSON.stringify(orderObj),
    };

    const response = await doFetch(`${ORDERS_URL}/${orderObj.id}`, options);
    return response;
}

export async function deleteOrder(id) {
    const options = {
        headers: getAuthHeader(),
        method: 'DELETE',
    };

    const response = await doFetch(`${ORDERS_URL}/${id}`, options);
    return response;
}

export async function getEntity(entityName) {
    const options = {
        headers: getAuthHeader(),
    };

    const response = await doFetch(`${API_DB_URL}/${entityName}`, options);
    return response;
}
