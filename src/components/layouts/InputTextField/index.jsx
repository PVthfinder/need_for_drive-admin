import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './InputTextField.scss';

function InputTextField({
    inputValue,
    setInputValue,
    label,
    placeholder,
    isRequired,
}) {
    return (
        <div className="input_field">
            <label htmlFor={`input_${label}`}>{label}</label>

            <div className="input_field__value">
                <input
                    type="text"
                    name={label}
                    id={`input_${label}`}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required={isRequired}
                />
            </div>
        </div>
    );
}

InputTextField.propTypes = {
    inputValue: PropTypes.string,
    setInputValue: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
};

InputTextField.defaultProps = {
    inputValue: '',
    setInputValue: null,
    label: '',
    placeholder: '',
    isRequired: false,
};

export default InputTextField;
