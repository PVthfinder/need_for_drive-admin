import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function MenuItem({img, path, title}) {
    return (
        <Link
            to={path}
            className="menu__item"
        >
            {img}
            {title}
        </Link>
    );
}

MenuItem.propTypes = {
    img: PropTypes.string,
    path: PropTypes.string,
    title: PropTypes.string,
};

MenuItem.defaultProps = {
    img: '',
    path: '',
    title: '',
};

export default MenuItem;
