/**
 * ****************************************************************************
 * @description     :   Get old value of state
 * @created at      :   2020/12/03
 * @created by      :   QuyPN - quy.pham@toploop.co
 * @package         :   dashlite-admin-react
 * @copyright       :   Copyright (c) TOPLOOP
 * @version         :   1.0.0
 * ****************************************************************************
 */

import { useRef, useEffect } from 'react';

/**
 * Get old value of state
 * -----------------------------------------
 * @author : QuyPN - 2020/12/03 - create
 * @param  : {any} value - current value
 * @param  : {any} - previous before change to current value
 * @access : public
 * @example
 * import React, { useRef, useState } from "react";
 * import usePrevious from "../hooks/use-preview";
 *
 * const ComponentA = (props) => {
 *     const [count, setCount] = useState(0);
 *     const prevCount = usePrevious(count);
 *
 *     return (
 *          <div>
 *              <h1>Now: {count}, before: {prevCount}</h1>
 *              <button onClick={() => setCount(count + 1)}>Increment</button>
 *          </div>
 *     );
 * }
 *
 * export default React.memo(ComponentA);
 */
const usePrevious = (value) => {
    /**
     * The ref object is a generic container whose current property is mutable
     * and can hold any value, similar to an instance property on a class
     */
    const ref = useRef();

    /**
     * Store current value in ref
     */
    useEffect(() => {
        ref.current = value;
    }); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
};

export default usePrevious
