import React, { useState, useEffect } from "react";
import styles from './TransLanguage.module.scss'
import useTrans from "hooks/use-trans";
import {useTranslation } from "react-i18next"
export default function TransLanguage() {
    const {t, i18n} = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem("selectedLanguage") || "vi");

    const handleLanguageChange = (event) => {
        const selectedLang = event.target.value;
        setSelectedLanguage(selectedLang);
        i18n.changeLanguage(selectedLang)
        localStorage.setItem("selectedLanguage", selectedLang);
    };

    useEffect(() => {
        const storedLang = localStorage.getItem("selectedLanguage");
        if (storedLang) {
            setSelectedLanguage(storedLang);
            // i18n.changeLanguage(storedLang);
        }
    }, [i18n]);

    return (
        <>
            <div className={styles['div-trans']}>
                <select
                    className={styles['select-trans']}
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                >
                    <option value="en">EN</option>
                    <option value="vi">VN</option>
                </select>
            </div>
        </>
    );
}
