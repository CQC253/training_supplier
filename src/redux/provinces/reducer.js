import ProvincesActions from './action';

const initialState = {
    provinces: [],
    districts: [],
    wards: [],
};

const ProvincesReducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case ProvincesActions.FETCH_PROVINCES_SUCCESS:
            return {
                ...state,
                provinces: action.payload,
                districts: [],
                wards: [],
            };
        case ProvincesActions.FETCH_DISTRICTS_SUCCESS:
            return {
                ...state,
                districts: action.payload,
                wards: [],
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
