import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import AccountService from './accountService';

function* LoginSaga() {
    yield takeEvery(actions.LOGIN_START, function* (payload) {
        try {
            const response = yield call(() =>
                AccountService.login(payload)
            );
            yield put({
                type: actions.LOGIN_SUCCESS,
                payload: response.data
            });
            payload.callBack && payload.callBack(response);
        } catch (error) {
            yield put({
                type: actions.LOGIN_ERROR,
                payload: error
            });
            payload.callBack && payload.callBack(error);
        } finally {

        }
    });
}

function* LogoutSaga() {
    yield takeEvery(actions.LOGOUT_START, function* (payload) {
        try {
            const response = yield call(() =>
                AccountService.logout()
            );
            yield put({
                type: actions.LOGOUT_SUCCESS,
                payload: response
            });
            payload.callBack && payload.callBack();
        } catch (error) {
            yield put({
                type: actions.LOGOUT_ERROR,
                payload: error
            });
        } finally {

        }
    });
}

function* MeSaga() {
    yield takeEvery(actions.ME_START, function* (payload) {
        try {
            const response = yield call(() =>
                AccountService.me()
            );
            yield put({
                type: actions.ME_SUCCESS,
                payload: response
            });
            payload.validToken && payload.validToken(response);
        } catch (error) {
            yield put({
                type: actions.ME_ERROR,
                payload: error
            });
            payload.invalidToken && payload.invalidToken(error.response.data);
        } finally {

        }
    });
}

export default function* AccountSaga() {
    yield all([
        fork(LoginSaga),
        fork(LogoutSaga),
        fork(MeSaga),
    ]);
}
