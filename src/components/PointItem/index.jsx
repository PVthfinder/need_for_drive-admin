import React, { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Selector from '../layouts/Selector';
import InputField from '../layouts/InputField';
import Preloader from '../layouts/Preloader';
import EditItemControls from '../EditItemControls';

import { setCities, setSingleEntity, setSingleEntityOption } from '../../store/entities/actionCreators';

import { getSingleEntity, getEntityList } from '../../utils/apiUtils';
import { CITIES_DB, POINTS_DB } from '../../constants/fetchConstants';

import './PointItem.scss';

function PointItem() {
    const {cities, singleEntity} = useSelector((state) => state.entities);
    const dispatch = useDispatch();
    const id = useParams();

    useEffect(() => {
        if (Object.keys(id).length === 0) {
            dispatch(setSingleEntity({}));
        } else {
            getSingleEntity(POINTS_DB, id.id)
                .then((data) => (data ? dispatch(setSingleEntity(data.data)) : {}));
        }
    }, [id]);

    useEffect(() => {
        getEntityList(CITIES_DB)
            .then((data) => (data ? dispatch(setCities(data.data)) : []));
    }, []);

    const handleEntityChange = (entityObj, entityName) => {
        dispatch(setSingleEntityOption(entityObj, entityName));
    };

    return (
        <>
            <header className="admin_content__header">Пункт выдачи</header>
            <article className="admin_content__main">
                {
                    singleEntity
                    ? (
                        <div className="admin_article__main item">
                            <div className="item__options">
                                <InputField
                                    type="text"
                                    inputValue={singleEntity.name}
                                    setInputValue={handleEntityChange}
                                    label="Название пункта"
                                    placeholder="Введите название пункта"
                                    entityName="name"
                                    isError={!singleEntity.name}
                                />
                                <Selector
                                    label="Город"
                                    title="город"
                                    entityName="cityId"
                                    chosenItem={singleEntity.cityId && singleEntity.cityId.name}
                                    setChosen={handleEntityChange}
                                    selectorArr={cities}
                                    isError={!singleEntity.cityId}
                                />
                                <InputField
                                    type="text"
                                    inputValue={singleEntity.address}
                                    setInputValue={handleEntityChange}
                                    label="Адрес пункта"
                                    placeholder="Введите адрес пункта"
                                    entityName="address"
                                    isError={!singleEntity.address}
                                />
                            </div>
                            <EditItemControls
                                idObj={id}
                                entityDb={POINTS_DB}
                                disableSaveBtn={!(
                                    singleEntity.name
                                    && singleEntity.cityId
                                    && singleEntity.address
                                )}
                            />
                        </div>
                    )
                    : <Preloader/>
                }
            </article>
        </>
    );
}

export default PointItem;
