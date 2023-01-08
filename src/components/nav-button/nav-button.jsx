import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './nav-button.module.css';

const Button = (props) => {
    let IconComponent;
    if (props.iconType === 'burger') {
        IconComponent = BurgerIcon;
    }
    if (props.iconType === 'list') {
        IconComponent = ListIcon;
    }
    if (props.iconType === 'person') {
        IconComponent = ProfileIcon;
    }
    const isSecondary = props.style === 'secondary';
    return (
        <div className={ styles.Button + ' pl-5 pr-5 pt-4 pb-4' }>
            { IconComponent && <IconComponent type={ props.style } /> }
            <a href="" className={ 'ml-2 text text_type_main-default ' + (isSecondary ? 'text_color_inactive' : 'text_color_primary') }>
                { props.title }
            </a>
        </div>
    );
};

Button.propTypes = {
    iconType: PropTypes.string,
    style: PropTypes.string,
    title: PropTypes.string.isRequired
};
  
export default Button;