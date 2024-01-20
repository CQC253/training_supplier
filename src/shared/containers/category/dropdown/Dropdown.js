import React, { forwardRef, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import './Dropdown.css'
import IconDropdown from 'shared/containers/icons/iconsSupplierCreate/IconDropdown'

const DropdownSelect = forwardRef(({ selectedOption, option, placeholder, onChange, optionGetId, ...rest }, ref) => {
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

                // value={selectedOption}
                value={selectedOption ? selectedOption : optionGetId}
                onChange={(e) => onChange(e.value)}
                options={option}
                optionLabel="name"
                placeholder={placeholder}

                className="dropdownSelect-primereact"
                dropdownIcon={<IconDropdown />}
            />
        </>
    );
});

export default DropdownSelect;