import { createContext, useEffect, useState } from "react";
import { getIssues, getProjects, searchAll } from "../service/api";

export const ViewContext = createContext()

const ViewProvider = ({children}) => {

    const [views, setViews] = useState([]);
    const [currentView, setCurrentView] = useState({})
    const [issues, setIssues] = useState([])

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

    useEffect(() => {
        if(views.length > 0) {
            localStorage.setItem('views', JSON.stringify(views))
        }
    }, [views]);

    useEffect(() => {
        // Sauvegarde dans le localStorage
        if(Object.keys(currentView).length > 0) {
            localStorage.setItem('lastView', currentView.name)

            // Fetch des issues en utilisant la vue courante
            fetchIssues()
        }
    }, [currentView])

    const addView = (view) => {
        setCurrentView(view)
        setViews([...views, view])
    }

    const fetchIssues = async () => {
        // Si il y a une valeur dans projetAuto alors on chercher les projets avec ce nom
        let projects_ids = currentView.projects.manual.map(t => t.id)

        if(currentView.projects.auto) {
            let searched_project = await searchAll(currentView.projects.auto, 'projects', 200);
            projects_ids.push(...searched_project.results.map(s => s.id))
        }

        // Fetch des issues
        let response = await getIssues(projects_ids, currentView.trackers.map(t => t.id), currentView.status.map(s => s.id))

        // Groupement des issues par statut
        setIssues(response.issues.reduce((arr , issue) => {
            let index_find = arr.findIndex(column => column.status.id === issue.status.id)

            if(index_find != -1)
            {
                arr[index_find].issues.push(extractDataFromIssue(issue))
            } else {
                arr.push({ status : issue.status, issues : [extractDataFromIssue(issue)]})
            }
            return arr;
        }, []));
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
            views,
            issues
        }}>
            {children}
        </ViewContext.Provider>
    )
}

export default ViewProvider;