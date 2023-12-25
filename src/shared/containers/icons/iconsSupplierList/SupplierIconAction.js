import React from 'react'
import styles from 'shared/containers/category/SupplierCategory.module.scss'

export default function SupplierIconAction({ onClick }) {
    return (
        <button
            className={styles['custom-action-button']}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                viewBox="0 0 22 22"
                fill="none"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.0001 7.10002C8.84624 7.10002 7.10015 8.84611 7.10015 11C7.10015 13.1539 8.84624 14.9 11.0001 14.9C13.1541 14.9 14.9001 13.1539 14.9001 11C14.9001 8.84611 13.1541 7.10002 11.0001 7.10002ZM5.90015 11C5.90015 8.18337 8.18349 5.90002 11.0001 5.90002C13.8168 5.90002 16.1001 8.18337 16.1001 11C16.1001 13.8167 13.8168 16.1 11.0001 16.1C8.18349 16.1 5.90015 13.8167 5.90015 11Z"
                    fill="#3078F1"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.48811 11.4572C3.48811 11.4572 3.46121 10.8477 3.48811 10.5429L2.00006 8.56181C2.20736 7.79002 2.51475 7.04867 2.9144 6.35663L5.36161 6.00703C5.57078 5.78592 5.78592 5.57078 6.00703 5.36161L6.35663 2.9144C7.04912 2.51566 7.79035 2.20832 8.56181 2.00006L10.5429 3.48811C10.8471 3.46121 11.153 3.46121 11.4572 3.48811L13.4383 2.00006C14.2101 2.20736 14.9515 2.51475 15.6435 2.9144L15.9931 5.36161C16.2202 5.57078 16.4353 5.78592 16.6385 6.00703L19.0857 6.35663C19.4845 7.04912 19.7918 7.79035 20.0001 8.56181L18.512 10.5429C18.512 10.5429 18.5389 11.1525 18.512 11.4572L20.0001 13.4383C19.7928 14.2101 19.4854 14.9515 19.0857 15.6435L16.6385 15.9931C16.6385 15.9931 16.2172 16.4323 15.9931 16.6385L15.6435 19.0857C14.951 19.4845 14.2098 19.7918 13.4383 20.0001L11.4572 18.512C11.153 18.5389 10.8471 18.5389 10.5429 18.512L8.56181 20.0001C7.79002 19.7928 7.04867 19.4854 6.35663 19.0857L6.00703 16.6385C5.78592 16.4293 5.57078 16.2142 5.36161 15.9931L2.9144 15.6435C2.51566 14.951 2.20832 14.2098 2.00006 13.4383L3.48811 11.4572ZM4.78567 17.123L2.7447 16.8314C2.37948 16.7793 2.05857 16.562 1.87448 16.2423C1.42401 15.46 1.07681 14.6226 0.841531 13.7511C0.745223 13.3943 0.81865 13.0131 1.04058 12.7176L2.27721 11.0713C2.27661 11.0265 2.27619 10.978 2.27613 10.9274L1.04058 9.28251C0.818972 8.98747 0.745419 8.60689 0.841134 8.25053C1.07558 7.37765 1.42324 6.53919 1.87524 5.75651C2.05947 5.4375 2.38002 5.22079 2.7447 5.16869L4.78566 4.87713C4.81604 4.84653 4.84653 4.81604 4.87713 4.78566L5.16869 2.7447C5.22087 2.37948 5.43813 2.05857 5.75783 1.87448C6.54014 1.42401 7.37752 1.07681 8.24906 0.841531C8.60581 0.745223 8.98705 0.81865 9.28251 1.04058L10.9172 2.26847C10.9724 2.26775 11.0277 2.26775 11.0829 2.26847L12.7176 1.04058C13.0126 0.818973 13.3932 0.745419 13.7496 0.841134C14.6225 1.07558 15.4609 1.42324 16.2436 1.87524C16.5626 2.05947 16.7793 2.38002 16.8314 2.7447L17.1223 4.78059C17.1549 4.81287 17.1874 4.8453 17.2196 4.87786L19.2554 5.16869C19.6206 5.22087 19.9415 5.43813 20.1256 5.75783C20.5761 6.54014 20.9233 7.37752 21.1586 8.24906C21.2549 8.60581 21.1815 8.98705 20.9595 9.28251L19.7229 10.9289C19.7235 10.9736 19.7239 11.0221 19.724 11.0727L20.9595 12.7176C21.1811 13.0126 21.2547 13.3932 21.159 13.7496C20.9245 14.6225 20.5769 15.4609 20.1249 16.2436C19.9406 16.5626 19.6201 16.7793 19.2554 16.8314L17.2127 17.1232C17.1841 17.1522 17.154 17.1825 17.1231 17.2135L16.8314 19.2554C16.7793 19.6206 16.562 19.9415 16.2423 20.1256C15.46 20.5761 14.6226 20.9233 13.7511 21.1586C13.3943 21.2549 13.0131 21.1815 12.7176 20.9595L11.0829 19.7316C11.0277 19.7324 10.9724 19.7324 10.9172 19.7316L9.28251 20.9595C8.98748 21.1811 8.60689 21.2547 8.25053 21.159C7.37765 20.9245 6.53919 20.5769 5.75651 20.1249C5.4375 19.9406 5.22079 19.6201 5.16869 19.2554L4.87713 17.2145C4.84653 17.1841 4.81604 17.1536 4.78567 17.123Z"
                    fill="#3078F1"
                />
            </svg>
        </button>

    )
}
