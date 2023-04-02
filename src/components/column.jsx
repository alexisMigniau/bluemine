import { useContext, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { BoardContext } from "../context/boardContext";
import Task from "./task"

const ColumnContainer = styled.div`
    width: 280px;
    height: 100%;
`

const ColumnTitle = styled.h3`
    font-size: ${props => props.theme.fontSizes.medium};
    color: ${props => props.theme.colors.grey};
    text-transform: uppercase;
    letter-spacing: 2px;
`

const Dot = styled.span`
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: ${props => props.color};
    display: inline-block;
    margin-right: 10px;
`

const ColumnList = styled.div`
    height: calc(100% - 85px);
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;
    transition: all 0.5s;
    &:hover {
        &::-webkit-scrollbar
        {
            opacity: 100%;
        }
        &::-webkit-scrollbar-thumb
        {
            border-radius: 20px;
            background-color: ${props => props.theme.colors.backgroundMain};
        }
    }
    &::-webkit-scrollbar
    {
        opacity: 0%;
        width: 12px;
    }
    &::-webkit-scrollbar-thumb
    {
        border-radius: 20px;
        background-color: transparent;
    }
`

function getColor(){ 
    return `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.8)`
}

function Column({index}) {

    const { currentBoard } = useContext(BoardContext);

    useEffect(() => {
        console.log(currentBoard)
    }, [currentBoard])

    return (
        <ColumnContainer>
            <ColumnTitle><Dot color={getColor()}/>{currentBoard.name} ( {currentBoard.columns[index].tasks.length} )</ColumnTitle>
            <Droppable droppableId={`${currentBoard.name}-${index}`}>
                {(provided) => (
                    <ColumnList ref={provided.innerRef} {...provided.droppableProps}>
                        {currentBoard.columns[index].tasks.map((task, index) => (
                            <Task key={`${task.title}-${index}`} task={task} index={index}/>
                        ))}
                        {provided.placeholder}
                    </ColumnList>
                )}
            </Droppable>
        </ColumnContainer>
    )
}

export default Column;