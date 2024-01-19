import axios from "axios"

const CategoryService = {
    getCategories: (payload) => {
        const response = axios.get(`http://127.0.0.1:8000/api/v1/category?input=${payload.payload.inputValue}`)
        return response;
    },
    getCategoryById: (payload) => {
        return axios.get(`http://127.0.0.1:8000/api/v1/category/${payload.payload.id}`);
    },
    createCategory: (payload) => {
        const response = axios.post(`http://127.0.0.1:8000/api/v1/category`, payload.payload.info);
        return response;
    },
    updateCategory: (payload) => {
        const response = axios.put(`http://127.0.0.1:8000/api/v1/category/${payload.payload.id}`, payload.payload.info);
        return response;
    },
    deleteCategory: (payload) => {
        return axios.delete(`http://127.0.0.1:8000/api/v1/category/${payload.payload.id}`);
    },
}

export default CategoryService