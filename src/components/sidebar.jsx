import { useState } from "react";
import styled from "styled-components";

const Background = styled.div`
    height: 100vh;
    width: 300px;
    background-color: ${props => props.theme.colors.backgroundMain};
    border-right: 1px solid ${props => props.theme.colors.stroke};
`

function Sidebar() {

    const [hidden, isHidden] = useState(false);

    return (
        <Background></Background>
    )
}

export default Sidebar;