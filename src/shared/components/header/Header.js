import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
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
import TransLanguage from './transLanguage/TransLanguage';
import { useTranslation } from 'react-i18next';
import AccountAction from 'redux/account/action';
import PopupCreate from 'shared/containers/category/popupCreate/PopupCreate';

export default function Header() {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const history = useHistory()

    const [isDropdown, setIsDropdown] = useState(false)
    const [openAccount, setOpenAccount] = useState(false)
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
    }, []);

    const handleAccount = () => {
        setOpenAccount(!openAccount);
    };

    const handleLogout = () => {
        dispatch({
            type: AccountAction.LOGOUT_START,
            callBack: () => {
                localStorage.removeItem("token")
                history.push('/login');
            }
        })
    }

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
                                    <p>{t('header.createCategory')}</p>
                                </li>
                                <Link
                                    to={'/supplier/list/create'}
                                >
                                    <li className={styles['dropdown-item']}>
                                        <p>{t('header.createSupplier')}</p>
                                    </li>
                                </Link>

                            </ul>
                        }
                    </div>

                    <div className={
                        styles['div-sell']}>
                        <a href='/' className={styles['a-sell']}>{t('header.sell')}</a>
                        <HeaderIconSell />
                    </div>

                    <div className={styles['div-breadcrums']}>
                        <Breadcrumbs />
                    </div>
                </div>

                <div className={styles['header-right']}>
                    <div className={styles['div-transLanguage']}>
                        <TransLanguage />
                    </div>
                    <div className={styles['div-icon']}>
                        <HeaderIconRight1 />
                        <HeaderIconRight2 />
                        <HeaderIconRight3 />
                        <HeaderIconRight4 />
                        <HeaderIconRight5 />
                        <div
                            className={styles['header-account']}
                            onClick={() => handleAccount()}
                        >
                            <HeaderIconAccount />

                            {openAccount &&
                                <ul className={styles['dropdown-list']}>
                                    <li
                                        className={styles['dropdown-item']}
                                        onMouseDown={(event) => {
                                            event.preventDefault();
                                            handleLogout()
                                        }}
                                    >
                                        <p>{t('header.logout')}</p>
                                    </li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
