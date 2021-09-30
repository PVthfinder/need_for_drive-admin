import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import InputField from '../InputField';

import { userLogout } from '../../../store/user/actionCreators';

import avatarSrc from '../../../assets/images/avatar.jpg';

import './Header.scss';

function Header() {
    const [searchValue, setSearchValue] = useState('');
    const [isActiveDropdown, setIsActiveDropdown] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);

    const timerIdRef = useRef(null);

    const {name} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const dropdownIconClasses = classNames(
        'user_account__dropdown_icon',
        {active: isActiveDropdown},
    );

    const dropdownMenuClasses = classNames(
        'user_account__dropdown_menu',
        'dropdown_menu',
        {active: isActiveDropdown},
    );

    const handleDropdownClick = () => {
        setIsActiveDropdown((prevIsActiveDropdown) => (
            !prevIsActiveDropdown
        ));
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        dispatch(userLogout());
    };

    useEffect(() => {
        timerIdRef.current = setInterval(() => {
            setNotificationCount((prevCount) => prevCount + 1);
        }, 2000);
    }, notificationCount);

    const handleNotificationsClick = () => {
        setNotificationCount(0);
        clearInterval(timerIdRef.current);
    };

    return (
        <header className="page_header">
            <div className="page_header__search search">
                <span
                    className="search__search_btn"
                >
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.87336 8.80503H10.5057L14.5 12.8073L13.3073 14L9.30503 10.0057V9.37336L9.08891 9.14923C8.17639 9.93368 6.99171 10.4059 5.70297 10.4059C2.82933 10.4059 0.5 8.07662 0.5 5.20297C0.5 2.32933 2.82933 0 5.70297 0C8.57662 0 10.9059 2.32933 10.9059 5.20297C10.9059 6.49171 10.4337 7.67639 9.64923 8.58891L9.87336 8.80503ZM2.19702 5.30302C2.19702 7.29837 3.80773 8.90908 5.80308 8.90908C7.79844 8.90908 9.40914 7.29837 9.40914 5.30302C9.40914 3.30767 7.79844 1.69696 5.80308 1.69696C3.80773 1.69696 2.19702 3.30767 2.19702 5.30302Z" fill="#CACEDB"/>
                    </svg>
                </span>
                <InputField
                    type="search"
                    inputValue={searchValue}
                    setInputValue={setSearchValue}
                    placeholder="Поиск ..."
                />
            </div>
            <div
                className="page_header__notifications notifications"
                onClick={handleNotificationsClick}
                onKeyDown={handleNotificationsClick}
                role="button"
                tabIndex="0"
                aria-label="notifications count"
            >
                <span className="notifications__icon">
                    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.375 9.04949V14.3727L17.5 16.502V17.5667H0.5V16.502L2.625 14.3727V9.04949C2.625 5.77038 4.35687 3.04489 7.40625 2.32093V1.59697C7.40625 0.713313 8.11812 0 9 0C9.88188 0 10.5938 0.713313 10.5938 1.59697V2.32093C13.6325 3.04489 15.375 5.78103 15.375 9.04949ZM11.2667 18.7C11.2667 19.9467 10.2467 20.9667 9 20.9667C7.742 20.9667 6.73334 19.9467 6.73334 18.7H11.2667Z" fill="#818EA3"/>
                    </svg>
                </span>
                {notificationCount > 0 && <div className="notifications__count">{notificationCount}</div>}
            </div>
            <div
                className="page_header__user user_account"
                onClick={handleDropdownClick}
                onKeyDown={handleDropdownClick}
                role="button"
                tabIndex="0"
                aria-label="dropdown menu"
            >
                <img className="user_account__avatar" src={avatarSrc} alt="user_avatar" />
                <span className="user_account__name">{name}</span>
                <span
                    className={dropdownIconClasses}
                />
                <div className={dropdownMenuClasses}>
                    <ul className="dropdown_menu__list">
                        <li className="dropdown_menu__item">
                            <a
                                href="#!"
                                onClick={handleLogoutClick}
                            >
                                Выход
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
