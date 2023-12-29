import SupplierCategoryAction from './action';

let initialState = {
    supplierCategoryList: [],
};

const SupplierCategoryRuducer = (state = initialState, action) => {
    switch (action.type) {
        case SupplierCategoryAction.FETCH_SEARCH_CATEGORY_SUCCESS:
            return {
                ...state,
                supplierCategoryList: action.payload
            };
        case SupplierCategoryAction.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                supplierList: action.payload
            };
        case SupplierCategoryAction.UNDO_CATEGORY_SUCCESS:
            return {
                ...state,
                supplierList: action.payload
            };
        case SupplierCategoryAction.RESET_CATEGORY_SUCCESS:
            return {
                ...state,
                supplierCategoryList: action.payload
            };

        case SupplierCategoryAction.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                supplierCategoryList: action.payload
            };
        case SupplierCategoryAction.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                supplierCategoryList: action.payload
            };
        default:
            return {
                ...state,
            };
    }
};

export default SupplierCategoryRuducer;
