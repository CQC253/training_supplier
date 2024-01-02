import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import factories from './factory'

const API_BASE_URL = 'https://provinces.open-api.vn/api';

function* fetchProvincesSaga() {
    yield takeEvery(actions.FETCH_PROVINCES_START, function* () {
        try {
            const response = yield call(fetch, `${API_BASE_URL}/?depth=2`);
            const provinces = yield response.json();
            yield put({
                type: actions.FETCH_PROVINCES_SUCCESS,
                payload: provinces
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
        // console.log('payload districts', payload);
        try {
            const { payload: provinceCode } = payload;
            const response = yield call(fetch, `${API_BASE_URL}/p/${parseInt(provinceCode)}/?depth=2`);
            const districts = yield response.json();
            // console.log('districts', districts);
            yield put({
                type: actions.FETCH_DISTRICTS_SUCCESS,
                payload: districts.districts
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
            const response = yield call(fetch, `${API_BASE_URL}/d/${districtCode}/?depth=2`);
            const wards = yield response.json();
            // console.log('wards', wards);

            yield put({
                type: actions.FETCH_WARDS_SUCCESS,
                payload: wards.wards
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
