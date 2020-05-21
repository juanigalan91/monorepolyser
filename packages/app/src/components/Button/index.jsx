import React from 'react';
import classnames from 'classnames';

const CLASSNAME = 'button';
const Button = (props) => {
    const { children, className, asLink, ...buttonProps } = props;

    const buttonClassname = classnames(className, CLASSNAME);

    const Tag = asLink ? 'a' : 'button';

    return (
        <Tag className={buttonClassname} {...buttonProps}>
            {children}
        </Tag>

    );
};

export { Button };
