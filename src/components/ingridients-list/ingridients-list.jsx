import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
import IngridientsGroup from '../ingridients-group/ingridients-group';
import IngridientsPropTypes from '../../utils/IngridientsPropTypes';
import styles from './ingridients-list.module.css';

const IngridientsList = ({ ingridientsGroups }) => {
    return (
        <div id="List" className={ `${ styles.List } pb-10` }>
            {
                Object.keys(ingridientsGroups).map((key) => (
                    <Element
                        key={ key }
                        name={ key }>
                        <IngridientsGroup
                            name={ ingridientsGroups[key].title }
                            ingridients={ ingridientsGroups[key].data } />
                    </Element>
                ))
            }
        </div>
    );
};

IngridientsList.propTypes = {
    ingridientsGroups: PropTypes.objectOf(
        PropTypes.shape({
            title: PropTypes.string,
            data: IngridientsPropTypes
        })
    )
};
  
export default IngridientsList;