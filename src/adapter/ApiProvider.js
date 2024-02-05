import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { setupInterceptorsTo } from './AxiosConfig'

const BASE_URL = process.env.REACT_APP_API_URL
const api = setupInterceptorsTo(
    axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.REACT_APP_API_KEY,
            'x-requestid': uuidv4(),
        },
    }),
)

export const fetchAll = (url, params) => {
    return api
        // .get(`${BASE_URL}/${path}`, { params })
        .get(`${url}`, { params })
        .then((resp) => resp.data)
        .catch((error) => console.log(error))
}

export const fetchSingle = (url) => {
    console.log();
    return api
        // .get(`${BASE_URL}/${path}/${id}`)
        .get(`${url}`)
        .then((resp) => resp.data)
        .catch((error) => { console.log(error); throw error })
}

export const post = (url, data) => {
    return api
        // .post(`${BASE_URL}/${path}`, model)
        .post(`${url}`, data)
        .then((resp) => resp.data)
        .catch((error) => { console.log(error); throw error })
}

export const patch = (url, data) => {
    return api
        // .patch(`${BASE_URL}/${path}`, model)
        .patch(`${url}`, data)
        .then((resp) => resp.data)
        .catch((error) => { console.log(error); throw error })
}

export const remove = (url) => {
    return api
        // .delete(`${BASE_URL}/${path}/${id}`)
        .delete(`${url}`)
        .then((resp) => resp.data)
        .catch((error) => { console.log(error); throw error })
}
export const request = ({ url = '', method = 'GET', data = {}, params = {}, responseType = "json" }) => {

    return api
        .request({
            url: url,
            method: method,
            data: data,
            params: params,
            responseType: responseType,
        })
        .then((resp) => {
            // console.log("resp.data",resp.data)
            return resp.data
        })
        .catch((error) => { 
            console.log(error); throw error
        })
}