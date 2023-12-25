import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import factories from './factory'

function* fetchSearchSupplierListSaga() {
    yield takeEvery(actions.FETCH_SEARCH_SUPPLIER_LIST, function* (payload) {
        // console.log('payload saga', payload);
        try {
            const response = yield call(() =>
                factories.fetchAndSearchData(payload)
            );
            yield put({
                type: actions.FETCH_SEARCH_SUPPLIER_SUCCESS,
                payload: response.Data
            });
        } catch (error) {
            yield put({
                type: actions.SEARCH_CATEGORY_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* searchCategorySaga() {
    yield takeEvery(actions.SEARCH_CATEGORY_START, function* (payload) {
        // console.log('payload saga', payload);
        try {
            const response = yield call(() =>
                factories.searchCategoryData(payload)
            );
            yield put({
                type: actions.SEARCH_CATEGORY_SUCCESS,
                payload: response.Data
            });
        } catch (error) {
            yield put({
                type: actions.FETCH_SEARCH_SUPPLIER_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* deleteSupplierSaga() {
    yield takeEvery(actions.DELETE_SUPPLIER_START, function* (payload) {
        // console.log('payload saga', payload);
        try {
            const response = yield call(() =>
                factories.deleteSupplierList(payload)
            );
            yield put({
                type: actions.DELETE_SUPPLIER_SUCCESS,
                payload: response.Data
            });

            // Lấy giá trị từ URL query params
            const queryParams = new URLSearchParams(location.search);
            const inputValue = queryParams.get('input') || '';
            const statusValue = queryParams.get('status') ? (queryParams.get('status') == 'Giao dịch' ? 1 : 2) : '' || '';
            const addressValue = queryParams.get('address') || '';

            payload = {
                payload: {
                    inputValue: inputValue,
                    statusValue: statusValue,
                    addressValue: addressValue
                }
            };
            const search = yield call(() =>
                factories.fetchAndSearchData(payload)
            );
            yield put({
                type: actions.FETCH_SEARCH_SUPPLIER_SUCCESS,
                payload: search.Data
            });
        } catch (error) {
            yield put({
                type: actions.DELETE_SUPPLIER_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* undoSupplierSaga() {
    yield takeEvery(actions.UNDO_SUPPLIER_START, function* (payload) {
        try {
            const response = yield call(() =>
                factories.undoSupplierList(payload)
            );
            yield put({
                type: actions.UNDO_SUPPLIER_SUCCESS,
                payload: response.Data
            });

            // Lấy giá trị từ URL query params
            const queryParams = new URLSearchParams(location.search);
            const inputValue = queryParams.get('input') || '';
            const statusValue = queryParams.get('status') ? (queryParams.get('status') == 'Giao dịch' ? 1 : 2) : '' || '';
            const addressValue = queryParams.get('address') || '';

            payload = {
                payload: {
                    inputValue: inputValue,
                    statusValue: statusValue,
                    addressValue: addressValue
                }
            }
            const search = yield call(() =>
                factories.fetchAndSearchData(payload)
            );
            yield put({
                type: actions.FETCH_SEARCH_SUPPLIER_SUCCESS,
                payload: search.Data
            });
        } catch (error) {
            yield put({
                type: actions.UNDO_SUPPLIER_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* createSupplierSaga() {
    yield takeEvery(actions.CREATE_SUPPLIER_START, function* (payload) {
        // console.log('payload saga', payload);
        try {
            const response = yield call(() =>
                factories.createSupplierList(payload)
            );
            yield put({
                type: actions.CREATE_SUPPLIER_SUCCESS,
                payload: response.Data
            });
        } catch (error) {
            yield put({
                type: actions.CREATE_SUPPLIER_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* changeStatusSupplierSaga() {
    yield takeEvery(actions.CHANGE_STATUS_SUPPLIER_START, function* (payload) {
        // console.log('payload saga 1st', payload);
        const shouldSearch = payload.payload.shouldSearch;
        try {
            const response = yield call(() =>
                factories.changeStatusSupplierList(payload)
            );
            yield put({
                type: actions.CHANGE_STATUS_SUPPLIER_SUCCESS,
                payload: response.Data
            });
            // console.log('response saga 1nd', response);
            // console.log('payload response saga 1nd', payload);

            if (shouldSearch) {
                // Lấy giá trị từ URL query params
                const queryParams = new URLSearchParams(location.search);
                const inputValue = queryParams.get('input') || '';
                const statusValue = queryParams.get('status') ? (queryParams.get('status') == 'Giao dịch' ? 1 : 2) : '' || '';
                const addressValue = queryParams.get('address') || '';

                payload = {
                    payload: {
                        inputValue: inputValue,
                        statusValue: statusValue,
                        addressValue: addressValue
                    }
                }
                // console.log('payload saga 2nd', payload);
                const response = yield call(() =>
                    factories.fetchAndSearchData(payload)
                );
                // console.log('response saga 2nd', response);
                yield put({
                    type: actions.FETCH_SEARCH_SUPPLIER_SUCCESS,
                    payload: response.Data
                });
            }
        } catch (error) {
            yield put({
                type: actions.CHANGE_STATUS_SUPPLIER_ERROR,
                payload: error
            });
        }
    });
}

function* updateStatusSuppDetailSaga() {
    yield takeEvery(actions.UPDATE_STATUS_SUPP_DETAIL_START, function* (payload) {
        try {
            const response = yield call(() =>
                factories.updateStatusSuppDetail(payload)
            );
            yield put({
                type: actions.UPDATE_STATUS_SUPP_DETAIL_SUCCESS,
                payload: response.Data
            });
        } catch (error) {
            yield put({
                type: actions.UPDATE_STATUS_SUPP_DETAIL_ERROR,
                payload: error
            });
        }
    });
}

function* resetSupplierSaga() {
    yield takeEvery(actions.RESET_SUPPLIER_START, function* () {
        // console.log('payload', payload);
        try {
            // Lấy dữ liệu từ localStorage
            const supplierList = yield call(() =>
                factories.resetSupplierList()
            );
            // console.log('supplierList', supplierList);
            yield put({
                type: actions.RESET_SUPPLIER_SUCCESS,
                payload: supplierList.Data
            });
        } catch (error) {
            yield put({
                type: actions.RESET_SUPPLIER_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

export default function* SupplierSaga() {
    yield all([
        fork(fetchSearchSupplierListSaga),
        fork(searchCategorySaga),
        fork(deleteSupplierSaga),
        fork(undoSupplierSaga),
        fork(createSupplierSaga),
        fork(changeStatusSupplierSaga),
        fork(updateStatusSuppDetailSaga),
        fork(resetSupplierSaga),
    ]);
}
