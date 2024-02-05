import ApiConstants from 'adapter/ApiConstants';
import ApiOperation from 'adapter/ApiOperation';

const AccountService = {
    login: (payload) => {
        const data = payload.payload;
        return ApiOperation.request({
            url: ApiConstants.LOGIN,
            data: data,
            method: 'POST',
        });
    },
    me: () => {
        return ApiOperation.request({
            url: ApiConstants.AUTH,
            method: 'GET',
        });
    },
    logout: () => {
        return ApiOperation.request({
            url: ApiConstants.LOGOUT,
            method: 'GET',
        });
    },
    refreshToken: () => {
        return ApiOperation.request({
            url: ApiConstants.REFRESH_TOKEN,
            method: 'POST',
        });
    },
}

export default AccountService