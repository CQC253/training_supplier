const BASE_PREFIX = '/'

const ApiConstants = {
    LOGIN: `${BASE_PREFIX}/auth/login`,
    LOGOUT: `${BASE_PREFIX}/auth/login/logout`,
    REFRESH_TOKEN: `${BASE_PREFIX}/auth/login/refresh-token`,
    AUTH: `${BASE_PREFIX}/auth/me`,
}

export default ApiConstants

export { BASE_PREFIX }
