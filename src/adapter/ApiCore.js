import * as apiProvider from './ApiProvider'

const ApiCore = (function () {
    return function (options) {
        const _this = this
        if (options.fetchAll) {
            this.fetchAll = function (params) {
                return apiProvider.fetchAll(_this.url, params)
            }
        }
        if (options.fetchSingle) {
            this.fetchSingle = function (id) {
                return apiProvider.fetchSingle(_this.url, id)
            }
        }
        if (options.post) {
            this.post = function (model) {
                return apiProvider.post(_this.url, model)
            }
        }
        if (options.remove) {
            this.remove = function (id) {
                return apiProvider.remove(_this.url, id)
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
