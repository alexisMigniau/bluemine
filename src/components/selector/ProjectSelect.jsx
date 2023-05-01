import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "../basics/Select";
import { getProjects, searchAll } from "../../service/api"

function ProjetSelect({values, onChange}) {
    const { t } = useTranslation();

    const [project, setProjects] = useState(values);

    const handleSearchProject = async (search) => {
        // Petit tricks pour chercher le projet
        if(search === "")
        {
            const res = await getProjects(search)
            return res.projects.map(p => ({'id' : p.id, 'label' : p.name}))
        } else {
            const res = await searchAll(search, 'projects')
            // Le title contient le label 'Projet:' au début, on l'enlève
            return res.results.map(p => ({'id': p.id, 'label' : p.title.slice(p.title.indexOf(' ') + 1)}))
        }
    }

    const handleProjectChange = (values) => {
        setProjects(values)
    }

    useEffect(() => {
        onChange(project)
    }, [project])

    return (
        <Select
            name="projet-manual"
            label={t("project.manual.name")}
            placeholder={t("project.manual.placeholder")}
            onChange={handleProjectChange}
            onSearchChange={handleSearchProject}
        />
    )
}  export default ProjetSelect;