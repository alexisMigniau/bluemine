import { useContext } from "react";
import styled from "styled-components";
import { BoardContext } from "../context/boardContext";
import Column from "./column"

const List = styled.div`
    display: flex;
    column-gap: 25px;
    margin-top: 10px;
    margin-left: 30px;
    max-height: 100%;
`

function Board() {

    const {currentBoard} = useContext(BoardContext);

    return (
        <List>
            {currentBoard.columns.map(column => (
                <Column key={column.name} tasks={column.tasks} name={column.name}/>
            ))}
        </List>
    )
}

export default Board