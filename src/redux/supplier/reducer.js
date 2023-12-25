import SupplierAction from './action';

let initialState = {
    supplierList: [],
    // isLoading: false
};

const SupplierReducer = (state = initialState, action) => {
    switch (action.type) {
        case SupplierAction.FETCH_SEARCH_SUPPLIER_SUCCESS:
            // console.log('action', action);
            return {
                ...state,
                supplierList: action.payload
            };
        case SupplierAction.DELETE_SUPPLIER_SUCCESS:
            return {
                ...state,
                supplierList: action.payload
            };
        case SupplierAction.UNDO_SUPPLIER_SUCCESS:
            return {
                ...state,
                supplierList: action.payload
            };
        case SupplierAction.CREATE_SUPPLIER_SUCCESS:
            return {
                ...state,
            };
        case SupplierAction.CHANGE_STATUS_SUPPLIER_SUCCESS:
            return {
                ...state,
                supplierList: action.payload
            };
        case SupplierAction.UPDATE_STATUS_SUPP_DETAIL_SUCCESS:
            return {
                ...state,
                supplierList: action.payload
            };
        case SupplierAction.RESET_SUPPLIER_SUCCESS:
            return {
                ...state,
                supplierList: action.payload
            };

        //category
        case SupplierAction.SEARCH_CATEGORY_SUCCESS:
            return {
                ...state,
                supplierList: action.payload
            };
        default:
            return {
                ...state,
            };
    }
};

export default SupplierReducer;
