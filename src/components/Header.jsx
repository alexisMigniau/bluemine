import { useTranslation } from "react-i18next";
import styled, {useTheme} from "styled-components";
import logoLight from "../assets/logo-light.svg" 
import Button from "./basics/Button";
import {ReactComponent as AddLogo} from "../assets/icon-add-task-mobile.svg";
import { useContext } from "react";
import { BoardContext } from "../context/boardContext";

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
    width: 266px;
    padding-left: 34px;
    border-right: 1px solid ${props => props.theme.colors.stroke};
    height: 100%;
    display: flex;
    align-items: center;
`

const BoardName = styled.h1`
    color: ${props => props.theme.colors.textPrimary};
    width: 100%;
    flex-shrink: 100;
    padding-left: 20px;
`

function Header() {

    const { t } = useTranslation();
    const theme = useTheme()

    const { currentBoard } = useContext(BoardContext);

    return (
        <HeaderDiv>
            <SliderTop>
                <Logo src={logoLight} alt="Kanban logo"/>
            </SliderTop>
            <BoardName>{currentBoard.name}</BoardName>
            <Button><AddLogo fill={theme.colors.textPrimary}/> {t('action.addNewTask')}</Button>
        </HeaderDiv>
    )
}

export default Header;