import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Breadcrumbs.module.scss'
import HeaderIconBreadcrumb from '../../icons/HeaderIconBreadcrumb'

export default function Breadcrumbs() {
    const location = useLocation()
    // console.log(location);

    let currLink = ''
    function mapCrumb(crumb, index, array) {
        switch (crumb) {
            case 'overview':
                return 'Tổng quan'
            case 'category':
                return 'Loại nhà cung cấp'
            case 'supplier':
                return 'Nhà cung cấp';
            case 'list':
                if (array.length >= 3) {
                    return 'Danh sách NCC';
                }
                return 'Danh sách nhà cung cấp';
            case 'order_history':
                return 'Lịch sử đặt hàng'
            case 'quotation':
                return 'Bảng báo giá'
            case 'tracking_history':
                return 'Lịch sử theo dõi'
            case 'detail':
                return 'Chi tiết thông tin'
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
                    {index !== 0 && <HeaderIconBreadcrumb />}
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
