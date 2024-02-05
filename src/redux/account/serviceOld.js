import axios from "axios"

const SupplierService = {
    getSuppliers: (payload) => {
        
        return axios.get(`http://127.0.0.1:8000/api/v1/supplier?input=${payload.payload.inputValue}&status=${payload.payload.statusValue}&addressDetail=${payload.payload.addressValue}`);
    },
    getSupplierById: (payload) => {
        return axios.get(`http://127.0.0.1:8000/api/v1/supplier/${payload.payload.id}`);
    },
    createSupplier: (payload) => {
        const response = axios.post(`http://127.0.0.1:8000/api/v1/supplier`, payload.payload.info);
        return response;
    },
    updateSupplier: (payload) => {
        const response = axios.put(`http://127.0.0.1:8000/api/v1/supplier/${payload.payload.id}`, payload.payload.info);
        return response;
    },
    updateSupplierStatus: (payload) => {
        const response = axios.put(`http://127.0.0.1:8000/api/v1/supplier/${payload.payload.id}/status`, { status: payload.payload.status});
        return response
    },
    deleteSupplier: (payload) => {
        return axios.delete(`http://127.0.0.1:8000/api/v1/supplier/${payload.payload.id}`);
    },
}

export default SupplierService
//--------------------