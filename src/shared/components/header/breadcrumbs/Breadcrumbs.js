import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Breadcrumbs.module.scss'
import HeaderIcon2 from '../../icons/HeaderIcon2'

export default function Breadcrumbs() {
    const location = useLocation()
    // console.log(location);

    let currLink = ''

    function mapCrumb(crumb, index, array) {
        switch (crumb) {
            case 'supplier':
                return 'Nhà cung cấp';
            case 'list':
                if (array.length >= 3) {
                    return 'Danh sách NCC';
                }
                return 'Danh sách nhà cung cấp';
            default:
                return crumb;
        }
    }

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map((crumb, index, array) => {
            currLink += `/${crumb}`
            const isFirstChild = index === 0;
            const modifiedCrumb = mapCrumb(crumb, index, array);
            return (
                <React.Fragment key={crumb}>
                    {index !== 0 && <HeaderIcon2 />}
                    <div className={`${styles['crumb']} ${isFirstChild ? styles['first-crumb'] : ''}`}>
                        <Link to={currLink}>{modifiedCrumb}</Link>
                    </div>
                </React.Fragment>
            )
        })

    return (
        <div className={styles['breadcrumbs']}>
            {/* {console.log(crumbs)} */}
            {crumbs}
        </div>
    )
}
