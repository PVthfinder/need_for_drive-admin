// import { useLocation } from 'react-router-dom';

import {SYMBOLS} from '../constants/commonConstants';

// const location = useLocation();

export function createRandomString(size = 7) {
    let randomString = '';
    while (randomString.length <= size) {
        randomString += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    }
    return randomString;
}

const searchParams = new URLSearchParams();

export function setSearchParams(paramsArr) {
    paramsArr.forEach((key) => {
        if (key.paramValue !== null) {
            searchParams.set(key.paramName, key.paramValue);
        } else {
            searchParams.delete(key.paramName);
        }
    });

    return searchParams;
}

export function getSearchParam(paramName) {
    const paramVal = searchParams.get(paramName);

    return paramVal;
}
