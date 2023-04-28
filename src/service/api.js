const call = async (method = 'GET', url = '', data = null, headersBonus = null) => {

    // Récupérer la clé API qui est dans le localStorage

    let apiKey = localStorage.getItem('apikey') ?? '';

    let options = {
        method : method,
        mode: "cors",
        headers : {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }

    // Ajout du body
    if(data) {
        options.body = JSON.stringify(data)
    }

    // Ajout de clé API
    if(apiKey !== '') {
        options.headers['X-Redmine-API-Key'] = apiKey;
    }

    if(headersBonus) {
        options.headers = {...options.headers, ...headersBonus}
    }

    const res = await fetch('http://redmine.localhost' + url + ".json", options);

    return await res.json()
}

const get = async (url, params, headers) => {
    return call('GET', url, null, headers);
}

const getUser = async (login, password) => {
    let { user } = await get('/users/current', null, {
        Authorization : 'Basic ' + btoa(`${login}:${password}`)
    });

    return user;
}

export default getUser;