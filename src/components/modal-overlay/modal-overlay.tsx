import { ReactNode } from 'react';

import ICustomMouseEvent from '../../interfaces/custom-mouse-event';

import styles from './modal-overlay.module.css';

interface IModalOverlay {
    children?: ReactNode;
    onClick: (event: ICustomMouseEvent) => void;
}

const ModalOverlay = ({
    children,
    onClick
}: IModalOverlay ) => {
    const click = (event: ICustomMouseEvent) => {
        if (typeof onClick === 'function') {
            onClick(event);
        }
    };

    return (
        <div
            id="modalOverlay"
            className={ styles.ModalOverlay }
            onClick={ click }>
            { children }
        </div>
    );
};

export default ModalOverlay;