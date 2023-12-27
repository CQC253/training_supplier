import { all } from 'redux-saga/effects'
import SupplierSaga from './supplier/saga'
import AppSaga from './app/saga'
import CategorySaga from './category/saga'

export default function* rootSaga () {
    yield all([
        AppSaga(),
        SupplierSaga(),
        CategorySaga(),
    ])
}
