import React from 'react';
import PropTypes from 'prop-types';

import './SimpleCard.scss';

function SimpleCard({itemObj}) {
    const {
        name,
        cityId,
        address,
        description,
    } = itemObj;
    return (
        <>
            <div className="simple_list_item">
                <span>{name ?? 'Нет данных'}</span>
            </div>
            {
                cityId
                && (
                    <>
                        <div className="simple_list_item">
                            <span>{cityId.name ?? 'Нет данных'}</span>
                        </div>
                        <div className="simple_list_item">
                            <span>{address ?? 'Нет данных'}</span>
                        </div>
                    </>
                )
            }
            {
                description
                && (
                    <div className="simple_list_item">
                        <span>{description ?? 'Нет данных'}</span>
                    </div>
                )
            }
        </>
    );
}

SimpleCard.propTypes = {
    itemObj: PropTypes.objectOf(PropTypes.any),
};

SimpleCard.defaultProps = {
    itemObj: {},
};

export default SimpleCard;
