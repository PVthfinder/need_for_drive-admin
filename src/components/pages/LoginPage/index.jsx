import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InputField from '../../layouts/InputField';
import Button from '../../layouts/Button';

import { login } from '../../../api';

import icon from '../../../assets/images/logo_icon.svg';

import './LoginPage.scss';

function LoginPage({setToken}) {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isNoRegister, setIsNoRegister] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    const handleAuthClick = (evt) => {
        evt.preventDefault();

        if (!emailValue.length) setIsEmailError(true);
        if (!passwordValue.length) setIsPasswordError(true);
        if (isEmailError || isPasswordError) return;

        login(emailValue, passwordValue)
            .then((res) => {
                if (res.access_token) localStorage.setItem('access_token', res.access_token);
                if (res.refresh_token) localStorage.setItem('refresh_token', res.refresh_token);
                setToken(res.access_token ?? null);
            });
            // .catch(err => {
            //     console.error('Неверный логин или пароль! ', err);
            //     alert('Неверный логин или пароль!');
            // });
    };

    const handleRegisterClick = (evt) => {
        evt.preventDefault();
        setIsNoRegister(true);
    };

    const registerErrorClasses = classNames(
        'login_form__register_error',
        {active: isNoRegister},
    );

    useEffect(() => {
        if (isNoRegister) {
            setTimeout(() => {
                setIsNoRegister(false);
            }, 2000);
        }
    }, [isNoRegister]);

    return (
        <div className="login">
            <div className="login__head">
                <div className="login__icon">
                    <img src={icon} alt="icon" />
                </div>
                <h1 className="login__heading">Need for drive</h1>
            </div>

            <form className="login_form">
                <h2 className="login_form__heading">Вход</h2>

                <InputField
                  type="text"
                  inputValue={emailValue}
                  setInputValue={setEmailValue}
                  label="Почта"
                  placeholder="Введите почту"
                  isError={isEmailError}
                  setIsError={setIsEmailError}
                />

                <InputField
                  type="password"
                  inputValue={passwordValue}
                  setInputValue={setPasswordValue}
                  label="Пароль"
                  placeholder="Введите пароль"
                  isError={isPasswordError}
                  setIsError={setIsPasswordError}
                />

                <div className="login_form__btns">
                    <a
                        href="#!"
                        className="login_form__register"
                        onClick={handleRegisterClick}
                    >
                        Запросить доступ
                    </a>
                    <div className={registerErrorClasses}>
                        Извините, регистрация временно недоступна...
                    </div>
                    <Button
                        type="button"
                        title="Войти"
                        onclick={handleAuthClick}
                    />
                </div>
            </form>
        </div>
    );
}

LoginPage.propTypes = {
    setToken: PropTypes.func,
};

LoginPage.defaultProps = {
    setToken: null,
};

export default LoginPage;
