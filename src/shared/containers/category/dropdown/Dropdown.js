import React, { useState, forwardRef, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import './Dropdown.css'
import IconDropdown from 'shared/containers/icons/iconsSupplierCreate/IconDropdown'

const DropdownSelect = forwardRef(
    ({ option, placeholder, value, ...rest }, ref) => {
        const dropdownRef = useRef(null);

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

                    value={value ? value : placeholder ? undefined : option[0].name}
                    options={option}
                    optionLabel="name"
                    placeholder={value ? value : placeholder ? placeholder : option[0].name}
                    className="dropdownSelect-primereact"
                    dropdownIcon={<IconDropdown />}
                />
            </>
        );
    }
);

export default DropdownSelect;