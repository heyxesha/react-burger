import { useSelector } from 'react-redux';

import IngredientDetailItem from '../ingredient-detail-item/ingredient-detail-item';

import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
    const {
        image,
        name,
        calories,
        proteins,
        fat,
        carbohydrates
    } = useSelector(state => state.viewedIngredient);
    return (
        <div className={ styles.IngredientDetails }>
            <img src={ image } alt={ name } />
            <p className="text text_type_main-medium mt-4">
                { name }
            </p>
            <div className={ `${ styles.Details } mt-8` }>
                <IngredientDetailItem text="Каллории,ккал" number={ calories } />
                <IngredientDetailItem text="Белки, г" number={ proteins } />
                <IngredientDetailItem text="Жиры, г" number={ fat } />
                <IngredientDetailItem text="Углеводы, г" number={ carbohydrates } />
            </div>
        </div>
    );
};

export default IngredientDetails;