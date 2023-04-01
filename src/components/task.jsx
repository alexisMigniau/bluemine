import { useTranslation } from "react-i18next";
import styled from "styled-components";

const TaskContainer = styled.div`
    background-color: ${props => props.theme.colors.backgroundMain};
    min-height: 88px;
    margin-top: 20px;
    border-radius: 8px;
    display: flex;
    padding-left: 16px;
    padding-right: 16px;
    flex-direction: column;
    transition: all 0.5s ease-in-out;
    border: 2px solid transparent;
    &:hover {
        border-color: ${props => props.theme.colors.stroke};
        background-color: ${props => props.theme.colors.backgroundSecondary};
    }
`

const TaskTitle = styled.h4`
    color: ${props => props.theme.colors.textPrimary};
    font-size: ${props => props.theme.fontSizes.large};
    margin-bottom: 10px; 
    margin-top: 15px;
`

const TaskProgress = styled.h5`
    color: ${props => props.theme.colors.grey};
    font-size: ${props => props.theme.fontSizes.medium};
    margin-top: 0px;
    margin-bottom: 10px;
`

function Task({task}) {

    const { t } = useTranslation()
    const completedTask = task.subtasks.filter(subtask => subtask.isCompleted)

    return (
        <TaskContainer>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskProgress>{t('task.progress', {total : task.subtasks.length, completed : completedTask.length})}</TaskProgress>
        </TaskContainer>
    )
}

export default Task;