/**
 * ****************************************************************************
 * @description     :   Detect when scroll and get position of scroll
 * @created at      :   2020/12/03
 * @created by      :   QuyPN - quy.pham@toploop.co
 * @package         :   dashlite-admin-react
 * @copyright       :   Copyright (c) TOPLOOP
 * @version         :   1.0.0
 * ****************************************************************************
 */

/**
 * import libraries
 */
import { useState, useEffect } from 'react';

/**
 * Get curent position of scroll
 * -----------------------------------------
 * @author : QuyPN - 2020/12/03 - create
 * @returns: {Object} - data position of scroll
 * @access : public
 */
const getScroll = () => ({
    /**
     * Position of horizontal scroll
     */
    scrollX: (window && window.scrollX) || 0,
    /**
     * Position of vertical scroll
     */
    scrollY: (window && window.scrollY) || 0,
});

/**
 * Hook that monitors window scroll, and updates the object
 * at the end of each window scroll. It returns the current
 * offset X and Y position.
 * -----------------------------------------
 * @author : QuyPN - 2020/12/03 - create
 * @param  : {bool} onlyOnScrollEnd - If true, fires the event only when the user stops scrolling.
 * @returns: {Object} - data position of scroll
 * @access : public
 * @example
 * import React, { useRef, useState } from "react";
 * import useWindowScroll from "../hooks/use-window-scroll";
 *
 * const ComponentA = (props) => {
 *     const [scroll, setScroll] = useState({});
 *     const windowScroll = useWindowScroll();
 *     useEffect(() => {
 *       setScroll({
 *          ...windowScroll
 *       });
 *     }, [windowScroll]);
 *
 *     return (
 *          <div>
 *              <p>scrollX: {scroll.scrollX}</p>
 *              <p>scrollY: {scroll.scrollY}</p>
 *          </div>
 *     );
 * }
 *
 * export default React.memo(ComponentA);
 */
export default function useWindowScroll(onlyOnScrollEnd = true) {
    // state of component to save value of position of scroll
    const [windowScroll, setWindowScroll] = useState(getScroll());

    useEffect(() => {
        let scrollId;
        /**
         * Change data of position scroll when user scroll
         * -----------------------------------------
         * @author : QuyPN - 2020/12/03 - create
         * @access : private
         */
        const handleScroll = () => {
            if (onlyOnScrollEnd) {
                clearTimeout(scrollId);
                scrollId = setTimeout(() => setWindowScroll(getScroll()), 200);
            } else {
                setWindowScroll(getScroll());
            }
        };

        // listen event
        window.addEventListener('scroll', handleScroll);

        // remove event handler when unmount component
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Return position of scroll
    return windowScroll;
}
