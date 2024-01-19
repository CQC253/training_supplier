import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import SupplierService from './supplierService';

function* fetchSearchSupplierListSaga() {
    yield takeEvery(actions.FETCH_SEARCH_SUPPLIER_LIST, function* (payload) {
        try {
            const response = yield call(() =>
                SupplierService.getSuppliers(payload)
            );
            yield put({
                type: actions.FETCH_SEARCH_SUPPLIER_SUCCESS,
                payload: response.data.data
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

function* getSupplierByIdSaga() {
    yield takeEvery(actions.GET_SUPPLIER_BY_ID_START, function* (payload) {
        try {
            const response = yield call(() =>
                SupplierService.getSupplierById(payload)
            );
            yield put({
                type: actions.GET_SUPPLIER_BY_ID_SUCCESS,
                payload: response.data.data
            });
        } catch (error) {
            yield put({
                type: actions.GET_SUPPLIER_BY_ID_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* createSupplierSaga() {
    yield takeEvery(actions.CREATE_SUPPLIER_START, function* (payload) {
        try {
            const response = yield call(() =>
                SupplierService.createSupplier(payload)
            );
            yield put({
                type: actions.CREATE_SUPPLIER_SUCCESS,
                payload: response.data.data.item
            });
            payload.callBack && payload.callBack();
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
        try {
            const response = yield call(() =>
                SupplierService.updateSupplierStatus(payload)
            );
            yield put({
                type: actions.CHANGE_STATUS_SUPPLIER_SUCCESS,
                payload: response.data.data
            });

            const queryParams = new URLSearchParams(location.search);
            const inputValue = queryParams.get('input') || "";
            const statusValue = queryParams.get('status') ? (queryParams.get('status') == 'Giao dịch' ? 1 : 2) : "" || "";
            const addressValue = queryParams.get('address') || "";

            payload = {
                payload: {
                    inputValue: inputValue,
                    statusValue: statusValue,
                    addressValue: addressValue
                }
            }
            const search = yield call(() =>
                SupplierService.getSuppliers(payload)
            );
            yield put({
                type: actions.FETCH_SEARCH_SUPPLIER_SUCCESS,
                payload: search.data.data
            });

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
                SupplierService.updateSupplierStatus(payload)
            );
            yield put({
                type: actions.UPDATE_STATUS_SUPP_DETAIL_SUCCESS,
                payload: response.data.data
            });
        } catch (error) {
            yield put({
                type: actions.UPDATE_STATUS_SUPP_DETAIL_ERROR,
                payload: error
            });
        }
    });
}

function* deleteSupplierSaga() {
    yield takeEvery(actions.DELETE_SUPPLIER_START, function* (payload) {
        try {
            const response = yield call(() =>
                SupplierService.deleteSupplier(payload)
            );
            yield put({
                type: actions.DELETE_SUPPLIER_SUCCESS,
                payload: response.data.data
            });
            payload.callBack && payload.callBack();
        } catch (error) {
            yield put({
                type: actions.DELETE_SUPPLIER_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

export default function* SupplierSaga() {
    yield all([
        fork(fetchSearchSupplierListSaga),
        fork(getSupplierByIdSaga),
        fork(createSupplierSaga),
        fork(changeStatusSupplierSaga),
        fork(updateStatusSuppDetailSaga),
        fork(deleteSupplierSaga),
    ]);
}
