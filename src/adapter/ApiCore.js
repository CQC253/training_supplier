import * as apiProvider from './ApiProvider'

const ApiCore = (function () {
    return function (options) {
        const _this = this
        if (options.fetchAll) {
            this.fetchAll = function (params) {
                return apiProvider.fetchAll(params.url, params.params)
            }
        }
        if (options.fetchSingle) {
            this.fetchSingle = function (params) {
                return apiProvider.fetchSingle(params.url)
            }
        }
        if (options.post) {
            this.post = function (params) {
                return apiProvider.post(params.url, params.info)
            }
        }
        if (options.remove) {
            this.remove = function (params) {
                return apiProvider.remove(params.url)
            }
        }
        if (options.request) {
            this.request = function ({ url, data, params, method, responseType }) {

                return apiProvider.request({
                    url: url,
                    method: method,
                    params: params,
                    data: data,
                    responseType: responseType,
                })
            }
        }
    }
})()

export default ApiCore
