import ApiCore from './ApiCore'

const ApiOperation = new ApiCore({
    fetchAll: true,
    fetchSingle: true,
    post: true,
    patch: true,
    remove: true,
    url: '',
    request: true,
})

export default ApiOperation
