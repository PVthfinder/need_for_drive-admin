import React from 'react';
import {Link} from 'react-router-dom';

import MenuItem from './MenuItem';

import icon from '../../../assets/images/logo_icon.svg';

import {menuItems} from '../../../constants/commonConstants';

import './Menu.scss';

function Menu() {
    return (
        <nav className="menu">
            <Link
            to="/admin"
                className="menu__head"
            >
                <div className="menu__icon">
                    <img src={icon} alt="icon" />
                </div>
                <h1 className="menu__heading">Need for drive</h1>
            </Link>
            <div className="menu__items">
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.title}
                        img={item.img}
                        path={item.path}
                        title={item.title}
                    />
                ))}
            </div>
        </nav>
    );
}

export default Menu;
