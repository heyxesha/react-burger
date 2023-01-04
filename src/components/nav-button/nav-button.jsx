import React from 'react';
import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './nav-button.module.css';

class Button extends React.Component {
    render() {
        let IconComponent;
        if (this.props.iconType === 'burger') {
            IconComponent = BurgerIcon;
        }
        if (this.props.iconType === 'list') {
            IconComponent = ListIcon;
        }
        if (this.props.iconType === 'person') {
            IconComponent = ProfileIcon;
        }
        const isSecondary = this.props.style === 'secondary';
        return (
            <div className={ styles.Button + ' pl-5 pr-5 pt-4 pb-4' }>
                { IconComponent && <IconComponent type={ this.props.style } /> }
                <div className={ 'ml-2 text text_type_main-default' + (isSecondary ? ' text_color_inactive' : '') }>
                    { this.props.title }
                </div>
            </div>
        );
    }
};

Button.propTypes = {
    iconType: PropTypes.string,
    style: PropTypes.string,
    title: PropTypes.string.isRequired
};
  
export default Button;