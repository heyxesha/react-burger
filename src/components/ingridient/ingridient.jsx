import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingridient.module.css';

const Ingridient = (props) => {
    return (
        <div className={ styles.Ingridient + (props.needMargin ? ' mt-8' : '')}>
            <img src={ props.image } alt={ props.name } />
            <div className={ styles.Price + ' mt-1' }>
                <div className="text text_type_digits-default mr-1">
                    { props.price }
                </div>
                <CurrencyIcon />
            </div>
            <div className={ styles.Name + ' text text_type_main-default mt-1' }>
                { props.name }
            </div>
            {
                props.selectedCount && <Counter count={ props.selectedCount } size="default" />
            }
        </div>
    );
};

Ingridient.propTypes = {
    needMargin: PropTypes.bool,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    selectedCount: PropTypes.number
};
  
export default Ingridient;