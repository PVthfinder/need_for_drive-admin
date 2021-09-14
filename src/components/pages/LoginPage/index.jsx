import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import InputTextField from '../../layouts/InputTextField';
import InputPasswordField from '../../layouts/InputPasswordField';
import Button from '../../layouts/Button';

import { login } from '../../../api';

import icon from '../../../assets/images/logo_icon.svg';

import './LoginPage.scss';

function LoginPage() {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const history = useHistory();

    const handleAuthClick = (evt) => {
        evt.preventDefault();

        login(emailValue, passwordValue)
            .then(() => {
                history.push('/admin');
            });
            // .catch(err => {
            //     console.error('Неверный логин или пароль! ', err);
            //     alert('Неверный логин или пароль!');
            // });
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
                    <Link to="#!">Запросить доступ</Link>
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

export default LoginPage;
