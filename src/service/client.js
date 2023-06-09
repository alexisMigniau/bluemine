const call = async (method = 'GET', url = '', params = {} , data = null, headersBonus = null) => {
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
    if(data && method !== 'GET') {
        options.body = JSON.stringify(data)
    }

    // Ajout de clé API
    if(apiKey !== '') {
        options.headers['X-Redmine-API-Key'] = apiKey;
    }

    if(headersBonus) {
        options.headers = {...options.headers, ...headersBonus}
    }

    const url_o = new URL(process.env.REACT_APP_REDMINE_URL + url);

    // Ajout des paramètres de recherche
    if(params) {
        url_o.search = new URLSearchParams(params).toString()
    }

    const res = await fetch(url_o, options);

    if(res.ok) 
    {
        return await res.json()
    } else {
        return { error : true, status : res.status, text : res.statusText };
    }
}

const get = async (url, params, headers) => {
    return await call('GET', url, params, null,headers);
}

export default get;