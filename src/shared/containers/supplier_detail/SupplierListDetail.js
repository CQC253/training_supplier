import React, {useState, useEffect} from 'react'
import styles from './SupplierListDetail.module.scss'
import IconStatus from '../icons/iconsSupplierListDetail/IconStatus'
import { useLocation } from 'react-router-dom';
import Menu from 'shared/components/menu/Menu';

export default function SupplierListDetail() {
    //send pathName for menu.js
    useEffect(() => {
        // Gọi hàm tại đây
        function linkPath() {
            const location = useLocation();
            const linkPath = location.pathname;
    
            return <Menu currentPath={linkPath} />;
        }
    }, []); // [] để chỉ gọi hàm một lần khi component được render lần đầu tiên

    const myFunction = () => {
        // Hàm bạn muốn gọi
        console.log('Hello');
    };

    function linkPath() {
        const location = useLocation();
        const linkPath = location.pathname;

        return <Menu currentPath={linkPath} />;
    }

    return (
        <div className={styles['div-supplier-detail']}>
            <div className={styles['div-update-status']}>
                <div className={styles['div-status']}>
                    <IconStatus />
                    <p>Trạng thái</p>
                </div>
            </div>

            <div className={styles['div-detail']}>

            </div>
        </div>
    )
}
