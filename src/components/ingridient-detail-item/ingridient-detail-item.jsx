import PropTypes from 'prop-types';
import styles from './ingridient-detail-item.module.css';

const IngridientDetailItem = ({ text, number }) => (
    <div className={ styles.IngridientDetailItem }>
        <p className="text text_type_main-default text_color_inactive">
            { text }
        </p>
        <p className="text text_type_digits-default text_color_inactive mt-2">
            { number }
        </p>
    </div>
);

IngridientDetailItem.propTypes = {
    text: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
};

export default IngridientDetailItem;