import React from 'react';
import classnames from 'classnames';

const CLASSNAME = 'card';
const Card = (props) => {
    const { children, className } = props;

    const cardClassname = classnames(className, CLASSNAME);

    return (
        <div className={cardClassname}>
            {children}
        </div>

    );
};

export { Card };