import { BurgerBuilderState } from "./burgerBuilderState.model";
import { OrderState } from "./orderState.model";

export interface RootState {
   burgerBuilder: BurgerBuilderState;
   order: OrderState;
}