import { useDispatch } from '../../store';
import { setViewedIngredient } from '../../services/actions/viewed-ingredient';
import Ingredient from '../ingredient/ingredient';

import IIngredient from '../../interfaces/ingredient';

import styles from './ingredients-group.module.css';


interface IIngredientsGroup {
    name: string;
    ingredients: IIngredient[];
}

const IngredientsGroup = ({
    ingredients,
    name
}: IIngredientsGroup) => {
    const dispatch = useDispatch();
    const click = (item: IIngredient) => {
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
                            needMargin={ index > 1 }
                            onClick={ () => click(item) } />
                    ))
                }
            </div>
        </div>
    );
};
  
export default IngredientsGroup;