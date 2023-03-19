import IOrder from './order';

export default interface IWSMessage {
    success: boolean;
    orders: IOrder[];
    total: number;
    totalToday: number;
};