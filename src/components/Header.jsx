import styled from "styled-components";
import logoLight from "../assets/logo-light.svg" 
import { useContext } from "react";
import { ViewContext } from "../context/ViewContext";
import ResumeView from "./ResumeView";

const HeaderDiv = styled.div`
    background-color: ${props => props.theme.colors.backgroundMain};
    height: 90px;
    display: flex;
    align-items: center;
    padding-right: 20px;
    justify-content: flex-start;
    border-bottom: 1px solid ${props => props.theme.colors.stroke};
`

const Logo = styled.img`
    height: 25px;
`

const SliderTop = styled.div`
    width: 257px;
    padding-left: 34px;
    border-right: 1px solid ${props => props.theme.colors.stroke};
    height: 100%;
    display: flex;
    align-items: center;
`

const TitleContainer = styled.div`
    width: 100%;
    flex-shrink: 100;
    padding-left: 20px;
    display : flex;
    flex-direction : column;
    padding-top: 10px;
`

const BoardName = styled.h2`
    color: ${props => props.theme.colors.textPrimary};
    margin: 0px;
`

function Header() {

    const { currentView, issues, total } = useContext(ViewContext);

    return currentView && (
        <HeaderDiv>
            <SliderTop>
                <Logo src={logoLight} alt="Kanban logo"/>
            </SliderTop>
            <TitleContainer>
                <BoardName>{currentView.name} - {issues.length === total ? total : `${issues.length}/${total}`}</BoardName>
                {currentView.projects && <ResumeView projectAuto={currentView.projects.auto} projectsManual={currentView.projects.manual} trackers={currentView.trackers} status={currentView.status}/>}
            </TitleContainer>
        </HeaderDiv>
    )
}

export default Header;