import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import factories from './factory'

function* fetchSearchSupplierListSaga() {
    yield takeEvery(actions.FETCH_SEARCH_SUPPLIER_LIST, function* (payload) {
        console.log('payload', payload);
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
                type: actions.FETCH_SEARCH_SUPPLIER_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* searchStatusSupplierSaga() {
    yield takeEvery(actions.SEARCH_SUPPLIER_STATUS_START, function* ( payload ) {
        // console.log('payload saga',payload);
        try {
            const response = yield call(() =>
                factories.searchStatusSupplierList(payload)
            );
            yield put({
                type: actions.SEARCH_SUPPLIER_STATUS_SUCCESS,
                payload: response.Data
            });
        } catch (error) {
            yield put({
                type: actions.SEARCH_SUPPLIER_STATUS_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* searchAddressSupplierSaga() {
    yield takeEvery(actions.SEARCH_SUPPLIER_ADDRESS_START, function* ( payload ) {
        // console.log('payload saga',payload);
        try {
            const response = yield call(() =>
                factories.searchAddressSupplierList(payload)
            );
            yield put({
                type: actions.SEARCH_SUPPLIER_ADDRESS_SUCCESS,
                payload: response.Data
            });
        } catch (error) {
            yield put({
                type: actions.SEARCH_SUPPLIER_ADDRESS_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* deleteSupplierSaga() {

}

function* createSupplierSaga() {

}

function* updateSupplierSaga() {
    yield takeEvery(actions.UPDATE_SUPPLIER_START, function* (payload) {

        try {
            const response = yield call(() =>
                factories.updateSupplierList(payload)
            );
            yield put({
                type: actions.UPDATE_SUPPLIER_SUCCESS,
                payload: response.Data
            })
        } catch (error) {
            // console.error(error);
            yield put({
                type: actions.UPDATE_SUPPLIER_ERROR,
                payload: error
            });
        } finally {

        }
    })
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
        fork(searchStatusSupplierSaga),
        fork(searchAddressSupplierSaga),
        fork(deleteSupplierSaga),
        fork(createSupplierSaga),
        fork(updateSupplierSaga),
        fork(resetSupplierSaga),
    ]);
}
