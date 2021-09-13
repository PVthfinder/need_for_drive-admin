import React from 'react';
import {Link} from 'react-router-dom';

import InputTextField from '../../layouts/InputTextField';
import InputPasswordField from '../../layouts/InputPasswordField';
import Button from '../../layouts/Button';

import icon from '../../../assets/images/logo_icon.svg';

import './LoginPage.scss';

function index() {
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
                  label="Почта"
                  placeholder="Введите почту"
                />

                <InputPasswordField
                  label="Пароль"
                  placeholder="Введите пароль"
                />

                <div className="login_form__btns">
                    <Link to="#!">Запросить доступ</Link>
                    <Button
                        type="button"
                        title="Войти"
                        // onclick
                    />
                </div>
            </form>
        </div>
    );
}

export default index;
