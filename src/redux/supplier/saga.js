import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import factories from './factory'

function* fetchSupplierListSaga() {
    yield takeEvery(actions.FETCH_SUPPLIER_LIST, function* () {
        // console.log('payload', payload);
        try {
            // Lấy dữ liệu từ localStorage
            const supplierList = yield call(() =>
                factories.fetchSupplierList()
            );
            // console.log('supplierList', supplierList);
            yield put({
                type: actions.FETCH_SUPPLIER_SUCCESS,
                payload: supplierList.Data
            });
        } catch (error) {
            yield put({
                type: actions.FETCH_SUPPLIER_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* searchSupplierSaga() {
    yield takeEvery(actions.SEARCH_SUPPLIER_START, function* ( payload ) {
        // console.log('payload saga',payload);
        try {
            const response = yield call(() =>
                factories.searchSupplierList(payload)
            );
            yield put({
                type: actions.SEARCH_SUPPLIER_SUCCESS,
                payload: response.Data
            });
        } catch (error) {
            yield put({
                type: actions.SEARCH_SUPPLIER_ERROR,
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
        fork(fetchSupplierListSaga),
        fork(createSupplierSaga),
        fork(updateSupplierSaga),
        fork(deleteSupplierSaga),
        fork(searchSupplierSaga),
        fork(resetSupplierSaga),
    ]);
}
