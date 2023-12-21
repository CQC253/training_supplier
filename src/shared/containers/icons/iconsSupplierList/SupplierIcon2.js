import React from 'react'

export default function SupplierIcon2(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props?.width ?? 20}
            height={props?.height ?? 20}
            viewBox="0 0 20 20"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.137 6.67182C17.3643 6.93159 17.338 7.32644 17.0782 7.55374L10.4115 13.3871C10.1759 13.5933 9.82403 13.5933 9.58838 13.3871L2.92172 7.55374C2.66194 7.32644 2.63562 6.93159 2.86292 6.67182C3.09022 6.41204 3.48507 6.38572 3.74485 6.61302L9.99995 12.0862L16.2551 6.61302C16.5148 6.38572 16.9097 6.41204 17.137 6.67182Z"
                fill={props?.color ?? "#CCC"}
            />
        </svg>
    )
}
