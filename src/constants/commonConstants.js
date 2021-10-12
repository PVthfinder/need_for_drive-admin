/* eslint-disable react/jsx-filename-extension */ // ошибка линтера

import React from 'react';

export const SYMBOLS = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';

export const MENU_ITEMS = [
    {
        title: 'Карточка автомобиля',
        path: '/admin/createCar',
        img:
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.3213 2.10853C11.5596 2.34683 11.5596 2.73177 11.3213 2.97007L10.2031 4.08825L7.91174 1.7969L9.02992 0.678725C9.26822 0.440425 9.65317 0.440425 9.89147 0.678725L11.3213 2.10853ZM0.5 11.5V9.20865L7.25795 2.4507L9.5493 4.74205L2.79135 11.5H0.5Z" fill="#007BFF"/>
            </svg>,
    },
    {
        title: 'Список авто',
        path: '/admin/car',
        img:
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.5 0.5V1.85714H5.83333V0.5H0.5ZM5.83333 4.57142H0.5V3.21428H5.83333V4.57142ZM0.5 7.28572H5.83333V5.92857H0.5V7.28572ZM0.5 10H5.83333V8.64285H0.5V10ZM12.5 0.5H7.16663V10H12.5V0.5Z" fill="#CACEDB"/>
            </svg>,
    },
    {
        title: 'Заказы',
        path: '/admin/order',
        img:
            <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.5 0H1.5C0.95 0 0.505 0.45 0.505 1L0.5 9C0.5 9.55 0.945 10 1.495 10H7.5C8.05 10 8.5 9.55 8.5 9V3L5.5 0ZM6.5 7H5V8.5H4V7H2.5V6H4V4.5H5V6H6.5V7ZM5 0.75V3.5H7.75L5 0.75Z" fill="#CACEDB"/>
            </svg>,
    },
    {
        title: 'Пункты выдачи',
        path: '/admin/point',
        img:
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.8949 2H2.60538C1.99749 2 1.50012 2.5 1.50012 3.11111V4.77778H12.0001V3.11111C12.0001 2.5 11.5028 2 10.8949 2ZM10.8947 12H9.23682V5.88889H12V10.8889C12 11.5 11.5026 12 10.8947 12ZM8.13157 5.9H5.36841V12H8.13157V5.9ZM2.60526 12C1.99737 12 1.5 11.5 1.5 10.8889V5.88889H4.26316V12H2.60526Z" fill="#CACEDB"/>
            </svg>,
    },
    {
        title: 'Новый пункт выдачи',
        path: '/admin/createPoint',
        img:
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.3213 2.10853C11.5596 2.34683 11.5596 2.73177 11.3213 2.97007L10.2031 4.08825L7.91174 1.7969L9.02992 0.678725C9.26822 0.440425 9.65317 0.440425 9.89147 0.678725L11.3213 2.10853ZM0.5 11.5V9.20865L7.25795 2.4507L9.5493 4.74205L2.79135 11.5H0.5Z" fill="#007BFF"/>
            </svg>,
    },
    {
        title: 'Категории авто',
        path: '/admin/category',
        img:
            <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.17647 5.11538H0.5V0.5H4.17647V5.11538ZM4.17647 10.5H0.5V5.88461H4.17647V10.5ZM4.91174 10.5H8.58821V5.88461H4.91174V10.5ZM13 10.5H9.32349V5.88461H13V10.5ZM4.91174 5.11538H8.58821V0.5H4.91174V5.11538ZM9.32349 5.11538V0.5H13V5.11538H9.32349Z" fill="#CACEDB"/>
            </svg>,
    },
    {
        title: 'Новая категория',
        path: '/admin/createCategory',
        img:
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.3213 2.10853C11.5596 2.34683 11.5596 2.73177 11.3213 2.97007L10.2031 4.08825L7.91174 1.7969L9.02992 0.678725C9.26822 0.440425 9.65317 0.440425 9.89147 0.678725L11.3213 2.10853ZM0.5 11.5V9.20865L7.25795 2.4507L9.5493 4.74205L2.79135 11.5H0.5Z" fill="#007BFF"/>
            </svg>,
    },
    {
        title: 'Список городов',
        path: '/admin/city',
        img:
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.5 0.5V1.85714H5.83333V0.5H0.5ZM5.83333 4.57142H0.5V3.21428H5.83333V4.57142ZM0.5 7.28572H5.83333V5.92857H0.5V7.28572ZM0.5 10H5.83333V8.64285H0.5V10ZM12.5 0.5H7.16663V10H12.5V0.5Z" fill="#CACEDB"/>
            </svg>,
    },
    {
        title: 'Новый город',
        path: '/admin/createCity',
        img:
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.3213 2.10853C11.5596 2.34683 11.5596 2.73177 11.3213 2.97007L10.2031 4.08825L7.91174 1.7969L9.02992 0.678725C9.26822 0.440425 9.65317 0.440425 9.89147 0.678725L11.3213 2.10853ZM0.5 11.5V9.20865L7.25795 2.4507L9.5493 4.74205L2.79135 11.5H0.5Z" fill="#007BFF"/>
            </svg>,
    },
];

const now = Date.now();
const dayMs = 1000 * 60 * 60 * 24;
const weekMs = dayMs * 7;
const monthMs = dayMs * 30;
const yearMs = dayMs * 365;

export const PERIODS = [
    {name: 'За неделю', dateFrom: now - weekMs},
    {name: 'За месяц', dateFrom: now - monthMs},
    {name: 'За год', dateFrom: now - yearMs},
    {name: 'За сутки', dateFrom: now - dayMs},
];

export const PRELOADER_ITEMS_ARR = [1, 2, 3, 4, 5];
