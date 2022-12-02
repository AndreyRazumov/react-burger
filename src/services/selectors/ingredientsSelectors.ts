import { RootState } from "../../utils/types";

export const getIngredients = (store: RootState) => store.ingredientsReducer.ingredients || [];