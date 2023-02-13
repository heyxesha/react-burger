import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { IngredientsPropTypes } from '../../utils/types';
import { setViewedIngredient } from '../../services/actions/viewed-ingredient';
import Ingredient from '../ingredient/ingredient';

import styles from './ingredients-group.module.css'

const IngredientsGroup = ({
    ingredients,
    name
}) => {
    const dispatch = useDispatch();
    const click = (item) => {
        dispatch(setViewedIngredient(item));
    };

    return (
        <div>
            <h2 className="text text_type_main-medium pt-10">
                { name }
            </h2>
            <div className={ `${ styles.IngredientsGroup } pl-4 pr-4 pt-6` }>
                {
                    ingredients.map((item, index) => (
                        <Ingredient
                            key={ item._id }
                            item={ item }
                            selectedCount={ item.selectedCount }
                            needMargin={ index > 1 }
                            onClick={ () => click(item) } />
                    ))
                }
            </div>
        </div>
    );
};

IngredientsGroup.propTypes = {
    ingredients: IngredientsPropTypes,
    name: PropTypes.string.isRequired
};
  
export default IngredientsGroup;