import ProjectSelect from "../selector/ProjectSelect";
import Tabs from "../basics/Tabs";
import TrackerSelect from "../selector/TrackerSelect";
import StatusSelect from "../selector/StatusSelect";
import ResumeView from "../ResumeView";
import Input from "../basics/Input";
import Button from "../basics/Button";
import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Resume = styled.h3`
    color: ${props => props.theme.colors.textPrimary};
`

const Description = styled.p`
    color: ${props => props.theme.colors.grey};
`

const TabPanel = styled.div`
`

const ConfirmButton = styled(Button)`
    margin-top: 20px;
    width: 100%;
`

const CheckBoxContainer = styled.div`
    display : flex;
    flex-direction : row;
    column-gap : 20px;
    align-items : center;
    justify-content : center;
    padding-top : 20px;
`

const CustomCheckBox = styled.input``

const LabelCheckBox = styled.label`
    color : ${props => props.theme.colors.textPrimary};
`

function ViewForm ({view = {}, onSubmit}) {

    const { t } = useTranslation();

    const [name, setName] = useState(view.name ?? "");

    const [projectsManual, setProjectsManual] = useState((view.projects && view.projects.manual) ?? []);
    const [projectAuto, setProjectAuto] = useState((view.projects && view.projects.auto) ?? "");

    const [trackers, setTrackers] = useState(view.trackers ?? []);
    const [status, setStatus] = useState(view.status ?? []);
    const [assignedToMe, setAssignedToMe] = useState(view.assignedToMe ?? false)

    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()

        if(name === "")
        {
            setErrors({...errors, name : t("common.fieldIsRequired")})
        } else {
            // Ajout la vue via le contexte
            onSubmit({
                name : name,
                projects : {
                    auto : projectAuto,
                    manual : projectsManual
                },
                trackers : trackers,
                status : status,
                assignedToMe : assignedToMe
            })
        }
    }

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

    const handleAssignedToMe = (e) => {
        setAssignedToMe(e.target.checked)
    }

    return (
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
                    <ProjectSelect 
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

                {/* Assigne */}
                <TabPanel label={t("assigned.assigned")}>
                    <CheckBoxContainer>
                        <CustomCheckBox
                            name="assigned"
                            type="checkbox"
                            value={assignedToMe}
                            onChange={handleAssignedToMe}
                        />
                        <LabelCheckBox htmlFor="assigned">Uniquement les tickets qui me sont assignés</LabelCheckBox>
                    </CheckBoxContainer>
                </TabPanel>
            </Tabs>
        
            <Resume>En résumé</Resume>
            <ResumeView projectAuto={projectAuto} projectsManual={projectsManual} trackers={trackers} status={status}/>
            <ConfirmButton size="S" type="submit" onClick={handleSubmit}>{ t("common.register")}</ConfirmButton>
        </form>
    )
}

export default ViewForm;