import React from 'react'

export default function IconStatus({ onClick, onBlur }) {
    return (
        <svg
            onClick={onClick}
            onBlur={onBlur}
            xmlns="http://www.w3.org/2000/svg"
            width={17}
            height={16}
            viewBox="0 0 17 16"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.49995 2.5C6.64195 2.5 4.99845 3.42125 4.00238 4.83333H5.16662C5.44276 4.83333 5.66662 5.05719 5.66662 5.33333C5.66662 5.60948 5.44276 5.83333 5.16662 5.83333H3.12363C2.90483 5.83333 2.71144 5.69107 2.6463 5.48218L2.02262 3.48218C1.94041 3.21856 2.08748 2.93821 2.3511 2.856C2.61472 2.7738 2.89507 2.92086 2.97728 3.18448L3.27362 4.13479C4.45737 2.53683 6.35725 1.5 8.49995 1.5C11.0528 1.5 13.261 2.97177 14.324 5.11082C14.4469 5.35811 14.3461 5.6582 14.0988 5.78109C13.8515 5.90398 13.5514 5.80314 13.4285 5.55585C12.5279 3.74365 10.6587 2.5 8.49995 2.5ZM2.90111 10.2189C3.1484 10.096 3.44849 10.1969 3.57139 10.4442C4.47197 12.2564 6.34119 13.5 8.49995 13.5C10.3579 13.5 12.0015 12.5788 12.9975 11.1667H11.8333C11.5571 11.1667 11.3333 10.9428 11.3333 10.6667C11.3333 10.3905 11.5571 10.1667 11.8333 10.1667H13.8763C14.0951 10.1667 14.2885 10.3089 14.3536 10.5178L14.9773 12.5178C15.0595 12.7814 14.9124 13.0618 14.6488 13.144C14.3852 13.2262 14.1048 13.0791 14.0226 12.8155L13.7263 11.8652C12.5425 13.4632 10.6426 14.5 8.49995 14.5C5.94709 14.5 3.73889 13.0282 2.67587 10.8892C2.55298 10.6419 2.65382 10.3418 2.90111 10.2189Z"
                fill="#138300"
            />
        </svg>

    )
}
