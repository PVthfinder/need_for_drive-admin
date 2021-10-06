import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import {
    setEmailText,
    setPasswordText,
    setEmailError,
    setPasswordError,
    setIsAuthError,
} from '../../../store/login/actionCreators';

import InputField from '../../layouts/InputField';
import Button from '../../layouts/Button';
import RegisterLink from '../../layouts/RegisterLink';

import { login, checkUser } from '../../../utils/apiUtils';
import { userLogin, userCheck } from '../../../store/user/actionCreators';

import icon from '../../../assets/images/logo_icon.svg';

import './LoginPage.scss';

function LoginPage() {
    const {
        email,
        password,
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
                dispatch(userLogin());
                checkUser(res.access_token)
                    .then((response) => dispatch(userCheck(response.username)));
            })
            .catch((err) => {
                if (err.httpStatus === 401) {
                    console.error('Неверный логин или пароль! ', err);
                    dispatch(setIsAuthError(true));
                }
            });
    };

    const authErrorClasses = classNames(
        'login_form__auth_error',
        {active: isAuthError},
    );

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
                    <RegisterLink/>
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

export default LoginPage;
