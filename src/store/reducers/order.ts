import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILED, PURCHASE_BURGER_START, PURCHASE_INIT, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_INIT, FETCH_ORDERS_FAILED } from "../actions/actionsTypes";
import { Order } from "../../models/order.model";
import { cloneState } from "../../utils/functions";
import { OrderState } from "../../models/orderState.model";
import { FirebaseError } from "../../models/firebaseError.model";

const initialState: OrderState = {
    orders: [],
    loading:false,
    purchased: false,
    error: ''
}

type actionType = { type: string, payload: { order: Order, id: string, orders: Order[], error: FirebaseError }};

const appendOrder = (action: actionType, state: OrderState) => {
    const newState :OrderState = cloneState(state);
    newState.loading = false;
    newState.purchased = true;
    const { order, id } = action.payload; 
    order.id = id;
    newState.orders = newState.orders.concat(order);

    return newState;
}

const setLoading = (action: actionType, state: OrderState) => {
    const newState :OrderState = cloneState(state);
    newState.loading = action.type === PURCHASE_BURGER_START ||
    action.type === FETCH_ORDERS_INIT;
    newState.error = action.type === FETCH_ORDERS_FAILED ? action.payload.error.message : '' 
    return newState;
}

const setPurchased = (action: actionType, state: OrderState) => {
    const newState: OrderState = cloneState(state);
    newState.purchased = !(action.type === PURCHASE_INIT);
    return newState;
}

const setOrders = (action: actionType, state: OrderState) => {
    const newState: OrderState = cloneState(state);
    newState.orders = action.payload.orders;
    newState.loading = false;
    return newState;
}

const reducer = (state = initialState, action: actionType): OrderState => {
    switch (action.type) {
        case PURCHASE_BURGER_SUCCESS: {
            return appendOrder(action, state);
        }
        
        case PURCHASE_BURGER_START : 
        case FETCH_ORDERS_FAILED:
        case PURCHASE_BURGER_FAILED: {
            return setLoading(action, state);
        }
        
        case PURCHASE_INIT : {
            return setPurchased(action, state);
        }

        case FETCH_ORDERS_SUCCESS: {
            return setOrders(action, state);
        }

        case FETCH_ORDERS_INIT: {
            return setLoading(action, state);
        }
           
    }
    return state;
}

export default reducer;