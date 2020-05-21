import React from 'react';
import classnames from 'classnames';
import { Dropdown } from '../Dropdown';

const CLASSNAME = 'input';
const Input = (props) => {
    const { className, label, hasError, errorLabel, type, onChange, ...inputProps } = props;

    const inputClassname = classnames(className, CLASSNAME);
    const inputFieldClassname = classnames(`${CLASSNAME}__field`, {
        [`${CLASSNAME}__field-error`]: hasError
    });

    const onInputChange = (event) => {
        const { value } = event.target;

        onChange && onChange(value);
    };

    return (
        <div className={inputClassname}>
            <label className={`${CLASSNAME}__label`}>{label}</label>
            {
                type === 'textarea' &&
                    <textarea
                        className={`${CLASSNAME}__textarea`}
                        {...inputProps}
                        onChange={onInputChange}
                    />
            }
            {
                type === 'dropdown' && 
                    <Dropdown
                        className={inputFieldClassname}
                        {...inputProps}
                        onChange={onInputChange}
                    />
            }
            {
                type !== 'textarea' && type !== 'dropdown' &&
                    <input
                        type={type}
                        className={inputFieldClassname}
                        {...inputProps}
                        onChange={onInputChange}
                    />
            }
            { hasError && <label className={`${CLASSNAME}__error-label`}>{errorLabel}</label> }
        </div>
    );
};

export { Input };