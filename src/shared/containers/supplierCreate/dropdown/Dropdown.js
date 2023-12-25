import React, { useState, forwardRef, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import './Dropdown.css'
import IconDropdown from 'shared/containers/icons/iconsSupplierCreate/IconDropdown'

const DropdownSelect = forwardRef(
    ({ option, placeholder, ...rest }, ref) => {
        const dropdownRef = useRef(null);
        
        useEffect(() => {
            // Kiểm tra nếu không có placeholder được cung cấp và option có ít nhất một phần tử
            if (!placeholder && option.length > 0 && !dropdownRef.current.props.value) {
                dropdownRef.current.props.onChange({
                    value: option[0]
                });
            }
        }, [placeholder, option]);
        return (
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
                options={option}
                optionLabel="name"
                placeholder={placeholder ? placeholder : option[0].name}
                className="dropdownSelect-primereact"
                dropdownIcon={<IconDropdown />}
            />
        );
    }
);

export default DropdownSelect;