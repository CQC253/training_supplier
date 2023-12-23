import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import styles from './Dropdown.module.scss'

export default function DropdownSelect({
    options,
    onChange,
    value,
    defaultValue,
    placeholder,
    arrowOpen,
    arrowClosed,

    className = 'dropdown-root',
    controlClassName = 'dropdown-control',
    placeholderClassName = 'dropdown-placeholder',
    menuClassName = 'dropdown-menu',
}) {
    
    return (
        <>
            {/* {console.log(placeholder)} */}
            <Dropdown
                options={options}
                onChange={onChange}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                arrowOpen={<span className={styles['arrow-open']}>{arrowOpen}</span>}
                arrowClosed={<span className={styles['arrow-closed']}>{arrowClosed}</span>}

                className={styles[className]}
                controlClassName={styles[controlClassName]}
                placeholderClassName={styles[placeholderClassName]}
                menuClassName={styles[menuClassName]}
            />
        </>
    )
}

