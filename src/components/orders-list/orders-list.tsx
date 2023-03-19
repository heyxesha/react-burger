interface IOrders {
    orders: number[];
    color?: string;
}

const OrdersList = ({
    orders,
    color
}: IOrders) => {
    return (
        <div>
            {
                orders.map((item, index) => (
                    <p  
                        key={ index }
                        className={ `${ index ? 'mt-2' : '' } text text_type_digits-default text_color_${ color }`}>
                        { item }
                    </p>
                ))
            }
        </div>
    );
};

export default OrdersList;