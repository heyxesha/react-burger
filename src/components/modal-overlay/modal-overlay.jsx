import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({
    children,
    onClick
}) => {
    const click = (event) => {
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

ModalOverlay.propTypes = {
    children: PropTypes.element,
    onClick: PropTypes.func
};

export default ModalOverlay;