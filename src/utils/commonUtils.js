import {SYMBOLS} from '../constants/commonConstants';

export function createRandomString(size = 7) {
    let randomString = '';
    while (randomString.length <= size) {
        randomString += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    }
    return randomString;
}

export function setSearchParams(paramsArr) {
    const searchParams = new URLSearchParams();
    paramsArr.forEach((key) => {
        if (key.paramValue !== null) {
            if (key.paramName === 'dateFrom') {
                searchParams.set('dateFrom[$gt]', key.paramValue);
            } else {
                searchParams.set(key.paramName, key.paramValue);
            }
        } else {
            searchParams.delete(key.paramName);
        }
    });

    return searchParams;
}

export function getNameBySearchParam(location, searchParam, paramArr) {
    const searchParams = new URLSearchParams(location.search);
    const paramId = searchParams.get(searchParam);
    const paramObj = paramArr ? paramArr.find((item) => item.id === paramId) : null;

    return paramObj ?? null;
}
