import React from 'react'
import styles from '../header/Header.module.scss'

export default function HeaderIconSell() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles['custom-header-icon2']}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.25 -3.27836e-08C12.6642 -1.46777e-08 13 0.335786 13 0.75L13 23.25C13 23.6642 12.6642 24 12.25 24C11.8358 24 11.5 23.6642 11.5 23.25L11.5 0.75C11.5 0.335786 11.8358 -5.08895e-08 12.25 -3.27836e-08Z"
                fill="#707070"
            />
        </svg>

    )
}
