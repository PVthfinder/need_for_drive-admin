import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '../layouts/Button';

import { unsetRequestError } from '../../store/requestError/actionCreators';

import './RequestError.scss';

function RequestError() {
    const {errorStatus} = useSelector((state) => state.requestError);

    const dispatch = useDispatch();

    const history = useHistory();

    const handleBackClick = () => {
        dispatch(unsetRequestError());
        history.goBack();
    };

    return (
        <div className="error_block">
            <span className="error_block__status">{errorStatus}</span>
            <span className="error_block__desc">Что-то пошло не так</span>
            <span className="error_block__suggestion">Попробуйте перезагрузить страницу</span>
            <Button
                type="button"
                title="Назад"
                location="request_error"
                onclick={handleBackClick}
            />
        </div>
    );
}

export default RequestError;
