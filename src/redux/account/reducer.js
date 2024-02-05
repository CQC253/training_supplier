import AccountAction from './action';

let initialState = {
    Account: [],
};

const AccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case AccountAction.LOGIN_SUCCESS:
            return {
                ...state,
                Account: action.payload
            };
        case AccountAction.ME_SUCCESS:
            return {
                ...state,
                Account: action.payload
            }; 
        case AccountAction.LOGOUT_SUCCESS:
            return {
                ...state,
                Account: action.payload
            };
        case AccountAction.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                Account: action.payload
            };
        default:
            return {
                ...state,
            };
    }
};

export default AccountReducer;
