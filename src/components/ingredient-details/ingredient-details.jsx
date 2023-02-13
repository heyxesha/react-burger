import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setViewedIngredient } from '../../services/actions/viewed-ingredient';
import IngredientDetailItem from '../ingredient-detail-item/ingredient-detail-item';

import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
    const {
        _id,
        image,
        name,
        calories,
        proteins,
        fat,
        carbohydrates
    } = useSelector(state => state.viewedIngredient);
    const { ingredients } = useSelector(state => state.ingredients);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        if (!_id) {
            if (ingredients.length) {
                const viewedIngredient = ingredients.find(item => item._id === params.id);
                dispatch(setViewedIngredient(viewedIngredient));
            }
        }
    }, [ingredients]);

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