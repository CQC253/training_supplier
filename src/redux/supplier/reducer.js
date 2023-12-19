import SupplierAction from './action';

let initialState = {
    supplierList: [],
    // isLoading: false
};

const SupplierReducer = (state = initialState, action) => {
    switch (action.type) {
        case SupplierAction.FETCH_SUPPLIER_SUCCESS:
            // console.log('action', action);
            return {
                ...state,
                supplierList: action.payload
            };
        case SupplierAction.SEARCH_SUPPLIER_SUCCESS:
            // console.log('action', action);
            return {
                ...state,
                supplierList: action.payload,
            };
        case SupplierAction.DELETE_SUPPLIER_SUCCESS:
            return {
                ...state,
            };
        case SupplierAction.CREATE_SUPPLIER_SUCCESS:
            return {
                ...state,
            };
        case SupplierAction.UPDATE_SUPPLIER_SUCCESS:
            return {
                ...state,
                supplierList: action.payload
            };
        case SupplierAction.RESET_SUPPLIER_SUCCESS:
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