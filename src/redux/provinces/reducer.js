import ProvincesActions from './action';

const initialState = {
    provinces: [],
    districts: [],
    wards: [],
};

const ProvincesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ProvincesActions.FETCH_PROVINCES_SUCCESS:
            return {
                ...state,
                provinces: action.payload,
            };
        case ProvincesActions.FETCH_DISTRICTS_SUCCESS:
            return {
                ...state,
                districts: action.payload,
            };
        case ProvincesActions.FETCH_WARDS_SUCCESS:
            return {
                ...state,
                wards: action.payload,
            };
        default:
            return state;
    }
};

export default ProvincesReducer;
