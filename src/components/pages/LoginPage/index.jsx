import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
    setEmailText,
    setPasswordText,
    setEmailError,
    setPasswordError,
    setIsNoRegister,
    setIsAuthError,
} from '../../../store/login/actionCreators';

import InputField from '../../layouts/InputField';
import Button from '../../layouts/Button';

import { login } from '../../../api';

import icon from '../../../assets/images/logo_icon.svg';

import './LoginPage.scss';

function LoginPage({setToken}) {
    const {
        email,
        password,
        isNoRegister,
        isAuthError,
    } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const handleAuthClick = (evt) => {
        evt.preventDefault();

        if (!email.emailValue.length) dispatch(setEmailError(true));
        if (!password.passwordValue.length) dispatch(setPasswordError(true));
        if (!email.emailValue.length || !password.passwordValue.length) return;

        login(email.emailValue, password.passwordValue)
            .then((res) => {
                if (res.access_token) localStorage.setItem('access_token', res.access_token);
                if (res.refresh_token) localStorage.setItem('refresh_token', res.refresh_token);
                setToken(res.access_token ?? null);
            })
            .catch((err) => {
                if (err.httpStatus === 401) {
                    console.error('Неверный логин или пароль! ', err);
                    dispatch(setIsAuthError(true));
                }
            });
    };

    const handleRegisterClick = (evt) => {
        evt.preventDefault();
        dispatch(setIsNoRegister(true));
    };

    const registerErrorClasses = classNames(
        'login_form__register_error',
        {active: isNoRegister},
    );

    const authErrorClasses = classNames(
        'login_form__auth_error',
        {active: isAuthError},
    );

    useEffect(() => {
        if (isNoRegister) {
            setTimeout(() => {
                dispatch(setIsNoRegister(false));
            }, 2000);
        }
    }, [isNoRegister]);

    useEffect(() => {
        if (isAuthError) {
            setTimeout(() => {
                dispatch(setIsAuthError(false));
            }, 3000);
        }
    }, [isAuthError]);

    const setEmailValue = (emailValue) => {
        dispatch(setEmailText(emailValue));
    };

    const setPasswordValue = (passwordValue) => {
        dispatch(setPasswordText(passwordValue));
    };

    const setIsEmailError = (isError) => {
        dispatch(setEmailError(isError));
    };

    const setIsPasswordError = (isError) => {
        dispatch(setPasswordError(isError));
    };

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
                  inputValue={email.emailValue}
                  setInputValue={setEmailValue}
                  label="Почта"
                  placeholder="Введите почту"
                  isError={email.isEmailError}
                  setIsError={setIsEmailError}
                />

                <InputField
                  type="password"
                  inputValue={password.passwordValue}
                  setInputValue={setPasswordValue}
                  label="Пароль"
                  placeholder="Введите пароль"
                  isError={password.isPasswordError}
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

                <div className={authErrorClasses}>
                    Неверный логин или пароль!
                </div>
            </form>
        </div>
    );
}

LoginPage.propTypes = {
    // email: PropTypes.string,
    // password: PropTypes.string,
    // isNoRegister: PropTypes.bool,
    // isAuthError: PropTypes.bool,
    setToken: PropTypes.func,
};

LoginPage.defaultProps = {
    // email: '',
    // password: '',
    // isNoRegister: false,
    // isAuthError: false,
    setToken: null,
};

export default LoginPage;
