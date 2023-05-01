import { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ViewContext } from "../context/ViewContext";
import Task from "./Task"
import VerticalScroll from "./basics/VerticalScroll";

const ColumnContainer = styled.div`
    min-width: 280px;
    height: 100%;
`

const ColumnTitle = styled.h3`
    font-size: ${props => props.theme.fontSizes.medium};
    color: ${props => props.theme.colors.grey};
    text-transform: uppercase;
    letter-spacing: 2px;
    height: 20px;
`

const Dot = styled.span`
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: ${props => props.color};
    display: inline-block;
    margin-right: 10px;
`

const ColumnList = styled(VerticalScroll)`
    height: calc(100% - 85px);
    padding-right: 10px;
`

function getColor(){ 
    return `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.8)`
}

function Column({index}) {

    const { currentBoard } = useContext(ViewContext);

    return (
        <ColumnContainer>
            <ColumnTitle><Dot color={getColor()}/>{currentBoard.columns[index].name} ( {currentBoard.columns[index].tasks.length} )</ColumnTitle>
            <Droppable droppableId={`${currentBoard.name}-${index}`}>
                {(provided) => (
                    <ColumnList ref={provided.innerRef} {...provided.droppableProps} hover={true}>
                        {currentBoard.columns[index].tasks.map((task, index_task) => (
                            <Task key={`${task.title}-${index_task}`} task={task} index={index_task} column_index={index}/>
                        ))}
                        {provided.placeholder}
                    </ColumnList>
                )}
            </Droppable>
        </ColumnContainer>
    )
}

export default Column;