import ApiConstants from 'adapter/ApiConstants';
import ApiOperation from 'adapter/ApiOperation';

const CategoryService = {
    getCategories: (payload) => {
        return ApiOperation.fetchAll({
            url: ApiConstants.GET_CATEGORIES,
            params: { 
                input: payload.payload.inputValue
            },
        });
    },
    getCategoryById: (payload) => {
        const id = payload.payload.id;
        return ApiOperation.fetchSingle({
            url: ApiConstants.GET_CATEGORY_BY_ID(id),
        })
    },
    createCategory: (payload) => {
        const info = payload.payload.info;
        return ApiOperation.post({
            url: ApiConstants.CREATE_CATEGORY,
            info: info,
        });
    },
    updateCategory: (payload) => {
        const id = payload.payload.id;
        const info= payload.payload.info;
        return ApiOperation.request({
            url: ApiConstants.UPDATE_CATEGORY(id),
            data: info,
            method: 'PUT',
        });
    },
    deleteCategory: (payload) => {
        const id = payload.payload.id;
        return ApiOperation.remove({
            url: ApiConstants.DELETE_CATEGORY(id),
        });
    },
}

export default CategoryService