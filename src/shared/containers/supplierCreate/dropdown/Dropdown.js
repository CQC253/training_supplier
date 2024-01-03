import React, { useState, forwardRef, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import './Dropdown.css'
import IconDropdown from 'shared/containers/icons/iconsSupplierCreate/IconDropdown'

const DropdownSelect = forwardRef(({ option, placeholder, value, onChange, emptyMessage, ...rest }, ref) => {
    const dropdownRef = useRef(null);
    const [selectValue, setSelectValue] = useState(value || null)

    useEffect(() => {
        if (Array.isArray(value) && value.length === 0) {
            setSelectValue(null);
        } else {
            setSelectValue(value);
        }
    }, [value]);

    const handleOnChange = (event) => {
        if (onChange) {
            onChange(event);
            setSelectValue(event.value.name)
        }
    };
    return (
        <>
            <Dropdown
                {...rest}
                ref={(el) => {
                    dropdownRef.current = el;
                    if (ref) {
                        if (typeof ref === 'function') {
                            ref(el);
                        } else {
                            ref.current = el;
                        }
                    }
                }}

                onChange={(event) => handleOnChange(event)}
                value={selectValue}
                options={option}
                optionLabel="name"
                placeholder={selectValue ? selectValue : placeholder }
                className="dropdownSelect-primereact"
                dropdownIcon={<IconDropdown />}
                emptyMessage={emptyMessage}
            />
        </>
    );
});

export default DropdownSelect;