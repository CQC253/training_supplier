import React from 'react'
import styles from '../header/Header.module.scss'

export default function HeaderIconAccount() {
    return (
        <button className={styles['icon-account']}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles['custom-icon-account1']}
                width={32}
                height={32}
                viewBox="0 0 32 32"
                fill="none"
            >
                <circle cx={16} cy={16} r={16} fill="#FFCD29" />
            </svg>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles['custom-icon-account2']}
                width={20}
                height={22}
                viewBox="0 0 20 22"
                fill="none"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.87578 10.4282C4.41529 10.3278 4.90894 10.5142 5.27042 10.7338C6.20767 11.3031 6.89792 11.6602 7.59133 11.8809C8.27735 12.0992 8.9978 12.1936 10.0009 12.1936C11.0037 12.1936 11.7239 12.0992 12.4097 11.8809C13.1029 11.6602 13.793 11.3032 14.73 10.7339C15.0915 10.5142 15.5852 10.3277 16.1249 10.4282C17.6608 10.7144 18.784 11.9906 19.2886 13.5066C19.7978 15.0364 19.7204 16.9101 18.7706 18.5637L18.7613 18.5792C17.7874 20.1625 15.9662 20.8938 14.2914 21.2457C12.6027 21.6004 10.9107 21.6004 10.0122 21.6004H9.98959C9.09081 21.6004 7.39844 21.6004 5.70944 21.2457C4.0343 20.8938 2.2127 20.1626 1.23858 18.5792L1.22936 18.5637C0.279281 16.9101 0.201851 15.0363 0.711236 13.5065C1.21604 11.9904 2.33956 10.7142 3.87578 10.4282ZM4.64738 11.7593C4.4208 11.6217 4.23318 11.5823 4.09541 11.6079C3.11682 11.7901 2.26363 12.6427 1.84978 13.8856C1.44133 15.1123 1.50225 16.6243 2.2653 17.958C2.97571 19.1055 4.37892 19.74 5.95613 20.0713C7.51585 20.3989 9.10048 20.4004 10.0009 20.4004C10.9011 20.4004 12.4853 20.3989 14.0446 20.0713C15.6215 19.74 17.0243 19.1055 17.7346 17.958C18.4974 16.6243 18.5583 15.1124 18.15 13.8856C17.7363 12.6427 16.8833 11.7902 15.9051 11.608C15.7674 11.5823 15.5797 11.6217 15.3531 11.7594C14.3921 12.3434 13.6048 12.7598 12.7737 13.0244C11.9352 13.2913 11.0841 13.3936 10.0009 13.3936C8.9174 13.3936 8.06613 13.2913 7.22744 13.0244C6.39613 12.7598 5.60867 12.3433 4.64738 11.7593Z"
                    fill="#333333"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.99975 1.60039C7.56965 1.60039 5.59966 3.57038 5.59966 6.00048C5.59966 8.43058 7.56965 10.4006 9.99975 10.4006C12.4299 10.4006 14.3998 8.43058 14.3998 6.00048C14.3998 3.57038 12.4299 1.60039 9.99975 1.60039ZM4.39966 6.00048C4.39966 2.90764 6.9069 0.400391 9.99975 0.400391C13.0926 0.400391 15.5998 2.90764 15.5998 6.00048C15.5998 9.09333 13.0926 11.6006 9.99975 11.6006C6.9069 11.6006 4.39966 9.09333 4.39966 6.00048Z"
                    fill="#333333"
                />
            </svg>
        </button>




    )
}
