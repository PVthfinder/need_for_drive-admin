import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { setIsNoRegister } from '../../../store/login/actionCreators';

import './RegisterLink.scss';

function RegisterLink() {
    const { isNoRegister } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const handleRegisterClick = (evt) => {
        evt.preventDefault();
        dispatch(setIsNoRegister(true));
    };

    const registerErrorClasses = classNames(
        'login_form__register_error',
        {active: isNoRegister},
    );

    useEffect(() => {
        if (isNoRegister) {
            setTimeout(() => {
                dispatch(setIsNoRegister(false));
            }, 2000);
        }
    }, [isNoRegister]);

    return (
        <div>
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
        </div>
    );
}

export default RegisterLink;
