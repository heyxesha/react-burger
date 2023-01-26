import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Ingredient from '../ingredient/ingredient';
import IngredientsPropTypes from '../../utils/IngredientsPropTypes';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { SET_VIEWED_INGREDIENT, RESET_VIEWED_INGREDIENT } from '../../services/actions/viewed-ingredient';

import styles from './ingredients-group.module.css'

const IngredientsGroup = ({
    ingredients,
    name
}) => {
    const [state, setState] = useState({
        modalVisibility: false,
        modalChildren: null
    });

    const dispatch = useDispatch();

    const click = (item) => {
        dispatch({
            type: SET_VIEWED_INGREDIENT,
            data: item
        });
        const ingredientDetails = (
            <IngredientDetails />
        );
        setState({
            modalVisibility: true,
            modalChildren: ingredientDetails
        });
    };

    const close = () => {
        dispatch({ type: RESET_VIEWED_INGREDIENT });
        setState({
            modalVisibility: false,
            modalChildren: null
        });
    };

    return (
        <div>
            <h2 className="text text_type_main-medium pt-10">
                { name }
            </h2>
            <div className={ `${ styles.IngredientsGroup } pl-4 pr-4 pt-6` }>
                {
                    ingredients.map((item, index) => (
                        /* TODO: я думаю, что selectedCount сможем высчитывать на последующих этапах сдачи проекта, а пока что мне
                        нужно посмотреть верстку счетчика. Нужно будет убрать проверку на _id. */
                        <Ingredient
                            key={ item._id }
                            id={ item._id }
                            name={ item.name }
                            image={ item.image }
                            price={ item.price }
                            type={ item.type }
                            selectedCount={ item.selectedCount }
                            needMargin={ index > 1 }
                            onClick={ () => click(item) } />
                    ))
                }
            </div>
            { state.modalVisibility &&
                <Modal
                    title="Детали ингридиента"
                    children={ state.modalChildren }
                    onClose={ close } /> 
            }
        </div>
    );
};

IngredientsGroup.propTypes = {
    ingredients: IngredientsPropTypes,
    name: PropTypes.string.isRequired
};
  
export default IngredientsGroup;