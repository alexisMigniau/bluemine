import { useContext } from "react";
import styled from "styled-components";
import { ViewContext } from "../context/ViewContext";
import { DragDropContext } from 'react-beautiful-dnd';

import Column from "./Column"
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

function Board() {
    const { currentView } = useContext(ViewContext);

    const handleDragEnd = ({ source, destination }) => {
        if(source && destination) {
           
        }
    };

    return (
        <List>
            <DragDropContext onDragEnd={handleDragEnd}>
                {currentView.columns && currentView.columns.map((column, index) => (
                    <Column key={`${column.name}-${index}`} index={index} tasks={column.tasks} name={column.name}/>
                ))}
            </DragDropContext>
        </List>
    )
}

export default Board