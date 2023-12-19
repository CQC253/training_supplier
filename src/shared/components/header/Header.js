import React, { useState } from 'react';
import styles from './Header.module.scss'
import HeaderButtonCreate from '../icons/HeaderButtonCreate'
import HeaderIcon1 from '../icons/HeaderIcon1'
import HeaderIcon2 from '../icons/HeaderIcon2'
import HeaderIcon3 from '../icons/HeaderIcon3'
import HeaderIcon4 from '../icons/HeaderIcon4'
import HeaderIcon5 from '../icons/HeaderIcon5'
import HeaderIcon6 from '../icons/HeaderIcon6'
import HeaderIcon7 from '../icons/HeaderIcon7'
import HeaderIconAccount from '../icons/HeaderIconAccount'
import Breadcrumbs from './breadcrumbs/Breadcrumbs';

export default function Header() {
    //Dropdown create
    const [isDropdown, setIsDropdown] = useState(false)

    const handleClickCreate = () => {
        setIsDropdown(!isDropdown);
    };

    const handleBlur = () => {
        setIsDropdown(!isDropdown);
    };

    return (
        <div className={styles['header']}>
            <div className={styles['header-left']}>
                <div className={styles['dropdown-button']}>
                    <HeaderButtonCreate
                        onClick={handleClickCreate}
                        onBlur={handleBlur}
                    />

                    {isDropdown &&
                        <ul className={styles['dropdown-list']}>
                            <li className={styles['dropdown-item']}>
                                <a href="#">Tạo nhà cung cấp</a>
                            </li>
                        </ul>
                    }
                </div>

                <div className={styles['div-sell']}>
                    <a href='/' className={styles['a-sell']}>BÁN HÀNG</a>
                    <HeaderIcon1 />
                </div>

                <div className={styles['div-breadcrums']}>
                    <Breadcrumbs />
                </div>
            </div>

            <div className={styles['header-right']}>
                <div className={styles['div-icon']}>
                    <HeaderIcon3 />
                    <HeaderIcon4 />
                    <HeaderIcon5 />
                    <HeaderIcon6 />
                    <HeaderIcon7 />
                </div>

                <div className={styles['div-account']}>
                    <HeaderIconAccount />
                </div>
            </div>

        </div>
    )
}
