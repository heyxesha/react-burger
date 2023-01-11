
import PropTypes from 'prop-types';
import IngridientDetailItem from '../ingridient-detail-item/ingridient-detail-item';
import styles from './ingridient-details.module.css';

const IngredientDetails = ({
    image,
    name,
    calories,
    proteins,
    fat,
    carbohydrates
}) => {
    return (
        <div className={ styles.IngredientDetails }>
            <img src={ image } alt={ name } />
            <p className="text text_type_main-medium mt-4">
                { name }
            </p>
            <div className={ `${ styles.Details } mt-8` }>
                <IngridientDetailItem text="Каллории,ккал" number={ calories } />
                <IngridientDetailItem text="Белки, г" number={ proteins } />
                <IngridientDetailItem text="Жиры, г" number={ fat } />
                <IngridientDetailItem text="Углеводы, г" number={ carbohydrates } />
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
};

export default IngredientDetails;