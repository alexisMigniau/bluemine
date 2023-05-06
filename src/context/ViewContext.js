import { createContext, useEffect, useState } from "react";
import { getIssues, getProjects, searchAll } from "../service/api";

export const ViewContext = createContext()

const ViewProvider = ({children}) => {

    // Vue
    const [views, setViews] = useState([]);
    const [currentView, setCurrentView] = useState({})

    // Filtre
    const [projectIds, setProjectIds] = useState([])

    // Issue
    const [issues, setIssues] = useState([])
    const [total, setTotal] = useState(0);

    // Colone
    const [column, setColumn] = useState([]);

    // Création des localStorage de base
    useEffect(() => {
        if(localStorage.getItem('views') === null) {
            const defaultView = {
                name : "Vue par défaut",
                projects : {
                    auto : "",
                    manual : []
                },
                trackers : [],
                status : []
            }
            setCurrentView(defaultView)
            setViews([defaultView])
        } else {
            const tmp = JSON.parse(localStorage.getItem('views'))
            setViews(tmp)
            if(localStorage.getItem('lastView') === null) {
                setCurrentView(tmp[0])
            } else {
                setCurrentView(tmp.find(v => v.name === localStorage.getItem('lastView')))
            }
        }
    }, [])

    // Enregsitrement des vue dans le storage
    useEffect(() => {
        if(views.length > 0) {
            localStorage.setItem('views', JSON.stringify(views))
        }
    }, [views]);

    useEffect(() => {
        // Sauvegarde dans le localStorage
        if(currentView && Object.keys(currentView).length > 0) {
            localStorage.setItem('lastView', currentView.name)

            // Fetch des issues en utilisant la vue courante
            fetchIssues()
        }
    }, [currentView])

    // Système de pagination
    useEffect(() => {
        if(total > issues.length) {
            fetchPaginationIssues()
        }

        // Recalcul des colonnes
        let tmp = issues.reduce((arr , issue) => {
            let index_find = arr.findIndex(column => column.status.id === issue.status.id)

            if(index_find != -1)
            {
                arr[index_find].issues.push(extractDataFromIssue(issue))
            } else {
                arr.push({ status : issue.status, issues : [extractDataFromIssue(issue)]})
            }
            return arr;
        }, []);

        // Tri des colonnes par status id pour avoir les états de fin à droite du board
        setColumn(tmp.sort((a, b) => a.status.id > b.status.id ? 1 : -1));
    }, [issues])

    const addView = (view) => {
        setCurrentView(view)
        setViews([...views, view])
    }

    const removeCurrentView = () => {
        let newView = views.filter(v => v.name !== currentView.name)
        setViews(newView)
        setCurrentView(newView[0])
    }

    const editCurrentView = (view) => {
        setViews(views.map(v => {
            if(v.name === currentView.name)
                return view
            else
                return v
        }))
        setCurrentView(view)
    }

    const fetchIssues = async () => {

        // Si il y a une valeur dans projetAuto alors on chercher les projets avec ce nom
        let projects_ids = currentView.projects.manual.map(t => t.id)

        if(currentView.projects.auto) {
            let searched_project = await searchAll(currentView.projects.auto, 'projects', 100);
            projects_ids.push(...searched_project.results.map(s => s.id))
        }

        setProjectIds(projects_ids);

        // Fetch des issues
        let response = await getIssues(projects_ids, currentView.trackers.map(t => t.id), currentView.status.map(s => s.id))

        setIssues(response.issues);
        setTotal(response.total_count)
    }

    const fetchPaginationIssues = async () => {
        
        // Fetch des issues
        let response = await getIssues(projectIds, currentView.trackers.map(t => t.id), currentView.status.map(s => s.id), issues.length)

        // Groupement des issues par statut
        setIssues([...issues, ...response.issues]);
    }

    // Extrait les données utiles d'un ticket pour alléger les données
    const extractDataFromIssue = (issue) => {
        return {
            id : issue.id,
            link : `${process.env.REACT_APP_REDMINE_URL}/issues/${issue.id}`,
            subject : issue.subject,
            priority : issue.priority,
            project : issue.project,
            tracker : issue.tracker,
            done_ratio : issue.done_ratio,
            author : issue.author,
            assigned_to : issue.assigned_to,
            created_on : issue.created_on,
            updated_on : issue.updated_on,
        }
    }

    return (
        <ViewContext.Provider value={{
            currentView,
            setCurrentView,
            addView,
            removeCurrentView,
            editCurrentView,
            total,
            column,
            views,
            issues
        }}>
            {children}
        </ViewContext.Provider>
    )
}

export default ViewProvider;