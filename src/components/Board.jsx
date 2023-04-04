import { useContext, useState } from "react";
import styled, { useTheme } from "styled-components";
import { BoardContext } from "../context/boardContext";
import { DragDropContext } from 'react-beautiful-dnd';
import {ReactComponent as AddLogo} from "../assets/icon-add-task-mobile.svg";
import Column from "./Column"
import { useTranslation } from "react-i18next";
import AddColumnModal from "./modal/AddColumnModal";
import VerticalScroll from "./basics/VerticalScroll";

const List = styled(VerticalScroll)`
    display: flex;
    column-gap: 25px;
    margin-top: 10px;
    margin-left: 30px;
    max-height: 100%;
    max-width: 80%;
    overflow-x: auto;
    margin-bottom: 15px;
`

const AddColumn = styled.div`
    color: ${props => props.theme.colors.grey};
    font-size: ${props => props.theme.fontSizes.xl};
    display: flex;
    align-items: center;
    column-gap: 10px;
    background-color: ${props => props.theme.colors.backgroundMain};
    margin-top: 65px;
    margin-bottom: 40px;
    border-radius: 8px;
    min-width: 280px;
    justify-content: center;
    opacity: 35%;
    font-weight: 600;
    border: 4px solid transparent;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &:hover {
        border-color: ${props => props.theme.colors.primary};
        opacity: 100%;
        background-color: ${props => props.theme.colors.backgroundSecondary};
    }
`

function Board() {
    const { t } = useTranslation()
    const theme = useTheme()
    const { currentBoard, moveTask } = useContext(BoardContext);

    const [showModal, setShowModal] = useState(false)

    const handleDragEnd = ({ source, destination }) => {
        if(source && destination) {
            moveTask(source.droppableId.split("-").pop() , source.index, destination.droppableId.split("-").pop(),destination.index)
        }
    };

    const handleNewColumn = () => {
        setShowModal(true);
    }

    return (
        <List>
            <DragDropContext onDragEnd={handleDragEnd}>
                {currentBoard.columns.map((column, index) => (
                    <Column key={`${column.name}-${index}`} index={index} tasks={column.tasks} name={column.name}/>
                ))}
                <AddColumn onClick={handleNewColumn}><AddLogo fill={theme.colors.grey}/>{t('action.addNewColumn')}</AddColumn>
            </DragDropContext>
            <AddColumnModal show={showModal} onClose={() => setShowModal(false)}/>
        </List>
    )
}

export default Board