import ApiConstants from 'adapter/ApiConstants';
import ApiOperation from 'adapter/ApiOperation';

const SupplierService = {
    getSuppliers: (payload) => {
        return ApiOperation.fetchAll({
            url: ApiConstants.GET_SUPPLIERS,
            params: { 
                input: payload.payload.inputValue, 
                status: payload.payload.statusValue, 
                addressDetail: payload.payload.addressValue 
            },
        });
    },
    getSupplierById: (payload) => {
        const id = payload.payload.id;
        return ApiOperation.fetchSingle({
            url: ApiConstants.GET_SUPPLIER_BY_ID(id),
        })
    },
    createSupplier: (payload) => {
        const info = payload.payload.info;
        return ApiOperation.post({
            url: ApiConstants.CREATE_SUPPLIER,
            info: info,
        });
    },
    updateSupplier: (payload) => {
        const id = payload.payload.id;
        const data= payload.payload.info;
        return ApiOperation.request({
            url: ApiConstants.UPDATE_SUPPLIER(id),
            data: data,
            method: 'PUT',
        });
    },
    updateSupplierStatus: (payload) => {
        const id = payload.payload.id;
        const status= payload.payload.status;
        return ApiOperation.request({
            url: ApiConstants.UPDATE_SUPPLIER_STATUS(id),
            data: { status: status },
            method: 'PUT',
        });
    },
    deleteSupplier: (payload) => {
        const id = payload.payload.id;
        return ApiOperation.remove({
            url: ApiConstants.DELETE_SUPPLIER(id),
        });
    },
};

export default SupplierService;