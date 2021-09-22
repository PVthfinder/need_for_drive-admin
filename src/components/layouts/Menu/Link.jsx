import React from 'react';
import classNames from 'classnames';

function Link({title, path, openedClass, index, linksArr}) {
    const delay = (linksArr.length - index) * 0.1;
    return (
        <a 
            href={path} 
            className={classNames("menu__link", openedClass)}
            style={{ transitionDelay: `0.05s, ${delay}s` }}
        >{title}</a>
    )
}

export default Link;
