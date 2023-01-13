import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import IngredientsGroup from '../ingredients-group/ingredients-group';
import IngredientsPropTypes from '../../utils/IngredientsPropTypes';
import styles from './ingredients-list.module.css';

const IngredientsList = ({ ingredientsGroups }) => {
    return (
        <div id="List" className={ `${ styles.List } pb-10` }>
            {
                Object.keys(ingredientsGroups).map((key) => (
                    <Element
                        key={ key }
                        name={ key }>
                        <IngredientsGroup
                            name={ ingredientsGroups[key].title }
                            ingredients={ ingredientsGroups[key].data } />
                    </Element>
                ))
            }
        </div>
    );
};

IngredientsList.propTypes = {
    ingredientsGroups: PropTypes.objectOf(
        PropTypes.shape({
            title: PropTypes.string,
            data: IngredientsPropTypes
        })
    )
};
  
export default IngredientsList;