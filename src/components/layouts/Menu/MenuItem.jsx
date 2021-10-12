import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

function MenuItem({img, path, title}) {
    return (
        <NavLink
            exact
            to={path}
            className="menu__item"
            activeClassName="menu__active_menu_item"
        >
            {img}
            {title}
        </NavLink>
    );
}

MenuItem.propTypes = {
    img: PropTypes.objectOf(PropTypes.any),
    path: PropTypes.string,
    title: PropTypes.string,
};

MenuItem.defaultProps = {
    img: '',
    path: '',
    title: '',
};

export default MenuItem;
