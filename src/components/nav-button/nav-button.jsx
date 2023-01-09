import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './nav-button.module.css';

const Button = ({
    iconType,
    style,
    title
}) => {
    let IconComponent;
    if (iconType === 'burger') {
        IconComponent = BurgerIcon;
    }
    if (iconType === 'list') {
        IconComponent = ListIcon;
    }
    if (iconType === 'person') {
        IconComponent = ProfileIcon;
    }
    const isSecondary = style === 'secondary';
    return (
        <div className={ styles.Button + ' pl-5 pr-5 pt-4 pb-4' }>
            { IconComponent && <IconComponent type={ style } /> }
            <a href="" className={ 'ml-2 text text_type_main-default ' + (isSecondary ? 'text_color_inactive' : 'text_color_primary') }>
                { title }
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