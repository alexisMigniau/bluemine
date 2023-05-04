import styled from "styled-components"

const SpanResume = styled.span`
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
`

const Description = styled.p`
    margin-top: 5px;
    margin-bottom: 5px;
    color: ${props => props.theme.colors.grey};
`

function ResumeView ({projectAuto = "", projectsManual = [], trackers = [], status = []}) {
    /**
     * Création d'une phrase du type 'X, Y et Z' avec des SpanResume pour mettre en évidence
     * @param {array} Labels
     */
    const constructSentence = (items) => {
        return items.map((label, i, row) => <span key={i}><SpanResume>{label}</SpanResume>{ i + 1 === row.length ? '' :  i + 2 === row.length ? ' et ' : ', '}</span>)
    }

    // Retourne un rapide résumé
    const getProjectResume = () => {
        if(projectsManual.length === 0 && projectAuto === "")
        {
            return <SpanResume>de tous les projets</SpanResume>
        } else {
            if(projectsManual.length === 1 )
            {
                return <span>du projet <SpanResume>{projectsManual[0].label}</SpanResume>{projectAuto !== "" && <span> et tout ceux avec le nom <SpanResume>'{projectAuto}'</SpanResume></span>}</span>
            } else if(projectsManual.length > 1) {
                return <span>des projets {constructSentence(projectsManual.map(t => t.label))} {projectAuto !== "" && <span> et tout ceux avec le nom <SpanResume>'{projectAuto}'</SpanResume></span>}</span>
            }

            return <span>des projets avec le nom <SpanResume>'{projectAuto}'</SpanResume></span>
        }
    }

    const getTrackerResume = () => {
        if(trackers.length === 0)
        {
            return <SpanResume>tous les trackers</SpanResume>
        } else if(trackers.length === 1) {
            return <span>le tracker <SpanResume>{trackers[0].label}</SpanResume></span>
        } else {
            return <span>les trackers {constructSentence(trackers.map(t => t.label))}</span>
        }
    }

    const getStatusResume = () => {
        if(status.length === 0)
        {
            return <SpanResume>peu importe leurs états</SpanResume>
        } else if(status.length === 1) {
            return <span>à l'état <SpanResume>{status[0].label}</SpanResume></span>
        } else {
            return <span>à l'état {constructSentence(status.map(t => t.label))}</span>
        }
    }

    return (
        <Description>Les tickets {getProjectResume()}, qui sont sur {getTrackerResume()} et {getStatusResume()}</Description>
    )
}

export default ResumeView;