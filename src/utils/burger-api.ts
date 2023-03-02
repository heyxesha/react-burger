import IIngredient from "../interfaces/ingredient";

const NORMA_API = 'https://norma.nomoreparties.space/api';

interface IHeader {
    Authorization: string;
}

interface IGetDataOptions {
    path: string;
    method: 'POST' | 'GET' | 'PATCH';
    bodyParams?: object;
    headers?: IHeader
}

interface IBaseServerResponse {
    success: boolean;
    message?: string;
}

interface IOrderResponse {
    name?: string;
    order?: {
        number: number
    };
}

interface IUpdateTokenResponse {
    accessToken?: string;
    refreshToken?: string;
}

interface IAuthResponse {
    user?: {
        name: string;
        email: string;
    },
    accessToken?: string;
    refreshToken?: string;
}

interface IGetIngredientsResponse {
    data: IIngredient[];
}

type TServerResponse<T> = IBaseServerResponse & T;

type TResponseType = IOrderResponse | IUpdateTokenResponse | IAuthResponse | IGetIngredientsResponse;

const getData = ({
        path,
        method,
        bodyParams,
        headers
    }: IGetDataOptions): Promise<TServerResponse<TResponseType>> => {
    const url = NORMA_API + '/' + path;
    const requestParams = {
        method,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: bodyParams ? JSON.stringify(bodyParams) : undefined
    };
    return new Promise((resolve, reject) => {
        fetch(url, requestParams).then((response) => {
            if (response.ok) {
                response.json().then((data: TServerResponse<TResponseType>) => {
                    resolve(data);
                }).catch((error: Error) => {
                    reject(error);
                });
            } else {
                response.json().then((data: TServerResponse<TResponseType>) => {
                    reject(new Error(data.message));
                }).catch(() => {
                    reject(new Error('Ошибка HTTP: ' + response.status));
                });
            }               
        }).catch((error: Error) => {
            reject(error);
        });
    });
};

export default getData;