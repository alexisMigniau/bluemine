import get from "./client";

/**
 * 
 * @param {string} q 
 * @param {string} object issues | projects 
 * @param {integer} limit 20
 * @param {integer} offset 0
 */
const searchAll = async (q, object, limit = 20, offset = 0) => {
    return await get('/search.json', {q, [object] : 1, limit, offset})
}

/**
 * Fetch les données d'un utilisateur via son login et password
 * @param {string} login 
 * @param {string} password 
 * @returns user
 */
const getUser = async (login, password) => {
    let res = await get('/users/current.json', null, {
        Authorization : 'Basic ' + btoa(`${login}:${password}`)
    });

    return res;
}

/**
 * Fetch les projets
 * @param {string} name 
 * @returns projects
 */
const getProjects = async () => {
    return await get('/projects.json');
}

/**
 * Fetch tous les trackers
 * @return trackers
 */
const getTrackers = async () => {
    return await get('/trackers.json');
}

/**
 * Fetch tous les statut
 * @return status
 */
const getStatus = async () => {
    return await get('/issue_statuses.json');
}

/**
 * Fetch les issues
 * @param {array} projects_ids
 * @param {array} trackers_ids
 * @param {array} status_ids
 * @param {int} offset 0
 * @param {int} limit 0
 * @return issues
 */
const getIssues = async (projects_ids = [], trackers_ids = [], status_ids = [], assigned = [],offset = 0, limit = 100) => {
    // Petit tricks
    // Le pipe permet de séléctionner plusieurs id, ça fonctionne bien pour les trackers et les statut par contre pour les projets ça ne fonctionne pas
    // On construit l'URL pour qu'elle ressemble à celle du client Redmine
    let params = [
        ["offset", offset],
        ["limit", limit]
    ];

    let filters = [
        {
            field : 'project_id' ,
            value : projects_ids
        },
        {
            field : 'tracker_id' ,
            value : trackers_ids
        },
        {
            field : 'status_id' ,
            value : status_ids
        },
        {
            field : 'assigned_to_id',
            value : assigned
        }
    ]

    filters.forEach(({field, value}) => {
        if(value.length > 0) {
            params.push(['f[]', field])
            params.push([`op[${field}]`, '='])

            value.forEach((id) => params.push([`v[${field}][]`, id]))
        } else if(field === 'status_id')
        {
            params.push(['f[]', field])
            params.push([`op[${field}]`, 'o'])
        }
    })

    // Tri par sujet pour l'instant pour avoir un semblant de random vu que tout a été générer en même temps
    params.push(['sort', 'subject,id:desc'])
    
    return await get('/issues.json', params);
}

export {getUser, getProjects, getTrackers, getStatus, getIssues,searchAll};