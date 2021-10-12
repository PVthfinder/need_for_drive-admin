import {SYMBOLS} from '../constants/commonConstants';
import { DOMAIN_URL } from '../constants/fetchConstants';

export function createRandomString(size = 7) {
    let randomString = '';
    while (randomString.length <= size) {
        randomString += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    }
    return randomString;
}

export const getImgSrc = (entityObj) => {
    let src = '';

    if (entityObj && entityObj.thumbnail) {
        src = entityObj.thumbnail.path.includes('data')
            ? entityObj.thumbnail.path
            : `${DOMAIN_URL}${entityObj.thumbnail.path}`;
    } else {
        src = 'https://via.placeholder.com/138x63';
    }

    return src;
};

export const replaceDateFormat = (date) => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    const newDate = new Date(date);
    const dateStr = newDate.toLocaleString('ru', options);
    return dateStr.replace(/,/g, '');
};

export function setSearchParams(paramsArr) {
    const searchParams = new URLSearchParams();
    paramsArr.forEach((key) => {
        if (key.paramValue !== null) {
            if (!key.paramName.includes('Id')) {
                searchParams.set(`${key.paramName}[$gt]`, key.paramValue);
            } else {
                searchParams.set(key.paramName, key.paramValue);
            }
        } else {
            searchParams.delete(key.paramName);
        }
    });

    return searchParams;
}

export function getSearchParam(location, searchParam) {
    const searchParams = new URLSearchParams(location.search);
    const paramId = searchParams.get(searchParam);
    return paramId;
}

export const changeNumberFormat = (str) => {
    if (str) {
        const strArr = str.split('');
        strArr[0] += ' ';
        strArr[3] += ' ';
        strArr[5] = strArr[5] ? `${strArr[5]} ` : null;
        return strArr.join('');
    }
    return '';
};
