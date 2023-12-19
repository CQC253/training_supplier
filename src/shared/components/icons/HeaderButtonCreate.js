import React from 'react'
import styles from '../header/Header.module.scss'

export default function HeaderButtonCreate({ onClick, onBlur }) {
    return (
        <button
            className={styles['custom-button']}
            onClick={onClick}
            onBlur={onBlur}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles['custom-button-icon1']}
                width={36}
                height={36}
                viewBox="0 0 36 36"
                fill="none"
            >
                <circle cx={18} cy={18} r="17.5" fill="white" stroke="#138300" />
            </svg>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles['custom-button-icon2']}
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
            >
                <path
                    d="M2 9.00293H16"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
                <path
                    d="M9.00513 16V2"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
            </svg>
        </button>
    )
}
