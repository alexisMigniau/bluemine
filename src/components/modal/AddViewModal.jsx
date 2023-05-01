import { useTranslation } from "react-i18next";
import Modal from "../basics/Modal";
import Input from "../basics/Input";
import Button from "../basics/Button"
import styled from "styled-components";
import { useState, useContext } from "react";
import { ViewContext } from "../../context/ViewContext";
import ProjetSelect from "../selector/ProjectSelect";
import Tabs from "../basics/Tabs";
import TrackerSelect from "../selector/TrackerSelect";
import StatusSelect from "../selector/StatusSelect";
import ResumeView from "../ResumeView";

const ConfirmButton = styled(Button)`
    margin-top: 20px;
    width: 100%;
`

const Resume = styled.h3`
    color: ${props => props.theme.colors.textPrimary};
`

const Description = styled.p`
    color: ${props => props.theme.colors.grey};
`

const TabPanel = styled.div`
`

function AddViewModal(props) {
    const { t } = useTranslation();

    const { addView } = useContext(ViewContext);

    const [name, setName] = useState("");

    // Partie projet
    const [projectsManual, setProjectsManual] = useState([]);
    const [projectAuto, setProjectAuto] = useState("");

    const [trackers, setTrackers] = useState([]);
    const [status, setStatus] = useState([]);

    const [errors, setErrors] = useState({})

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleProjectManualChange = (values) => {
        setProjectsManual(values)
    }

    const handleProjectAutoChange = (e) => {
        setProjectAuto(e.target.value)
    }

    const handleTrackerChange = (values) => {
        setTrackers(values)
    }

    const handleStatusChange = (values) => {
        setStatus(values)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(name === "")
        {
            setErrors({...errors, name : t("common.fieldIsRequired")})
        } else {
            // Ajout la vue via le contexte
            addView({
                name : name,
                projects : {
                    auto : projectAuto,
                    manual : projectsManual
                },
                trackers : trackers,
                status : status
            })

            // On vide le formulaire
            setName("")
            setProjectAuto("")
            setProjectsManual([])
            setTrackers([])
            setStatus([])

            props.onClose()
        }
    }

    const onCloseCustom = (e) => {
        setErrors({})
        props.onClose(e)
    }

    return (
        <Modal {...props} width={"80%"} onClose={onCloseCustom} title={t("view.form.addView")}>
            <form onSubmit={handleSubmit}>
                <Input
                    name="name"
                    label={t("view.form.name")}
                    placeholder={t("view.form.namePlaceHolder")}
                    value={name}
                    onChange={handleNameChange}
                    autoComplete="off"
                    error={errors.name}
                    required
                />

                <Tabs>
                    {/* Projet */}
                    <TabPanel label={t("project.name")}>
                        <Description>{t("project.description")}</Description>
                        <ProjetSelect 
                            values={projectsManual}
                            onChange={handleProjectManualChange}
                        />
                        <Input 
                            name="projet-manual"
                            label={t("project.automatique.name")}
                            placeholder={t("project.automatique.placeholder")}
                            value={projectAuto}
                            onChange={handleProjectAutoChange}
                        />
                    </TabPanel>

                    {/* Tracker */}
                    <TabPanel label={t("tracker.name")}>
                        <Description>{t("tracker.description")}</Description>
                        <TrackerSelect
                            values={trackers}
                            onChange={handleTrackerChange}
                        />
                    </TabPanel>

                    {/* Status */}
                    <TabPanel label={t("status.name")}>
                        <Description>{t("status.description")}</Description>
                        <StatusSelect
                            values={status}
                            onChange={handleStatusChange}
                        />
                    </TabPanel>
                </Tabs>
               
                <Resume>En résumé</Resume>
                <ResumeView projectAuto={projectAuto} projectsManual={projectsManual} trackers={trackers} status={status}/>

                <ConfirmButton size="S" type="submit" onClick={handleSubmit}>{t("action.createView")}</ConfirmButton>
            </form>
        </Modal>
    )
}

export default AddViewModal;