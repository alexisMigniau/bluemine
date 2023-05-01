import { createContext, useEffect, useState } from "react";
import { getIssues } from "../service/api";

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
        

        getIssues([], currentView.trackers.map(t => t.id), currentView.status.map(s => s.id))
    }

    return (
        <ViewContext.Provider value={{
            currentView,
            setCurrentView,
            addView,
            views,
        }}>
            {children}
        </ViewContext.Provider>
    )
}

export default ViewProvider;