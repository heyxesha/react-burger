import { useDragLayer } from 'react-dnd';

const getStyle = (x, y) => {
    // Картинка 240х120, поэтому сделаем отступы такими, чтобы курсор был ровно посередине.
    return {
        transform: `translate(${x}px, ${y}px)`,
        position: 'fixed',
        top: '-60px',
        left: '-120px',
        pointerEvents: 'none'
    };
};

const CustomDragLayer = () => {  
    const {isDragging, currentOffset, item, clientOffset } = useDragLayer(
        (monitor) => {
            return {
                isDragging: monitor.isDragging(),
                currentOffset: monitor.getSourceClientOffset(),
                item: monitor.getItem(),
                clientOffset: monitor.getClientOffset()
            };
        }
    );

    if (!isDragging || !currentOffset) {
        return null;
    } else {
        return (
            <div style={ getStyle(clientOffset.x, clientOffset.y) }>
                <img src={ item.image } alt={ item.name } />
            </div>
        )
    }
};

export default CustomDragLayer;