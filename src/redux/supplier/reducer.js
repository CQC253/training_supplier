import SupplierAction from './action';

let initialState = {
    supplierList: [],
};

const SupplierReducer = (state = initialState, action) => {
    switch (action.type) {
        case SupplierAction.FETCH_SEARCH_SUPPLIER_SUCCESS:
            return {
                ...state,
                supplierList: action.payload
            };
        case SupplierAction.GET_SUPPLIER_BY_ID_SUCCESS:
            return {
                ...state,
                supplierList: action.payload
            };
        case SupplierAction.CREATE_SUPPLIER_SUCCESS:
            return {
                ...state,
                supplierList: action.payload
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
        case SupplierAction.DELETE_SUPPLIER_SUCCESS:
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
