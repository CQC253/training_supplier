import SupplierCategoryAction from './action';

let initialState = {
    supplierCategoryList: {},
    listById: []
};

const SupplierCategoryRuducer = (state = initialState, action) => {
    switch (action.type) {
        case SupplierCategoryAction.FETCH_SEARCH_CATEGORY_SUCCESS:
            return {
                ...state,
                supplierCategoryList: action.payload
            };
        case SupplierCategoryAction.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                supplierCategoryList: action.payload
            };
        case SupplierCategoryAction.GET_CATEGORY_BY_ID_SUCCESS:
            return {
                ...state,
                listById: action.payload
            };
        case SupplierCategoryAction.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                supplierCategoryList: action.payload
            };
        case SupplierCategoryAction.DELETE_CATEGORY_SUCCESS:
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

export default SupplierCategoryRuducer;
