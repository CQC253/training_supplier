/**
 * ****************************************************************************
 * @description     :   Detect click outside of a element
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
import { useEffect } from 'react';

/**
 * Detect click outside of a element
 * -----------------------------------------
 * @author : QuyPN - 2020/12/03 - create
 * @param  : {Object} ref - Element need to check click outfiz
 * @param  : {function} handler - Function to process when click outside ref
 * @access : public
 * @example
 * import React, { useRef, useState } from "react";
 * import useOnClickOutside from "../hooks/use-onclick-outside";
 *
 * const ComponentA = (props) => {
 *     const ref = useRef();
 *     useOnClickOutside(ref, (event) => {
 *         // Dosomething
 *     });
 *     return (
 *         <div ref={ref}>
 *             Click out me
 *         </div>
 *     )
 * }
 *
 * export default React.memo(ComponentA);
 */
function useOnClickOutside(ref, handler) {
    useEffect(() => {
    /**
         * Check is click outfiz or not, if click outfiz then do handler
         * -----------------------------------------
         * @author : QuyPN - 2020/12/03 - create
         * @param  : {Object} event - Event click or touch
         * @access : private
         */
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            // if click outfiz then do handler
            handler(event);
        };

        // listen event
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        // remove event handler when unmount component
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}

export default useOnClickOutside;
