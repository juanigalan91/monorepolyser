import React from 'react';
import classnames from 'classnames';

const CLASSNAME = 'bullet-points';
const BulletPoints = (props) => {
    const { className, points = [] } = props;

    const bulletPointsClassname = classnames(className, CLASSNAME);

    return (
        <ul className={bulletPointsClassname}>
            { points.map((point, index) => (
                <li className={`${bulletPointsClassname}__point`} key={index} dangerouslySetInnerHTML={{ __html:point }} />
              ))
            }
        </ul>
    );
};

export { BulletPoints };
