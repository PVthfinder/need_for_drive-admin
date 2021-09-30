import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './InputField.scss';

function InputField({
    type,
    inputValue,
    setInputValue,
    label,
    placeholder,
    isError,
    setIsError,
}) {
    const inputFieldClasses = classNames(
        'input_field__value',
        {is_error: isError},
    );

    const inputError = classNames(
        'input_field__error',
        {active: isError},
    );

    const handleInputChange = (value) => {
        setInputValue(value);
        if (value.length && setIsError) setIsError(false);
    };

    return (
        <div className="input_field">
            <label htmlFor={`input_${label}`}>{label}</label>

            <div className={inputFieldClasses}>
                <input
                    type={type}
                    name={label}
                    id={`input_${label}`}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(evt) => handleInputChange(evt.target.value)}
                />
                <div className={inputError}>
                    Обязательное поле
                </div>
            </div>
        </div>
    );
}

InputField.propTypes = {
    type: PropTypes.string,
    inputValue: PropTypes.string,
    setInputValue: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    isError: PropTypes.bool,
    setIsError: PropTypes.func,
};

InputField.defaultProps = {
    type: '',
    inputValue: '',
    setInputValue: null,
    label: '',
    placeholder: '',
    isError: false,
    setIsError: null,
};

export default InputField;
