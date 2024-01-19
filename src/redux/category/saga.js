import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import CategoryService from './categoryService';

function* fetchAndSearchCategorySaga() {
    yield takeEvery(actions.FETCH_SEARCH_CATEGORY_START, function* (payload) {
        try {
            const response = yield call(() =>
                CategoryService.getCategories(payload)
            );
            yield put({
                type: actions.FETCH_SEARCH_CATEGORY_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            yield put({
                type: actions.FETCH_SEARCH_CATEGORY_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* getCategoryByIdSaga() {
    yield takeEvery(actions.GET_CATEGORY_BY_ID_START, function* (payload) {
        try {
            const response = yield call(() =>
                CategoryService.getCategoryById(payload)
            );
            yield put({
                type: actions.GET_CATEGORY_BY_ID_SUCCESS,
                payload: response.data.data.item
            });
            payload.callBack && payload.callBack();
        } catch (error) {
            yield put({
                type: actions.GET_CATEGORY_BY_ID_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* createCategorySaga() {
    yield takeEvery(actions.CREATE_CATEGORY_START, function* (payload) {
        try {
            const response = yield call(() =>
                CategoryService.createCategory(payload)
            );
            yield put({
                type: actions.CREATE_CATEGORY_SUCCESS,
                payload: response.data.data
            });
            payload.callBack && payload.callBack();
        } catch (error) {
            yield put({
                type: actions.CREATE_CATEGORY_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* updateCategorySaga() {
    yield takeEvery(actions.UPDATE_CATEGORY_START, function* (payload) {
        try {
            const response = yield call(() =>
                CategoryService.updateCategory(payload)
            );
            yield put({
                type: actions.UPDATE_CATEGORY_SUCCESS,
                payload: response.data.data
            });
            payload.callBack && payload.callBack();
        } catch (error) {
            yield put({
                type: actions.UPDATE_CATEGORY_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* deleteCategorySaga() {
    yield takeEvery(actions.DELETE_CATEGORY_START, function* (payload) {
        try {
            const response = yield call(() =>
                CategoryService.deleteCategory(payload)
            );
            yield put({
                type: actions.DELETE_CATEGORY_SUCCESS,
                payload: response.data.data
            });
        } catch (error) {
            yield put({
                type: actions.DELETE_CATEGORY_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

export default function* CategorySaga() {
    yield all([
        fork(fetchAndSearchCategorySaga),
        fork(getCategoryByIdSaga),
        fork(createCategorySaga),
        fork(updateCategorySaga),
        fork(deleteCategorySaga),
    ]);
}
