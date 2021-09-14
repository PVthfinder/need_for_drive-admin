import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Button.scss';

function Button({type, title, color, location, onclick}) {
    const btnClasses = classNames(
        'btn',
        `btn--${location}`,
        {[`btn--${color}`]: color},
    );

    return (
        <input
            type={type}
            value={title}
            className={btnClasses}
            onClick={onclick}
        />
    );
}

Button.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    location: PropTypes.string,
    onclick: PropTypes.func,
};

Button.defaultProps = {
    type: '',
    title: '',
    color: '',
    location: '',
    onclick: null,
};

export default Button;
