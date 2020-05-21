import React from 'react';
import classnames from 'classnames';

const CLASSNAME = 'title';
const Title = (props) => {
    const { children, className, theme, centered = false, importance = 1, dangerouslySet = false } = props;

    const Tag = `h${importance}`;

    const titleClassName = classnames(className, CLASSNAME, `${CLASSNAME}-${Tag}`, {
        [`${CLASSNAME}-dark`]: !!theme,
        [`${CLASSNAME}-centered`]: centered,
    });

    return dangerouslySet ?
        (
            <Tag className={titleClassName} dangerouslySetInnerHTML={{ __html: children}} />
        ) :
        (
            <Tag className={titleClassName}>
                {children}
            </Tag>
        );
};

export { Title };