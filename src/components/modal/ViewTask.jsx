import { useTranslation } from "react-i18next";
import Modal from "../basics/Modal";
import styled from "styled-components";
import SubtaskCheck from "../SubtaskCheck";

const Description = styled.h3`
    color: ${props => props.theme.colors.grey};
    font-size: ${props => props.theme.fontSizes.large};
`

const SubtaskTitle = styled.h2`
    color:  ${props => props.theme.colors.textPrimary};
    font-size: ${props => props.theme.fontSizes.medium};
    padding-top: 10px;
    padding-bottom: 8px;
`

const SubtaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

function ViewTask({task, ...props}) {

    const { t } = useTranslation();

    const handleChange = (index, checked) => {
        console.log(task)
    }

    return (
    <Modal {...props} title={task.title}>
        <Description>{task.description !== "" ? task.description : t('task.noDescription')}</Description>
        <SubtaskTitle>{t('task.subtaskTitle', {total : task.subtasks.length, completed : task.subtasks.filter(subtask => subtask.isCompleted).length})}</SubtaskTitle>
        <SubtaskContainer>
            {task.subtasks && task.subtasks.map((sub, index) => (
                <SubtaskCheck key={`subtask-${index}`} subtask={sub} onChange={(checked) => handleChange(index, checked)}/>
            ))}
        </SubtaskContainer>
    </Modal>
    )
}

export default ViewTask