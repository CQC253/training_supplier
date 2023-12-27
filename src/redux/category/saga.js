import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import factories from './factory'

function* fetchAndSearchCategorySaga() {
    yield takeEvery(actions.FETCH_SEARCH_CATEGORY_START, function* (payload) {
        // console.log('payload saga', payload);
        try {
            const response = yield call(() =>
                factories.fetchAndSearchCategoryData(payload)
            );
            yield put({
                type: actions.FETCH_SEARCH_CATEGORY_SUCCESS,
                payload: response.Data
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

function* deleteCategorySaga() {
    yield takeEvery(actions.DELETE_CATEGORY_START, function* (payload) {
        // console.log('payload saga', payload);
        try {
            const response = yield call(() =>
                factories.deleteCategoryList(payload)
            );
            yield put({
                type: actions.DELETE_CATEGORY_SUCCESS,
                payload: response.Data
            });

            // Lấy giá trị từ URL query params
            const queryParams = new URLSearchParams(location.search);
            const inputValue = queryParams.get('input') || '';

            payload = {
                payload: {
                    inputValue: inputValue,
                }
            };
            const search = yield call(() =>
                factories.fetchAndSearchData(payload)
            );
            yield put({
                type: actions.FETCH_SEARCH_CATEGORY_SUCCESS,
                payload: search.Data
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

function* createCategorySaga() {
    yield takeEvery(actions.CREATE_CATEGORY_START, function* (payload) {
        // console.log('payload saga', payload);
        try {
            const response = yield call(() =>
                factories.createCategoryList(payload)
            );
            yield put({
                type: actions.CREATE_CATEGORY_SUCCESS,
                payload: response.Data
            });
            
            const searcPayload = {
                payload: {
                    inputValue: '',
                }
            }
            const search = yield call(() =>
                factories.fetchAndSearchCategoryData(searcPayload)
            );
            yield put({
                type: actions.FETCH_SEARCH_CATEGORY_SUCCESS,
                payload: search.Data
            });
        } catch (error) {
            yield put({
                type: actions.CREATE_CATEGORY_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* resetCategorySaga() {
    yield takeEvery(actions.RESET_CATEGORY_START, function* () {
        // console.log('payload', payload);
        try {
            // Lấy dữ liệu từ localStorage
            const categoryList = yield call(() =>
                factories.resetCategoryList()
            );
            // console.log('categoryList', categoryList);
            yield put({
                type: actions.RESET_CATEGORY_SUCCESS,
                payload: categoryList.Data
            });
        } catch (error) {
            yield put({
                type: actions.RESET_CATEGORY_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

export default function* CategorySaga() {
    yield all([
        fork(fetchAndSearchCategorySaga),
        fork(deleteCategorySaga),
        fork(createCategorySaga),
        fork(resetCategorySaga),
    ]);
}
