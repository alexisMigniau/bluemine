import { useContext } from "react";
import styled from "styled-components";
import { ViewContext } from "../context/ViewContext";
import { DragDropContext } from 'react-beautiful-dnd';

import Column from "./Column"
import VerticalScroll from "./basics/VerticalScroll";
import { getIssue } from "../service/api";

const List = styled(VerticalScroll)`
    display: flex;
    column-gap: 10px;
    margin-top: 10px;
    margin-left: 30px;
    max-height: 100%;
    overflow-x: auto;
    margin-bottom: 15px;
`

function Board() {
    const { column } = useContext(ViewContext);

    const handleDragStart = async (item) => {
        // On va chercher les statuts disponibles pour ce ticket
        const res = await getIssue(item.source.index);
        console.log(res)
    }

    return (
        <List>
            <DragDropContext onDragStart={handleDragStart}>
                {column && column.map(({status, issues}) => (
                    <Column key={`${status.name}-${status.id}`} status={status} issues={issues} />
                ))}
            </DragDropContext>
        </List>
    )
}

export default Board