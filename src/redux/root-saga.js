import { all } from 'redux-saga/effects'
import SupplierSaga from './supplier/saga'
import AppSaga from './app/saga'

export default function* rootSaga () {
    yield all([
        AppSaga(),
        SupplierSaga(),
    ])
}
