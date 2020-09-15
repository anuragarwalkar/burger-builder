import { put } from "redux-saga/effects";
import { setIngredients } from "../actions/burgerBuilder";
import axios from '../../axiosOrder';

export function* fetchIngredientsSaga (){
        try {
            const { data: ingredients } = yield axios.get('/ingredients.json');
            yield put(setIngredients(ingredients))
        } catch (error) {
            
        }
}