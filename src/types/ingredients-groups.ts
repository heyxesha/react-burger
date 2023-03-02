import IIngredientsGroup from "../interfaces/ingredients-group";

export type TIngredientsGroups = {
    [key in string]: IIngredientsGroup;
}