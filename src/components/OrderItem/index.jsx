import React, {useState, useEffect} from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Selector from '../layouts/Selector';
import Checkbox from '../layouts/Checkbox';
import Button from '../layouts/Button';

import { setOrder, setOrderAdditionalOption, setOrderStatus } from '../../store/order/actionCreators';
import { setStatuses } from '../../store/statuses/actionCreators';

import { getSingleOrder, getStatuses, changeOrder, deleteOrder } from '../../api';

import './OrderItem.scss';

function OrderItem() {
    const [isRedirect, setIsRedirect] = useState(false);

    const {order} = useSelector((state) => state.order);
    const {statuses} = useSelector((state) => state.statuses);
    const dispatch = useDispatch();
    const id = useParams();

    useEffect(() => {
        getStatuses()
            .then((data) => dispatch(setStatuses(data.data)));
    }, []);

    useEffect(() => {
        getSingleOrder(id.id).then((data) => dispatch(setOrder(data.data)));
    }, [id]);

    const handleCheckboxChange = (optionName) => {
        dispatch(setOrderAdditionalOption(optionName));
    };

    const handleStatusChange = (status) => {
        dispatch(setOrderStatus(status));
    };

    const handleCancelChanges = () => {
        getSingleOrder(id.id).then((data) => dispatch(setOrder(data.data)));
    };

    const handleSaveChanges = () => {
        changeOrder(order);
        setIsRedirect(true);
    };

    const handleDeleteOrder = () => {
        deleteOrder(id.id);
        setIsRedirect(true);
    };

    if (isRedirect) {
        return <Redirect to="/admin/orders"/>;
    }

    return (
        <>
            <header className="admin_content__header">Редактирование заказа</header>
            <article className="admin_content__main admin_article">
            <div className="admin_article__main">
                <Selector
                    title="статус"
                    chosenItem={order.orderStatusId && order.orderStatusId.name}
                    setChosen={handleStatusChange}
                    selectorArr={statuses}
                />
                <div className="order_item__options">
                    <div className="order_item__option">
                        <Checkbox
                            label="Полный бак"
                            name="isFullTank"
                            value={order.isFullTank}
                            setCheckbox={handleCheckboxChange}
                        />
                    </div>

                    <div className="order_item__option">
                        <Checkbox
                            label="Детское кресло"
                            name="isNeedChildChair"
                            value={order.isNeedChildChair}
                            setCheckbox={handleCheckboxChange}
                        />
                    </div>

                    <div className="order_item__option">
                        <Checkbox
                            label="Правый руль"
                            name="isRightWheel"
                            value={order.isRightWheel}
                            setCheckbox={handleCheckboxChange}
                        />
                    </div>
                </div>
                <div className="order_item__btns">
                    <Button
                        type="button"
                        title="Сохранить"
                        color="green"
                        onclick={handleSaveChanges}
                    />
                    <Button
                        type="button"
                        title="Отменить"
                        onclick={handleCancelChanges}
                    />
                    <Button
                        type="button"
                        title="Удалить"
                        color="red"
                        onclick={handleDeleteOrder}
                    />
                </div>
            </div>
            </article>
        </>
    );
}

export default OrderItem;
