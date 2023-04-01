import styled from "styled-components";
import Task from "./task"

const ColumnContainer = styled.div`
    width: 290px;
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
    max-height: calc(100% - 85px);
    overflow-y: auto;
    padding-right: 10px;
    transition: all 2s;

    &:hover {
        transition: all 2s;
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

function Column({tasks = [], name = ""}) {
    return (
        <ColumnContainer>
            <ColumnTitle><Dot color={getColor()}/>{name} ( {tasks.length} )</ColumnTitle>
            <ColumnList>
                {tasks.map(task => (
                    <Task key={task.title} task={task}/>
                ))}
            </ColumnList>
        </ColumnContainer>
    )
}

export default Column;