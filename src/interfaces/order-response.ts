interface IOrder {
    number: number;
}

export default interface IOrderResponseData {
    success: boolean;
    name?: string;
    order?: IOrder;
    message?: string;
}

export default interface IOrderActionResponseData {
    success: boolean;
    error?: Error;
}