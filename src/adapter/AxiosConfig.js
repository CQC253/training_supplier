import AppConfig from 'utils/AppConfig'

const BASE_URL = process.env.REACT_APP_API_URL
const onRequest = (config) => {
    let token = localStorage.getItem("token")
    // config.headers.Authorization = `Bearer ${AppConfig.ACCESS_TOKEN}`
    config.headers.Authorization = `Bearer ${token}`
    return config
}

const onRequestError = (error) => {
    Promise.reject(error)
}

const onResponse = (response) => response

const onResponseError = async (error) => {
    if (error.response) {
        // Access Token expired
        if (
            error.response.status === 401 &&
            error.response.data.message === 'jwt expired'
        ) {
            try {
                
            } catch (_error) {
                return Promise.reject(_error)
            }
        }
    }
    return Promise.reject(error)
}

export const setupInterceptorsTo = (axiosInstance) => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError)
    axiosInstance.interceptors.response.use(onResponse, onResponseError)
    return axiosInstance
}