import React from 'react';
import classnames from 'classnames';

const CLASSNAME = 'snackbar';
const Snackbar = (props) => {
    const { text, success, className, onHide, hideAfter = 3000, display = false } = props;

    React.useEffect(() => {
        setTimeout(() => {
            onHide();
        }, hideAfter);
    }, [display, hideAfter, onHide]);

    const snackbarClassname = classnames(className, CLASSNAME, {
        [`${CLASSNAME}__success`]: success,
        [`${CLASSNAME}__error`]: !success,
    });

    return (
        display && <div className={snackbarClassname}>
            {text}
        </div>

    );
};

export { Snackbar };