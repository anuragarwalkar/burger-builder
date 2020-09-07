import { BurgerBuilderState } from "./burgerBuilderState.model";
import { OrderState } from "./orderState.model";
import { AuthState } from "./authState.model";

export interface RootState {
   burgerBuilder: BurgerBuilderState;
   order: OrderState;
   auth: AuthState;
}