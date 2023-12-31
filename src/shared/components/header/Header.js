import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import HeaderButtonCreate from '../icons/HeaderButtonCreate'
import HeaderIconSell from '../icons/HeaderIconSell'
import HeaderIconRight1 from '../icons/HeaderIconRight1'
import HeaderIconRight2 from '../icons/HeaderIconRight2'
import HeaderIconRight3 from '../icons/HeaderIconRight3'
import HeaderIconRight4 from '../icons/HeaderIconRight4'
import HeaderIconRight5 from '../icons/HeaderIconRight5'
import HeaderIconAccount from '../icons/HeaderIconAccount'
import Breadcrumbs from './breadcrumbs/Breadcrumbs';

import PopupCreate from 'shared/containers/category/popupCreate/PopupCreate';

export default function Header() {
    //Dropdown create
    const [isDropdown, setIsDropdown] = useState(false)
    const dropdownRef = useRef(null);
    const [openCreate, setOpenCreate] = useState(false);

    const handleClickCreate = () => {
        setIsDropdown(!isDropdown);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []); //Xử lí blur

    const handleCreateCategory = () => {
        setOpenCreate(true);
    };
    const handleCloseCategory = () => {
        setOpenCreate(false);
    };

    return (
        <>
            {openCreate &&
                <PopupCreate
                    open={openCreate}
                    handleClose={handleCloseCategory}
                    id={1}
                />
            }

            <div className={styles['header']}>
                <div className={styles['header-left']}>
                    <div className={styles['dropdown-button']}>
                        <div className={styles['div-button']} ref={dropdownRef}>
                            <HeaderButtonCreate
                                onClick={handleClickCreate}
                            />
                        </div>


                        {isDropdown &&
                            <ul className={styles['dropdown-list']}>
                                <li
                                    className={styles['dropdown-item']}
                                    onClick={() => handleCreateCategory()}
                                >
                                    <p>Tạo danh mục</p>
                                </li>
                                <Link
                                    to={'/supplier/list/create'}
                                >
                                    <li className={styles['dropdown-item']}>
                                        <p>Tạo nhà cung cấp</p>
                                    </li>
                                </Link>

                            </ul>
                        }
                    </div>

                    <div className={styles['div-sell']}>
                        <a href='/' className={styles['a-sell']}>BÁN HÀNG</a>
                        <HeaderIconSell />
                    </div>

                    <div className={styles['div-breadcrums']}>
                        <Breadcrumbs />
                    </div>
                </div>

                <div className={styles['header-right']}>
                    <div className={styles['div-icon']}>
                        <HeaderIconRight1 />
                        <HeaderIconRight2 />
                        <HeaderIconRight3 />
                        <HeaderIconRight4 />
                        <HeaderIconRight5 />
                        <HeaderIconAccount />
                    </div>
                </div>

            </div>
        </>
    )
}
