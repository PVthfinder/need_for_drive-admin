const API_KEY = '5e25c641099b810b946c5d5b';
const SECRET = '4cbcea96de';

const DOMAIN_URL = 'https://api-factory.simbirsoft1.com';

const LOGIN_URL = `${DOMAIN_URL}/api/auth/login`;
const CHECK_URL = `${DOMAIN_URL}/api/auth/check`;
const LOGOUT_URL = `${DOMAIN_URL}/api/auth/logout`;

const ITEMS_PER_PAGE = 10;

const ORDERS_URL = `${DOMAIN_URL}/api/db/order`;

const STATUSES_URL = `${DOMAIN_URL}/api/db/orderStatus`;

const DEFAULT_HEADERS = {
    'X-Api-Factory-Application-Id': API_KEY,
};

export {
    DOMAIN_URL,
    DEFAULT_HEADERS,
    SECRET,
    LOGIN_URL,
    CHECK_URL,
    LOGOUT_URL,
    ITEMS_PER_PAGE,
    ORDERS_URL,
    STATUSES_URL,
};
