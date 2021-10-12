import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CarCard from '../CarsList/CarCard';
import OrderCard from '../Orders/OrderCard';
import SimpleCard from '../SimpleCard/SimpleCard';

import './ListCard.scss';

function ListCard({listName, cardName, itemObj}) {
    let component = null;

    if (cardName === 'car') {
        component = <CarCard carObj={itemObj}/>;
    } else if (cardName === 'order') {
        component = <OrderCard orderObj={itemObj}/>;
    } else {
        component = <SimpleCard itemObj={itemObj}/>;
    }

    return (
        <div className="list_item">
            <div className="list_item__info">
                {component}
            </div>

            <Link to={`/admin/${listName}/${itemObj.id}`} className="list_item__change_btn">
                <span className="list_item__change_icon"/>
                Изменить
            </Link>
        </div>
    );
}

ListCard.propTypes = {
    listName: PropTypes.string,
    cardName: PropTypes.string,
    itemObj: PropTypes.objectOf(PropTypes.any),
};

ListCard.defaultProps = {
    listName: '',
    cardName: '',
    itemObj: null,
};

export default ListCard;
