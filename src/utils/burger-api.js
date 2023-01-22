const NORMA_API = 'https://norma.nomoreparties.space/api';

const getData = (dataType, bodyParams) => {
    const url = NORMA_API + '/' + dataType;
    const requestParams = bodyParams ? {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyParams)
    } : undefined;
    return new Promise((resolve, reject) => {
        fetch(url, requestParams).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                });
            } else {
                const error = new Error('Ошибка HTTP: ' + response.status);
                reject(error);
            }               
        }).catch((error) => {
            reject(error);
        });
    });
};

export default getData;