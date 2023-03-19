import IIngredient from './ingredient';

export default interface ISelectedIngredient extends IIngredient {
    constructorId: string;
    index: number;
};