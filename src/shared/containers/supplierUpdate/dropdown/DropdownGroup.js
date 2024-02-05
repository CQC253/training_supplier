import React, { forwardRef, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import './Dropdown.css'
import IconDropdown from 'shared/containers/icons/iconsSupplierCreate/IconDropdown'

const DropdownGroup = forwardRef(({ selectedOption, option, placeholder, onChange, emptyMessage, option_get_id, ...rest }, ref) => {
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

                value={selectedOption ? selectedOption : option_get_id}
                onChange={(e) => onChange(e.value)}
                options={option}
                optionLabel="label"
                optionGroupLabel="label"
                optionGroupChildren="items"
                className="dropdownSelect-primereact"
                dropdownIcon={<IconDropdown />}
                emptyMessage={emptyMessage}
                placeholder={placeholder}
            />
        </>
    );
});

export default DropdownGroup;