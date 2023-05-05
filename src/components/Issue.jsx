import { Draggable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const IssueContainer = styled.div`
    background-color: ${props => props.isDrag ? props.theme.colors.backgroundSecondary : props.theme.colors.backgroundMain};
    min-height: 88px;
    margin-top: 20px;
    border-radius: 8px;
    display: flex;
    padding-left: 8px;
    padding-right: 8px;
    flex-direction: column;
    transition: background-color 0.5s, border-color 0.5s;
    border: 3px solid ${props => props.isDrag ? props.theme.colors.primary : 'transparent'};
    &:hover, &:focus {
        border-color: ${props => props.theme.colors.primary};
        background-color: ${props => props.theme.colors.backgroundSecondary};
    }
    max-width: 300px;
`

const IssueTitle = styled.h4`
    color: ${props => props.theme.colors.textPrimary};
    font-size: ${props => props.theme.fontSizes.large};
    overflow-wrap: break-word;
    margin-bottom: 10px; 
    margin-top: 15px;
`

const IssueHeader = styled.div`
    padding-top : 6px;
    display : flex;
    flex-direction : row;
    align-items: center;
    justify-content: space-between;
`

const IssueFooter = styled(IssueHeader)`
    padding-top : unset;
    padding-bottom : 6px;
`

const RedmineLink = styled.a`
    text-decoration: none;
    color : ${props => props.theme.colors.primary};
    transition : all 1s;
    &:hover {
        color : ${props => props.theme.colors.primaryFade};
        scale: 1.1;
    }
`

const Label = styled.button`
    all: unset;
    background-color: ${props => props.color};
    padding : 2px 10px 2px 10px;
    border-radius : 50px;
    color : ${props => props.theme.colors.textPrimary};
    transition : all 1s;
    &:hover {
        cursor: pointer;
        scale: 1.1;
    }
`

const AssignedToLabel = styled.h4`
    margin : unset;
    color : ${props => props.color};
    text-transform : uppercase;
`

function Issue({issue}) {

    const { t } = useTranslation();

    const getColor = (str) => {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (var i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
    }

    return (
        <div>
            <Draggable draggableId={`issue-${issue.id}`} index={issue.id} isDragDisabled={true}>
                {(provided, snapshot) => (
                    <IssueContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} isDrag={snapshot.isDragging}>
                        <IssueHeader>
                            <RedmineLink href={issue.link} target="_blank" title={t('issue.openTicket', {id : issue.id})}>#{issue.id}</RedmineLink>
                            <Label color={getColor(issue.project.name) + "70"} title={t('issue.setFilterToProject', {project : issue.project.name})}>{issue.project.name}</Label>
                        </IssueHeader>
                        <IssueTitle>{issue.subject}</IssueTitle>
                        <IssueFooter>
                            <Label color={getColor(issue.tracker.name) + "20"} title={t('issue.setFilterToTracker', {tracker : issue.tracker.name})}>{issue.tracker.name}</Label>
                            {issue.assigned_to && <AssignedToLabel title={issue.assigned_to.name} color={getColor(issue.assigned_to.name)}>{issue.assigned_to.name.match(/\b\w/g).join('')}</AssignedToLabel>}
                        </IssueFooter>
                    </IssueContainer>
                )}
            </Draggable>
        </div>
    )
}

export default Issue;