import styled from "styled-components"
import Span from "./basics/Span"

const Description = styled.p`
    margin-top: 5px;
    margin-bottom: 5px;
    color: ${props => props.theme.colors.grey};
`

function ResumeView ({projectAuto = "", projectsManual = [], trackers = [], status = []}) {
    /**
     * Création d'une phrase du type 'X, Y et Z' avec des Span pour mettre en évidence
     * @param {array} Labels
     */
    const constructSentence = (items) => {
        return items.map((label, i, row) => <span key={i}><Span>{label}</Span>{ i + 1 === row.length ? '' :  i + 2 === row.length ? ' et ' : ', '}</span>)
    }

    // Retourne un rapide résumé
    const getProjectResume = () => {
        if(projectsManual.length === 0 && projectAuto === "")
        {
            return <Span>de tous les projets</Span>
        } else {
            if(projectsManual.length === 1 )
            {
                return <span>du projet <Span>{projectsManual[0].label}</Span>{projectAuto !== "" && <span> et tout ceux avec le nom <Span>'{projectAuto}'</Span></span>}</span>
            } else if(projectsManual.length > 1) {
                return <span>des projets {constructSentence(projectsManual.map(t => t.label))} {projectAuto !== "" && <span> et tout ceux avec le nom <Span>'{projectAuto}'</Span></span>}</span>
            }

            return <span>des projets avec le nom <Span>'{projectAuto}'</Span></span>
        }
    }

    const getTrackerResume = () => {
        if(trackers.length === 0)
        {
            return <Span>tous les trackers</Span>
        } else if(trackers.length === 1) {
            return <span>le tracker <Span>{trackers[0].label}</Span></span>
        } else {
            return <span>les trackers {constructSentence(trackers.map(t => t.label))}</span>
        }
    }

    const getStatusResume = () => {
        if(status.length === 0)
        {
            return <Span>peu importe leurs états</Span>
        } else if(status.length === 1) {
            return <span>à l'état <Span>{status[0].label}</Span></span>
        } else {
            return <span>à l'état {constructSentence(status.map(t => t.label))}</span>
        }
    }

    return (
        <Description>Les tickets {getProjectResume()}, qui sont sur {getTrackerResume()} et {getStatusResume()}</Description>
    )
}

export default ResumeView;