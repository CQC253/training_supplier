import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';

// const API_BASE_URL = 'https://provinces.open-api.vn/api';
const API_BASE_URL = 'https://vapi.vnappmob.com/api';

function* fetchProvincesSaga() {
    yield takeEvery(actions.FETCH_PROVINCES_START, function* () {
        try {
            const response = yield call(fetch, `${API_BASE_URL}/province`);
            const provinces = yield response.json();
            yield put({
                type: actions.FETCH_PROVINCES_SUCCESS,
                payload: provinces.results
            });
        } catch (error) {
            yield put({
                type: actions.FETCH_PROVINCES_ERROR,
                payload: error
            });
        }
    });
}

function* fetchDistrictsSaga() {
    yield takeEvery(actions.FETCH_DISTRICTS_START, function* (payload) {
        try {
            const { payload: provinceCode } = payload;
            const response = yield call(fetch, `${API_BASE_URL}/province/district/${parseInt(provinceCode)}`);
            const districts = yield response.json();
            yield put({
                type: actions.FETCH_DISTRICTS_SUCCESS,
                payload: districts.results
            });
        } catch (error) {
            yield put({
                type: actions.FETCH_DISTRICTS_ERROR,
                payload: error
            });
        }
    });
}

function* fetchWardsSaga() {
    yield takeEvery(actions.FETCH_WARDS_START, function* (payload) {
        // console.log('payload wards', payload);
        try {
            const { payload: districtCode } = payload;
            const response = yield call(fetch, `${API_BASE_URL}/province/ward/${districtCode}`);
            const wards = yield response.json();
            console.log('wards', wards);

            yield put({
                type: actions.FETCH_WARDS_SUCCESS,
                payload: wards.results
            });
        } catch (error) {
            yield put({
                type: actions.FETCH_WARDS_ERROR,
                payload: error
            });
        }
    });
}

export default function* ProvincesSaga() {
    yield all([
        fork(fetchProvincesSaga),
        fork(fetchDistrictsSaga),
        fork(fetchWardsSaga),
    ]);
}
