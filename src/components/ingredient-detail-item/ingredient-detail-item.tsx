import styles from './ingredient-detail-item.module.css';

interface IIngredientDetailItemProps {
    text: string;
    number: number;
}

const IngredientDetailItem = ({
    text,
    number
}: IIngredientDetailItemProps) => (
    <div className={ styles.IngredientDetailItem }>
        <p className="text text_type_main-default text_color_inactive">
            { text }
        </p>
        <p className="text text_type_digits-default text_color_inactive mt-2">
            { number }
        </p>
    </div>
);

export default IngredientDetailItem;