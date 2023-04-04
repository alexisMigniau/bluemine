import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ViewTask from "./modal/ViewTask";

const TaskContainer = styled.div`
    background-color: ${props => props.isDrag ? props.theme.colors.backgroundSecondary : props.theme.colors.backgroundMain};
    min-height: 88px;
    margin-top: 20px;
    border-radius: 8px;
    display: flex;
    padding-left: 16px;
    padding-right: 16px;
    flex-direction: column;
    transition: background-color 0.5s, border-color 0.5s;
    border: 3px solid ${props => props.isDrag ? props.theme.colors.primary : 'transparent'};
    &:hover, &:focus {
        border-color: ${props => props.theme.colors.primary};
        background-color: ${props => props.theme.colors.backgroundSecondary};
    }
    max-width: 280px;
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

function Task({task, index}) {

    const { t } = useTranslation();

    const completedTask = task.subtasks.filter(subtask => subtask.isCompleted)

    const [showViewModal, setShowViewModel] = useState(false);

    return (
        <div>
            <Draggable draggableId={`${index}-${task.title}`} index={index}>
                {(provided, snapshot) => (
                    <TaskContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => setShowViewModel(true)} isDrag={snapshot.isDragging}>
                        <TaskTitle>{task.title}</TaskTitle>
                        <TaskProgress>{t('task.progress', {total : task.subtasks.length, completed : completedTask.length})}</TaskProgress>
                    </TaskContainer>
                )}
            </Draggable>
            <ViewTask task={task} show={showViewModal} index={index} onClose={() => setShowViewModel(false)}/>
        </div>
    )
}

export default Task;