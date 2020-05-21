import React from 'react';
import classnames from 'classnames';

const CLASSNAME = 'dropdown';
const Dropdown = (props) => {
    const { options, className, ...dropdownProps } = props;

    const dropdownClassname = classnames(className, CLASSNAME);

    return (
        <select className={dropdownClassname} {...dropdownProps}>
            {
                options.map(option => <option {...option}>{option.label}</option>)
            }
        </select>

    );
};

export { Dropdown };
