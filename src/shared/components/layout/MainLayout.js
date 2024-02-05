import React, { useEffect } from 'react';
import styles from './MainLayout.module.scss'
import Menu from '../menu/Menu';
import Header from '../header/Header';
import { useDispatch } from 'react-redux';
import AccountAction from 'redux/account/action';
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Constants from 'utils/Constants'

function MainLayout(props) {
    const history = useHistory()
    const dispatch = useDispatch();
    const location = useLocation();
    let token = localStorage.getItem("token");

    useEffect(() => {
    
        dispatch({
            type: AccountAction.ME_START,
            validToken: (res) => {
                if (res.message === "OK" && res.success === true) {
                    return
                }
            },
            invalidToken: (res) => {
                if (!token || res.message === Constants.MAIN_LAYOUT.TOKEN.INVALID && res.success === false || res.message === Constants.MAIN_LAYOUT.TOKEN.EXPIRED && res.success === false) {
                    localStorage.removeItem("token")
                    return history.push('/login');
                }
            }
        });
    }, [location.pathname])

    return (
        <div className={styles['MainLayout']}>
            <div className={styles['body-left']}>
                <Menu />
            </div>
            <div className={styles['body-right']}>
                <Header />
                {props?.children}
            </div>
        </div>

    )
}
export default MainLayout;