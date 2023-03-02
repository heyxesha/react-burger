export default interface IIngredient {
    _id: string;
    name: string;
    type: string;
    price: number;
    image: string;
    isDragging?: boolean;
    selectedCount?: number;
}