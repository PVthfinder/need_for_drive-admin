import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../layouts/Button';

import { setPopup } from '../../store/popup/actionCreators';

import { setSingleEntity } from '../../store/entities/actionCreators';

import { getSingleEntity, createEntity, changeEntity, deleteEntity } from '../../utils/apiUtils';

import './EditItemControls.scss';

function EditItemControls({idObj, entityDb, disableSaveBtn}) {
    const [isRedirect, setIsRedirect] = useState(false);

    const {singleEntity} = useSelector((state) => state.entities);
    const dispatch = useDispatch();

    const handleCancelChanges = () => {
        if (Object.keys(idObj).length === 0) {
            dispatch(setSingleEntity({}));
        } else {
            getSingleEntity(entityDb, idObj.id)
                .then((data) => (data ? dispatch(setSingleEntity(data.data)) : {}));
        }
    };

    const handleSaveChanges = () => {
        if (Object.keys(idObj).length === 0) {
            createEntity(entityDb, singleEntity)
                .then(() => dispatch(setPopup(true, 'Успех! Сохранение прошло успешно')))
                .catch((err) => dispatch(setPopup(false, `Ошибка! ${err.httpText}`)))
                .finally(() => setIsRedirect(true));
        } else {
            changeEntity(entityDb, singleEntity)
                .then(() => dispatch(setPopup(true, 'Успех! Изменение прошло успешно')))
                .catch((err) => dispatch(setPopup(false, `Ошибка! ${err.httpText}`)))
                .finally(() => setIsRedirect(true));
        }
    };

    const handleDeleteOrder = () => {
        deleteEntity(entityDb, idObj.id)
            .then(() => dispatch(setPopup(true, 'Успех! Удаление прошло успешно')))
            .catch((err) => dispatch(setPopup(false, `Ошибка! ${err.httpText}`)))
            .finally(() => setIsRedirect(true));
    };

    if (isRedirect) {
        return <Redirect to={`/admin/${entityDb}`}/>;
    }

    return (
        <div className="item__controls">
            <Button
                type="button"
                title="Сохранить"
                color="blue"
                onclick={handleSaveChanges}
                isDisabled={disableSaveBtn}
            />
            <Button
                type="button"
                title="Отменить"
                color="grey"
                onclick={handleCancelChanges}
            />
            {
                Object.keys(idObj).length > 0
                && (
                    <Button
                        type="button"
                        title="Удалить"
                        color="red"
                        onclick={handleDeleteOrder}
                    />
                )
            }
        </div>
    );
}

EditItemControls.propTypes = {
    idObj: PropTypes.objectOf(PropTypes.any),
    entityDb: PropTypes.string,
    disableSaveBtn: PropTypes.bool,
};

EditItemControls.defaultProps = {
    idObj: null,
    entityDb: '',
    disableSaveBtn: false,
};

export default EditItemControls;
