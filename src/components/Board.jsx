import { useContext } from "react";
import styled from "styled-components";
import { BoardContext } from "../context/boardContext";
import { DragDropContext } from 'react-beautiful-dnd';
import Column from "./Column"

const List = styled.div`
    display: flex;
    column-gap: 25px;
    margin-top: 10px;
    margin-left: 30px;
    max-height: 100%;
`

function Board() {

    const { currentBoard, moveTask } = useContext(BoardContext);

    const handleDragEnd = ({ source, destination }) => {
        if(source && destination) {
            moveTask(source.droppableId.split("-").pop() , source.index, destination.droppableId.split("-").pop(),destination.index)
        }
    };

    return (
        <List>
            <DragDropContext onDragEnd={handleDragEnd}>
                {currentBoard.columns.map((column, index) => (
                    <Column key={`${column.name}-${index}`} index={index} tasks={column.tasks} name={column.name}/>
                ))}
            </DragDropContext>
        </List>
    )
}

export default Board