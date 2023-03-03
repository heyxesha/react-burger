import { FC } from 'react';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import styles from './nav-button.module.css';

interface IButton {
    iconType: 'burger' | 'list' | 'person';
    style: TIconProps['type'];
    title: string;
}

const Button = ({
    iconType,
    style,
    title
}: IButton) => {
    let IconComponent: FC<TIconProps> | undefined;
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
        <div className={ `${ styles.Button } pl-5 pr-5 pt-4 pb-4` }>
            { IconComponent && <IconComponent type={ style } /> }
            <div className={ `ml-2 text text_type_main-default ${ isSecondary ? 'text_color_inactive' : 'text_color_primary' }` }>
                { title }
            </div>
        </div>
    );
};

export default Button;