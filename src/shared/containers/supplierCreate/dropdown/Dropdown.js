import React, { useState, forwardRef } from "react";
import { Dropdown } from "primereact/dropdown";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import './Dropdown.css'
import IconDropdown from 'shared/containers/icons/iconsSupplierCreate/IconDropdown'

const DropdownSelect = forwardRef(
    ({ option, placeholder, ...rest }, ref) => {
        const [selected, setSelected] = useState(null);

        const handleOnChange = (e) => {
            setSelected(e.value);
        };

        return (
            <Dropdown
                value={selected}
                onChange={(e) => handleOnChange(e)}
                options={option}
                optionLabel="name"
                placeholder={placeholder}
                className="dropdownSelect-primereact"
                dropdownIcon={<IconDropdown />}
                ref={ref}
                {...rest}
            />
        );
    }
);

export default DropdownSelect;