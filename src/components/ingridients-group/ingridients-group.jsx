import React from 'react';
import PropTypes from 'prop-types';
import Ingridient from '../ingridient/ingridient';
import styles from './ingridients-group.module.css'

class IngridientsGroup extends React.Component {
    render() {
        return (
            <div>
                <h2 className="text text_type_main-medium">
                    { this.props.name }
                </h2>
                <div className={ styles.IngridientsGroup + ' pl-4 pr-4 pt-6 pb-10' }>
                    {
                        this.props.ingridients.map((item, index) => (
                            /* TODO: я думаю, что selectedCount сможем высчитывать на последующих этапах сдачи проекта, а пока что мне
                            нужно посмотреть верстку счетчика. Нужно будет убрать проверку на _id. */
                            <Ingridient
                                key={ item._id }
                                name={ item.name }
                                image={ item.image }
                                price={ item.price }
                                selectedCount={ item._id === '60666c42cc7b410027a1a9b1' ? 1 : undefined }
                                needMargin={ index > 1 } />
                        ))
                    }
                </div>
            </div>
        );
    }
};

IngridientsGroup.propTypes = {
    ingridients: PropTypes.arrayOf(PropTypes.object).isRequired,
    name: PropTypes.string.isRequired
};
  
export default IngridientsGroup;