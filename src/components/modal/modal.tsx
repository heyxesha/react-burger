

import { useEffect, ReactNode } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';

import ModalOverlay from '../modal-overlay/modal-overlay';

import ICustomMouseEvent from '../../interfaces/custom-mouse-event';

import styles from './modal.module.css';

const ESC_CODE = 27;

interface IModalProps {
    title?: string;
    children?: ReactNode;
    customHeaderContent?: ReactNode;
    onClose: () => void;
}

const Modal = ({
    customHeaderContent,
    title,
    children,
    onClose
    }: IModalProps) => {
    const keydown = (event: KeyboardEvent) => {
        if (event.keyCode === ESC_CODE) {
            close();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', keydown);

        return () => {
            document.removeEventListener('keydown', keydown);
        };
    }, []);

    const modalRoot = document.getElementById('modalRoot')!;

    const close = () => {
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    const outsideClick = (event: ICustomMouseEvent) => {
        if (event.target?.id === 'modalOverlay') {
            close();
        }
    };
    
    return createPortal(
        <ModalOverlay onClick={ outsideClick }>
            <div
                data-test="modalContainer"
                className={ `${ styles.Modal } pl-10 pt-10 pr-10 pb-15` }>
                <div className={ styles.Header }>
                    {
                        customHeaderContent ? (customHeaderContent) : (
                            <h1 className="text text_type_main-large">
                                { title }
                            </h1>
                        )
                    } 
                    
                    <div
                        className={ styles.CloseButton }
                        data-test="modalCloseButton">
                        <CloseIcon
                            type="primary"
                            onClick={ onClose } />
                    </div>
                </div>
                { children }
            </div>
        </ModalOverlay>,
        modalRoot
    );
};

export default Modal;