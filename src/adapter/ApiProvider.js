import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { setupInterceptersTo } from './AxiosConfig'

const BASE_URL = process.env.REACT_APP_API_URL

const api = setupInterceptersTo(
    axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': process.env.REACT_APP_API_KEY,
            'x-requestid': uuidv4(),
        },
    }),
)

export const fetchAll = (path, params) => {
    return api
        .get(`${BASE_URL}/${path}`, { params })
        .then((resp) => resp.data)
        .catch((error) => console.log(error))
}

export const fetchSingle = (path, id) => {
    return api
        .get(`${BASE_URL}/${path}/${id}`)
        .then((resp) => resp.data)
        .catch((error) => {console.log(error); throw error})
}

export const post = (path, model) => {
    return api
        .post(`${BASE_URL}/${path}`, model)
        .then((resp) => resp.data)
        .catch((error) => {console.log(error); throw error})
}

export const patch = (path, model) => {
    return api
        .patch(`${BASE_URL}/${path}`, model)
        .then((resp) => resp.data)
        .catch((error) => {console.log(error); throw error})
}

export const remove = (path, id) => {
    return api
        .delete(`${BASE_URL}/${path}/${id}`)
        .then((resp) => resp.data)
        .catch((error) => {console.log(error); throw error})
}
export const request = ({ url = '', method = 'GET', data = {}, params = {}, responseType = "json" }) => {
    return api
        .request({
            url: url,
            method: method,
            data: data,
            params: params,
            responseType: responseType
        })
        .then((resp) => {
            // console.log("resp.data",resp.data)
            return resp.data
        })
        .catch((error) => {console.log(error); throw error})
}