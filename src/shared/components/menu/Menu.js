import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import MenuIconBack from '../icons/MenuIconBack';
import { MenuIcon1 } from '../icons/MenuIcon1';
import { MenuIcon2 } from '../icons/MenuIcon2';
import { MenuIcon3 } from '../icons/MenuIcon3';
import { MenuIcon4 } from '../icons/MenuIcon4';
import { MenuIcon5 } from '../icons/MenuIcon5';
import { MenuIcon6 } from '../icons/MenuIcon6';
import styles from './Menu.module.scss'
// import Navbar from '../nav-bar/Navbar.js'

function Menu({linkPath}) {
    //Click Link
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('');

    //data menu
    const menu = [
        {
            'icon': <MenuIcon1 />,
            'title': 'Tổng quan',
            'linkTo': '/supplier/overview'
        },
        {
            'icon': <MenuIcon2 />,
            'title': 'Danh mục NCC',
            'linkTo': '/supplier/category'
        },
        {
            'icon': <MenuIcon3 />,
            'title': 'Danh sách NCC',
            'linkTo': '/supplier/list'
        },
        {
            'icon': <MenuIcon4 />,
            'title': 'Lịch sử đặt hàng',
            'linkTo': '/supplier/order_history'
        },
        {
            'icon': <MenuIcon5 />,
            'title': 'Bảng báo giá',
            'linkTo': '/supplier/quotation'
        },
        {
            'icon': <MenuIcon6 />,
            'title': 'Lịch sử theo dõi',
            'linkTo': '/supplier/tracking_history'
        },

    ]

    /*----------------------------------------------*/

    //Click Link
    const handleLinkClick = (link) => {
        setActiveLink(link);
    }

    /*----------------------------------------------*/

    // Click Link (Kiểm tra xem URL hiện tại có trùng với 'linkTo' hay không)
    useEffect(() => {
        const currentPath = location.pathname;
        // console.log(currentPath);

        const matchedLink = menu.find(item => item.linkTo == currentPath);
        // console.log(matchedLink, currentPath);
        if (matchedLink) {
            setActiveLink(matchedLink.linkTo);
        } else {
            setActiveLink('');
        }
    }, [location.pathname, menu]);

    /*----------------------------------------------*/

    return (
        <div className={styles['menu']}>
            <div className={styles['div-icon-back']}>
                <MenuIconBack />
            </div>

            <div className={styles['div-icon-title']}>
                {menu.map((item, index) => {
                    return (
                        <Link
                            to={item.linkTo}
                            key={index}
                            className={`${styles['link-icon-title']} ${activeLink == item.linkTo ? styles['active-link'] : ''} ${linkPath ? styles['active-link'] : ''}` }
                            onClick={() => handleLinkClick(item.linkTo)}
                        >
                            <span>{item.icon}</span>
                            <span className={styles['span-title']}>{item.title}</span>
                        </Link>

                    )
                })}
            </div>
        </div>
    )
}
export default Menu;