/**
 * ****************************************************************************
 * @description     :   Detect when resize window and get new size
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
import React from 'react';

/**
 * Hook that monitors window resize. It returns the current size of windows.
 * -----------------------------------------
 * @author : QuyPN - 2020/12/03 - create
 * @returns: {Object} - current size of windows.
 * @access : public
 * @example
 * import React, { useRef, useState } from "react";
 * import useWindowSize from "../hooks/use-window-size";
 *
 * const ComponentA = (props) => {
 *     const [size, setSize] = useState({});
 *     const windowSize = useWindowSize();
 *     useEffect(() => {
 *       setSize({
 *          ...windowSize
 *       });
 *     }, [windowSize]);
 *
 *     return (
 *          <div>
 *              <p>width: {size.width}</p>
 *              <p>height: {size.height}</p>
 *          </div>
 *     );
 * }
 *
 * export default React.memo(ComponentA);
 */
const useWindowSize = () => {
    /**
     * check hook run in client or server.
     * If run on server then windows size is undefined
     */
    const isClient = typeof window === 'object';

    /**
     * Get curent size of windows
     * -----------------------------------------
     * @author : QuyPN - 2020/12/03 - create
     * @returns: {Object} - data size of windows
     * @access : public
     */
    const getSize = React.useCallback(
        () => ({
            /**
             * Current width of windows
             */
            width: isClient ? window.innerWidth : undefined,
            /**
             * Current height of windows
             */
            height: isClient ? window.innerHeight : undefined,
        }),
        [isClient],
    );

    // state of component to save value of size of windows
    const [size, setSize] = React.useState(getSize);

    React.useEffect(() => {
        if (!isClient) {
            return false;
        }
        /**
         * Change data of windows size when resize
         * -----------------------------------------
         * @author : QuyPN - 2020/12/03 - create
         * @access : private
         */
        const onHandleResize = () => {
            setSize(getSize);
        };

        // listen event
        window.addEventListener('resize', onHandleResize);

        // remove event handler when unmount component
        return () => window.removeEventListener('resize', onHandleResize);
    }, [getSize, isClient]);

    // Return size of windows
    return size;
};

export default useWindowSize;
