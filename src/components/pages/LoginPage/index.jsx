import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InputTextField from '../../layouts/InputTextField';
import InputPasswordField from '../../layouts/InputPasswordField';
import Button from '../../layouts/Button';

import { login } from '../../../api';

import icon from '../../../assets/images/logo_icon.svg';

import './LoginPage.scss';

function LoginPage({setToken}) {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [isNoRegister, setIsNoRegister] = useState(false);

    const handleAuthClick = (evt) => {
        evt.preventDefault();

        login(emailValue, passwordValue)
            .then(() => {
                setToken(localStorage.getItem('access_token'));
                // history.push('/admin');
                // console.log(res.access_token, res.refresh_token);
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

                <InputTextField
                  inputValue={emailValue}
                  setInputValue={setEmailValue}
                  label="Почта"
                  placeholder="Введите почту"
                  isRequired
                />

                <InputPasswordField
                  inputValue={passwordValue}
                  setInputValue={setPasswordValue}
                  label="Пароль"
                  placeholder="Введите пароль"
                  isRequired
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
