import React from 'react';

import { PRELOADER_ITEMS_ARR } from '../../../constants/commonConstants';

import './Preloader.scss';

function Preloader() {
    return (
        <div className="preloader">
            {PRELOADER_ITEMS_ARR.map((item) => (
                    <span
                        key={item}
                        className="preloader__item"
                        style={{ animationDelay: `${item * 0.1}s` }}
                    />
                ))}
        </div>
    );
}

export default Preloader;
