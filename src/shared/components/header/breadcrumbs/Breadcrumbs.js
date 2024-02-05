import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Breadcrumbs.module.scss'
import HeaderIconBreadcrumb from '../../icons/HeaderIconBreadcrumb'
import { useTranslation } from 'react-i18next';

export default function Breadcrumbs() {
    const location = useLocation()
    const { t } = useTranslation();

    let currLink = ''
    function mapCrumb(crumb, index, array) {
        switch (crumb) {
            case 'overview':
                return t('header.breadcrumbs.overview');
            case 'category':
                return t('header.breadcrumbs.category');
            case 'supplier':
                return t('header.breadcrumbs.supplier');
            case 'list':
                return array.length >= 3 ? t('header.breadcrumbs.supplierList') : t('header.breadcrumbs.supplierListShort');
            case 'order_history':
                return t('header.breadcrumbs.orderHistory');
            case 'quotation':
                return t('header.breadcrumbs.quotation');
            case 'tracking_history':
                return t('header.breadcrumbs.trackingHistory');
            case 'detail':
                return t('header.breadcrumbs.detailInfo');
            case 'create':
                return t('header.breadcrumbs.createSupplier');
            case 'update':
                return t('header.breadcrumbs.updateSupplier');
            default:
                return crumb;
        }
    }

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map((crumb, index, array) => {
            if (!isNaN(crumb)) {
                return null;
            }
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
            {crumbs.filter(crumb => crumb !== null)}
        </div>
    )
}
