import { select, put } from 'redux-saga/effects';
import { fetchOrdersInit, fetchOrdersSuccess, fetchOrdersFailed, purchaseBurgerStart, purchaseBurgerSuccess } from '../actions/orders';
import axios from '../../axiosOrder';

export function* ordersSaga() {
    try {
        yield put(fetchOrdersInit());
        const { auth : { token, userId } } = yield select();
        const query = yield `auth=${token}&orderBy="userId"&equalTo="${userId}"`
        let result = yield axios.get(`/orders.json?${query}`);
        if (result != null) {
            const { data } = result;
            const orders = [];

            for (const key in data) {
                orders.push({ ...data[key], id: key });
            }
            yield put(fetchOrdersSuccess(orders));
        }
    } catch (error) {
        yield put(fetchOrdersFailed(error.response.data.error));
    }
}

export function* purchaseBurgerSaga(action: any) {
    yield put(purchaseBurgerStart());
    const { auth: { token } } = yield select();
    const result = yield axios.post(`/orders.json?auth=${token}`, action.order);

    if (result) {
        const { data } = result;
        yield put(purchaseBurgerSuccess(data.name, action.order));
    }
}