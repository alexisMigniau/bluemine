import get from "./client";

/**
 * 
 * @param {string} q 
 * @param {string} object issues | projects 
 * @param {integer} limit 20
 * @param {integer} offset 0
 */
const searchAll = async (q, object, limit = 20, offset = 0) => {
    return await get('/search', {q, [object] : 1, limit, offset})
}

/**
 * Fetch les données d'un utilisateur via son login et password
 * @param {string} login 
 * @param {string} password 
 * @returns user
 */
const getUser = async (login, password) => {
    let { user } = await get('/users/current', null, {
        Authorization : 'Basic ' + btoa(`${login}:${password}`)
    });

    return user;
}

/**
 * Fetch les projets
 * @param {string} name 
 * @returns projects
 */
const getProjects = async () => {
    return await get('/projects');
}

/**
 * Fetch tous les trackers
 * @return trackers
 */
const getTrackers = async () => {
    return await get('/trackers');
}

/**
 * Fetch tous les statut
 * @return status
 */
const getStatus = async () => {
    return await get('/issue_statuses');
}

export {getUser, getProjects, getTrackers, getStatus, searchAll};