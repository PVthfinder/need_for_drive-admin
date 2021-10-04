import React from 'react';
import PropTypes from 'prop-types';

import './Checkbox.scss';

function Checkbox({
    label,
    name,
    value,
    isReadOnly,
    setCheckbox,
}) {
    const applyAdditionalOption = (optionName) => {
        if (setCheckbox) setCheckbox(optionName);
    };

    return (
        <div className="checkbox">
            <input
                readOnly={isReadOnly}
                name={name}
                type="checkbox"
                id={name}
                value={value}
                checked={value}
                onChange={() => applyAdditionalOption(name)}
            />
            <label htmlFor={name}>
                {label}
            </label>
        </div>
    );
}

Checkbox.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    setCheckbox: PropTypes.func,
};

Checkbox.defaultProps = {
    label: '',
    name: '',
    value: false,
    isReadOnly: false,
    setCheckbox: null,
};

export default Checkbox;
