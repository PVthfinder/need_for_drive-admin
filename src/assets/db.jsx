import React from 'react';

export const menuItems = [
    {
        title: 'Карточка автомобиля',
        path: '/admin/cars/:id',
        img:
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.3213 2.10853C11.5596 2.34683 11.5596 2.73177 11.3213 2.97007L10.2031 4.08825L7.91174 1.7969L9.02992 0.678725C9.26822 0.440425 9.65317 0.440425 9.89147 0.678725L11.3213 2.10853ZM0.5 11.5V9.20865L7.25795 2.4507L9.5493 4.74205L2.79135 11.5H0.5Z" fill="#007BFF"/>
            </svg>,
    },
    {
        title: 'Список авто',
        path: '/admin/cars',
        img:
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.5 0.5V1.85714H5.83333V0.5H0.5ZM5.83333 4.57142H0.5V3.21428H5.83333V4.57142ZM0.5 7.28572H5.83333V5.92857H0.5V7.28572ZM0.5 10H5.83333V8.64285H0.5V10ZM12.5 0.5H7.16663V10H12.5V0.5Z" fill="#CACEDB"/>
            </svg>,
    },
    {
        title: 'Заказы',
        path: '/admin/orders',
        img:
            <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.5 0H1.5C0.95 0 0.505 0.45 0.505 1L0.5 9C0.5 9.55 0.945 10 1.495 10H7.5C8.05 10 8.5 9.55 8.5 9V3L5.5 0ZM6.5 7H5V8.5H4V7H2.5V6H4V4.5H5V6H6.5V7ZM5 0.75V3.5H7.75L5 0.75Z" fill="#CACEDB"/>
            </svg>,
    },
];
