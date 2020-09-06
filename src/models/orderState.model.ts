import { Order } from "./order.model";

export interface OrderState {
    orders: Order[],
    loading: boolean,
    purchased: boolean
}