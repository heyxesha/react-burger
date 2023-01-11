import { useState } from 'react';
import PropTypes from 'prop-types';
import Ingridient from '../ingridient/ingridient';
import IngridientsPropTypes from '../../utils/IngridientsPropTypes';
import IngredientDetails from '../ingredient-details/ingridient-details';
import Modal from '../modal/modal';
import styles from './ingridients-group.module.css'

const IngridientsGroup = ({
    ingridients,
    name
}) => {
    const [state, setState] = useState({
        modalVisibility: false,
        modalChildren: null
    });

    const click = (item) => {
        const ingridientDetails = (
            <IngredientDetails
                name={ item.name }
                image={ item.image_large }
                calories={ item.calories }
                proteins={ item.proteins }
                fat={ item.fat }
                carbohydrates={ item.carbohydrates }
            />
        );
        setState({
            modalVisibility: true,
            modalChildren: ingridientDetails
        });
    };

    const close = () => {
        setState({
            modalVisibility: false,
            modalChildren: null
        });
    };

    return (
        <div>
            <h2 className="text text_type_main-medium pt-10">
                { name }
            </h2>
            <div className={ `${ styles.IngridientsGroup } pl-4 pr-4 pt-6` }>
                {
                    ingridients.map((item, index) => (
                        /* TODO: я думаю, что selectedCount сможем высчитывать на последующих этапах сдачи проекта, а пока что мне
                        нужно посмотреть верстку счетчика. Нужно будет убрать проверку на _id. */
                        <Ingridient
                            key={ item._id }
                            name={ item.name }
                            image={ item.image }
                            price={ item.price }
                            selectedCount={ item._id === '60666c42cc7b410027a1a9b1' ? 1 : undefined }
                            needMargin={ index > 1 }
                            onClick={ () => click(item) } />
                    ))
                }
            </div>
            { state.modalVisibility &&
                <Modal
                    title="Детали ингридиента"
                    children={ state.modalChildren }
                    onClose={ close } /> 
            }
        </div>
    );
};

IngridientsGroup.propTypes = {
    ingridients: IngridientsPropTypes,
    name: PropTypes.string.isRequired
};
  
export default IngridientsGroup;