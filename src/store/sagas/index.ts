
import { takeEvery } from 'redux-saga/effects';
import { AUTH_INITIATE_LOGOUT, AUTH_USER, INIT_INGREDIENTS, PURCHASE_BURGER, FETCH_ORDERS } from '../actions/actionsTypes';
import { logoutSaga, authUserSaga } from './auth';
import { fetchIngredientsSaga } from  './burgerBuilder';
import { purchaseBurgerSaga, ordersSaga } from './orders';

export function* watchAuth () {
    yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(AUTH_USER as any, authUserSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(INIT_INGREDIENTS, fetchIngredientsSaga);
}

export function* watchOrders() {
    yield takeEvery(PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(FETCH_ORDERS,ordersSaga)
}


