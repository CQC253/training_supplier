import React, { useState } from 'react';
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
                    // onBlur={handleBlur}
                    />

                    {isDropdown &&
                        <ul className={styles['dropdown-list']}>
                            <Link
                            // to={ }
                            // onClick={() => handleLinkClick(item.linkTo)}
                            >
                                <li className={styles['dropdown-item']}>
                                    <p>Tạo nhà danh mục</p>
                                </li>
                            </Link>
                            <Link
                            // to={ }
                            // onClick={() => handleLinkClick(item.linkTo)
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

        </div >
    )
}
