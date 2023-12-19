import React from 'react';
import styles from './MainLayout.module.scss'
import Menu from '../menu/Menu';
import Header from '../header/Header';

function MainLayout(props) {
    return (
        <div className={styles['MainLayout']}>
            <div className={styles['body-left']}>
                <Menu />
            </div>
            <div className={styles['body-right']}>
                <Header />
                {props.children}
            </div>
        </div>
    )
}
export default MainLayout;