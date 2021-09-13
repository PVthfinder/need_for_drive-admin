import React, {useState} from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

// import './InputField.scss';

function InputTextField({
    // inputValue,
    // setInputValue,
    label,
    placeholder,
}) {
    const [passwordValue, setPasswordValue] = useState('');
    const [activeInput, setActiveInput] = useState(false);

    // const choiseHandler = (item) => {
    //     setInputValue(item.name);
    //     setActiveInput(false);
    // }

    return (
        <div className="input_field">
            <label htmlFor={`input_${label}`}>{label}</label>

            <div className="input_field__value">
                <input
                    type="password"
                    name={label}
                    id={`input_${label}`}
                    placeholder={placeholder}
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    onFocus={() => setActiveInput(true)}
                    autoComplete="off"
                />
            </div>
        </div>
    );
}

InputTextField.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
};

InputTextField.defaultProps = {
    label: '',
    placeholder: '',
};

export default InputTextField;
