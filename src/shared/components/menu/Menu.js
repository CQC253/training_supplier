import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import MenuIconBack from '../icons/MenuIconBack';
import Constants from './Constants';
import styles from './Menu.module.scss'
import { useTranslation } from 'react-i18next';

function Menu() {
    const {t} = useTranslation();
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    }

    useEffect(() => {
        const currentPath = location.pathname;

        const matchedLink = Constants.MENU.find(item => currentPath.startsWith(item.linkTo));
        
        if (matchedLink) {
            setActiveLink(matchedLink.linkTo);
        } else {
            setActiveLink('');
        }
    }, [location.pathname, Constants.MENU]);

    return (
        <div className={styles['menu']}>
            <div className={styles['div-icon-back']}>
                <MenuIconBack />
            </div>

            <div className={styles['div-icon-title']}>
                {Constants.MENU.map((item, index) => {
                    return (
                        <Link
                            to={item.linkTo}
                            key={index}
                            className={`${styles['link-icon-title']} ${activeLink.startsWith(item.linkTo) ? styles['active-link'] : ''}` }
                            onClick={() => handleLinkClick(item.linkTo)}
                        >
                            <span>{item.icon}</span>
                            <span className={styles['span-title']}>{t(`menu.${item.title}`)}</span>
                        </Link>

                    )
                })}
            </div>
        </div>
    )
}
export default Menu;