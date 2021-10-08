import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { unsetPopup } from '../../../store/popup/actionCreators';

import './Popup.scss';

function Popup() {
    const {isPopup, isSuccess, text} = useSelector((state) => state.popup);
    const dispatch = useDispatch();

    const popupClasses = classNames(
        'popup',
        {
            active: isPopup,
            'popup--success': isSuccess,
        },
    );

    useEffect(() => {
        if (isPopup) {
            setTimeout(() => {
                dispatch(unsetPopup());
            }, 10000);
        }
    }, [isPopup]);

    const handleClosePopup = () => {
        dispatch(unsetPopup());
    };

    return (
        <div className={popupClasses}>
            <div className="popup__info">
                {
                    isSuccess
                    && (
                        <span className="popup__done_icon">
                            <svg width="13" height="10" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.75 4.73828L7.16406 0.324219L7.75 0.910156L2.75 5.91016L0.425781 3.58594L1.01172 3L2.75 4.73828Z" fill="#121212"/>
                            </svg>
                        </span>
                    )
                }
                {text}
            </div>
            <span
                className="popup__close_icon"
                onClick={handleClosePopup}
                onKeyDown={handleClosePopup}
                role="button"
                tabIndex="0"
                aria-label="close popup"
            />
        </div>
    );
}

export default Popup;
