import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Issue from "./Issue"
import VerticalScroll from "./basics/VerticalScroll";

const ColumnContainer = styled.div`
    width: 300px;
    height: 100%;
`

const ColumnTitle = styled.h3`
    font-size: ${props => props.theme.fontSizes.medium};
    color: ${props => props.theme.colors.grey};
    text-transform: uppercase;
    letter-spacing: 2px;
    height: 30px;
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

const CountLabel = styled.span`
    white-space: nowrap;
`

const getColor = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

function Column({status, issues}) {

    return (
        <ColumnContainer>
            <ColumnTitle><Dot color={getColor(status.name)}/>{status.name} <CountLabel> ( {issues.length} )</CountLabel></ColumnTitle>
            <Droppable droppableId={`${status.name}-${status.id}`}>
                {(provided) => (
                    <ColumnList ref={provided.innerRef} {...provided.droppableProps} hover={true}>
                        {issues.map(issue => (
                            <Issue key={`issue-${issue.id}`} issue={issue} />
                        ))}
                        {provided.placeholder}
                    </ColumnList>
                )}
            </Droppable>
        </ColumnContainer>
    )
}

export default Column;