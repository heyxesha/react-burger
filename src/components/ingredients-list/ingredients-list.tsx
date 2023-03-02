import { Element } from 'react-scroll';

import IngredientsGroup from '../ingredients-group/ingredients-group';

import { TIngredientsGroups } from '../../types/ingredients-groups';

import styles from './ingredients-list.module.css';

interface IIngredientsList {
    ingredientsGroups: TIngredientsGroups
}

const IngredientsList = ({ ingredientsGroups }: IIngredientsList) => {
    return (
        <div id="List" className={ `${ styles.List } pb-10` }>
            {
                Object.keys(ingredientsGroups).map((key) => (
                    <Element
                        key={ key }
                        name={ key }>
                        <IngredientsGroup
                            name={ ingredientsGroups[key].name }
                            ingredients={ ingredientsGroups[key].ingredients } />
                    </Element>
                ))
            }
        </div>
    );
};
  
export default IngredientsList;