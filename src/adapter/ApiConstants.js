const BASE_PREFIX = 'http://127.0.0.1:8000/api/v1'

const ApiConstants = {
    //auth
    LOGIN: `${BASE_PREFIX}/auth/login`,
    LOGOUT: `${BASE_PREFIX}/auth/logout`,
    REFRESH_TOKEN: `${BASE_PREFIX}/auth/refresh-token`,
    AUTH: `${BASE_PREFIX}/auth/me`,
    //supplier
    GET_SUPPLIERS: `${BASE_PREFIX}/supplier`,
    GET_SUPPLIER_BY_ID: (id) => `${BASE_PREFIX}/supplier/${id}`,
    CREATE_SUPPLIER: `${BASE_PREFIX}/supplier`,
    UPDATE_SUPPLIER: (id) => `${BASE_PREFIX}/supplier/${id}`,
    UPDATE_SUPPLIER_STATUS: (id) => `${BASE_PREFIX}/supplier/${id}/status`,
    DELETE_SUPPLIER: (id) => `${BASE_PREFIX}/supplier/${id}`,
    //category
    GET_CATEGORIES: `${BASE_PREFIX}/category`,
    GET_CATEGORY_BY_ID: (id) => `${BASE_PREFIX}/category/${id}`,
    CREATE_CATEGORY: `${BASE_PREFIX}/category`,
    UPDATE_CATEGORY: (id) => `${BASE_PREFIX}/category/${id}`,
    DELETE_CATEGORY: (id) => `${BASE_PREFIX}/category/${id}`,
}

export default ApiConstants

export { BASE_PREFIX }
