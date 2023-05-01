import { useState } from "react";
import styled from "styled-components";

const TabsContainer = styled.div``

const TabsList = styled.div`
    padding-top : 10px;
    padding-bottom: 10px;
    display: flex;
`

const TabButton = styled.button`
    all: unset;
    width: 100%;
    text-align: center;
    transition: all 0.5s;
    color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textPrimary};
    padding-bottom : 10px;
    border-bottom : 2px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.textPrimary };
    letter-spacing: 2px;
    text-transform: uppercase;
    ${props => !props.active && `
        &:hover {
            cursor: pointer;
            color: ${props.theme.colors.primaryFade};
            border-bottom : 2px solid ${props.theme.colors.primaryFade };
        }`
    }
`

const TabContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    display: ${props => props.active ? 'normal' : 'none'};
`

function Tabs({children}) {

    const [activeTab, setActiveTab] = useState(0)

    const handleChangeTab = (index) => {
        setActiveTab(index)
    };

    return (
        <TabsContainer>
            <TabsList>
                {children.map((child, i) => <TabButton key={`tabs-button-${child.props.label}`} active={i === activeTab} type="button" onClick={() => handleChangeTab(i)}>{child.props.label}</TabButton>)}
            </TabsList>
            {children.map((child, i) => <TabContent key={`tabs-content-${child.props.label}`} active={i === activeTab}>{child.props.children}</TabContent>)}
        </TabsContainer>
    )
}

export default Tabs;