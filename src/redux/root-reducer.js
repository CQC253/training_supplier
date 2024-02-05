/**
 * ****************************************************************************
 * @description     :   Combinie all reducers on app
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
import { combineReducers } from 'redux';
import SupplierReducer from './supplier/reducer';
import AppReducer from './app/reducer'
import SupplierCategoryReducer from './category/reducer'
import ProvincesReducer from './provinces/reducer'
import AccountReducer from './account/reducer';

const rootReducer = combineReducers({
    SupplierReducer,
    App: AppReducer,
    SupplierCategoryReducer,
    ProvincesReducer,
    AccountReducer
});

export default rootReducer;
