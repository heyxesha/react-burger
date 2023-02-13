const NORMA_API = 'https://norma.nomoreparties.space/api';

const getData = ({
        path,
        method,
        bodyParams,
        headers
    }) => {
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
                response.json().then((data) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                });
            } else {
                response.json().then((data) => {
                    reject(data.message);
                }).catch(() => {
                    reject(new Error('Ошибка HTTP: ' + response.status));
                });
            }               
        }).catch((error) => {
            reject(error);
        });
    });
};

export default getData;