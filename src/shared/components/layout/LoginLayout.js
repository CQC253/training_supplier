import React from 'react';
import styles from "./Layout.module.scss"
function LoginLayout(props) {
    return (
        <div className={styles["LoginLayout"]}>
            {props.children}
        </div>
    )
}
export default LoginLayout;