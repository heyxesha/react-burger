import { useParams } from 'react-router-dom';

const OrderHeader = () => {
    const params = useParams();
    return (
        <h1 className="text text_type_digits-default">
            { `#${ params.id }` }
        </h1>
    );
};

export default OrderHeader;