import React from 'react';
import PropTypes from 'prop-types';

import Selector from '../Selector';
import Button from '../Button';

import './Filters.scss';

function Filters({filtersArr}) {
    return (
        <>
            <div className="filters">
                {filtersArr.map((item) => (
                    <Selector
                        title={item.title}
                        selectorArr={item.arr}
                    />
                ))}
            </div>
            <Button
                type="button"
                title=" Применить"
                location="admin_article_header"
            />
        </>
    );
}

Filters.propTypes = {
    filtersArr: PropTypes.arrayOf(PropTypes.any),
};

Filters.defaultProps = {
    filtersArr: [],
};

export default Filters;
