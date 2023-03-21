interface IStatus {
    title: string;
    style: string;
}

type TOrderStatus = {
    [key: string]: IStatus;
}

export const orderStatus: TOrderStatus = {
    done: {
        title: 'Выполнен',
        style: 'success'
    },
    pending: {
        title: 'Готовится',
        style: 'primary'
    },
    created: {
        title: 'Создан',
        style: 'primary'
    },
    canceled: {
        title: 'Отменен',
        style: 'error'
    },
}; 