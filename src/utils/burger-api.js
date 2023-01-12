const NORMA_API = 'https://norma.nomoreparties.space/api';

const getData = (dataType) => {
    const url = NORMA_API + '/' + dataType;
    return new Promise((resolve, reject) => {
        fetch(url).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    resolve(data.data);
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