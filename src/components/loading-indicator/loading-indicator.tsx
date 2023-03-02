import { Default } from 'react-spinners-css';

import styles from './loading-indicator.module.css';

const LoadingIndicator = () => {
    return (
        <div className={ styles.LoadingIndicator}>
            <Default color="#8585AD" />
        </div>
    );
};

export default LoadingIndicator;