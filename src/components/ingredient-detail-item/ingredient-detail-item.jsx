import PropTypes from 'prop-types';
import styles from './ingredient-detail-item.module.css';

const IngredientDetailItem = ({ text, number }) => (
    <div className={ styles.IngredientDetailItem }>
        <p className="text text_type_main-default text_color_inactive">
            { text }
        </p>
        <p className="text text_type_digits-default text_color_inactive mt-2">
            { number }
        </p>
    </div>
);

IngredientDetailItem.propTypes = {
    text: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
};

export default IngredientDetailItem;