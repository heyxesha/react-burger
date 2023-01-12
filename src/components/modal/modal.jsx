

import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const ESC_CODE = 27;

const Modal = ({
    title,
    children,
    onClose
    }) => {
    const keydown = (event) => {
        if (event.keyCode === ESC_CODE) {
            close();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', keydown);

        return document.removeEventListener("keydown", keydown);
    }, []);

    const modalRoot = document.getElementById('modalRoot');

    const close = () => {
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    const outsideClick = (event) => {
        if (event.target.id === 'modalOverlay') {
            close();
        }
    };
    
    return ReactDOM.createPortal(
        <ModalOverlay onClick={ outsideClick }>
            <div className={ `${ styles.Modal } pl-10 pt-10 pr-10 pb-15` }>
                <div className={ styles.Header }>
                    <h1 className="text text_type_main-large">
                        { title }
                    </h1>
                    <div className={ styles.CloseButton }>
                        <CloseIcon onClick={ onClose } />
                    </div>
                </div>
                { children }
            </div>
        </ModalOverlay>,
        modalRoot
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
    onClose: PropTypes.func
};

export default Modal;