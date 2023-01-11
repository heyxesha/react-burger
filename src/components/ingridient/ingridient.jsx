import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingridient.module.css';

const Ingridient = ({ 
    needMargin,
    name,
    image,
    price,
    selectedCount,
    onClick
 }) => {
    return (
        <div
            className={ `${ styles.Ingridient } ${ needMargin ? 'mt-8' : '' }` }
            onClick={ onClick }>
            <img src={ image } alt={ name } />
            <div className={ `${ styles.Price } mt-1` }>
                <p className="text text_type_digits-default mr-1">
                    { price }
                </p>
                <CurrencyIcon />
            </div>
            <p className={ `${ styles.Name } text text_type_main-default mt-1` }>
                { name }
            </p>
            {
                selectedCount && <Counter count={ selectedCount } size="default" />
            }
        </div>
    );
};

Ingridient.propTypes = {
    needMargin: PropTypes.bool,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    selectedCount: PropTypes.number,
    onClick: PropTypes.func
};
  
export default Ingridient;