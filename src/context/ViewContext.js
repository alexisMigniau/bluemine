import { createContext, useEffect, useState } from "react";

export const ViewContext = createContext()

const ViewProvider = ({children}) => {

    const [views, setViews] = useState([]);
    const [currentView, setCurrentView] = useState({})

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
        localStorage.setItem('lastView', currentView.name)
    }, [currentView])

    const addView = (view) => {
        setCurrentView(view)
        setViews([...views, view])
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