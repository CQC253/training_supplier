import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import factories from './factory';


function* watchSample1 () {
    yield takeEvery(actions.FETCH_SAMPLE_1, function* (payload) {
        try {
            const response = yield call(() =>
                factories.fetchSample(payload),
            );
            yield put({
                type: actions.FETCH_SAMPLE_1_SUCCESS,
                payload: response.Data,
            });
        } catch (error) {

        } finally {
        }
    });
}
function* watchSample2 () {
    yield takeEvery(actions.FETCH_SAMPLE_2, function* (payload) {
        try {
            const response = yield call(() =>
                factories.updateSample(payload),
            );
            yield put({
                type: actions.FETCH_SAMPLE_2_SUCCESS,
                payload: response.Data,
            });
        } catch (error) {

        } finally {
        }
    });
}
export default function* AppSaga () {
    yield all([
        fork(watchSample1),
        fork(watchSample2),
    ]);
}
