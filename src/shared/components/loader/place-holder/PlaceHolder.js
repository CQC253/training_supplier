import React from 'react';
import styles from "./PlaceHolder.module.scss"
function PlaceHolder (props) {
    return (
        <div className={styles["placeholder-content"]}>
            <div className={styles["placeholder-content_item"]}></div>
        </div>
    )
}
export default PlaceHolder;