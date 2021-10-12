import React, { useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import InputField from '../layouts/InputField';
import Preloader from '../layouts/Preloader';
import EditItemControls from '../EditItemControls';

import { setSingleEntity, setSingleEntityOption } from '../../store/entities/actionCreators';

import { getSingleEntity } from '../../utils/apiUtils';
import { CITIES_DB } from '../../constants/fetchConstants';

function CityItem() {
    const {singleEntity} = useSelector((state) => state.entities);
    const dispatch = useDispatch();
    const id = useParams();

    useEffect(() => {
        if (Object.keys(id).length === 0) {
            dispatch(setSingleEntity({}));
        } else {
            getSingleEntity(CITIES_DB, id.id)
                .then((data) => (data ? dispatch(setSingleEntity(data.data)) : {}));
        }
    }, [id]);

    const handleEntityChange = (entityObj, entityName) => {
        dispatch(setSingleEntityOption(entityObj, entityName));
    };

    return (
        <>
            <header className="admin_content__header">Город</header>
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
                                    label="Название города"
                                    placeholder="Введите название города"
                                    entityName="name"
                                    isError={!singleEntity.name}
                                />
                            </div>
                            <EditItemControls
                                idObj={id}
                                entityDb={CITIES_DB}
                                disableSaveBtn={!singleEntity.name}
                            />
                        </div>
                    ) : <Preloader/>
                }
            </article>
        </>
    );
}

export default CityItem;
