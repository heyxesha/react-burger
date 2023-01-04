import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingridient.module.css';

class Ingridient extends React.Component {
    render() {
        return (
            <div className={ styles.Ingridient + (this.props.needMargin ? ' mt-8' : '')}>
                <img src={ this.props.image } alt={ this.props.name } />
                <div className={ styles.Price + ' mt-1' }>
                    <div className="text text_type_digits-default mr-1">
                        { this.props.price }
                    </div>
                    <CurrencyIcon />
                </div>
                <div className={ styles.Name + ' text text_type_main-default mt-1' }>
                    { this.props.name }
                </div>
                {
                    this.props.selectedCount && <Counter count={ this.props.selectedCount } size="default" />
                }
            </div>
        );
    }
};

Ingridient.propTypes = {
    needMargin: PropTypes.bool,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    selectedCount: PropTypes.number
};
  
export default Ingridient;