import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components";
import Button from "./basics/Button";
import {ReactComponent as BoardLogo} from "../assets/icon-board.svg";
import {ReactComponent as HideLogo} from "../assets/icon-hide-sidebar.svg";
import {ReactComponent as ShowLogo} from "../assets/icon-show-sidebar.svg";
import ThemeSwitch from "./ThemeSwitch";
import { BoardContext } from "../context/boardContext";

const Background = styled.div`
    width: ${props => props.expanded ? "299px" : "0px"};
    overflow: hidden;
    background-color: ${props => props.theme.colors.backgroundMain};
    border-right: 1px solid ${props => props.theme.colors.stroke};
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    transition: 0.4s all;
    height: 100%;
`
const BoardList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 10px;
    height: 100%;
`

const BoardItem = styled(Button)`
    border-radius: 0px 50px 50px 0px;
    width: 276px;
    text-align: left;
    padding-left: 40px;
    font-size: ${props => props.theme.fontSizes.large};
    background-color: transparent;
    color: ${props => props.theme.colors.grey};
    &:disabled {
        color: ${props => props.theme.colors.textPrimary};
        opacity: 100%;
        background-color: transparent;
        box-shadow: inset 276px 0 0 0 ${props => props.theme.colors.primary};
    }
    &:hover:enabled {
        background-color: transparent;
        box-shadow: inset 276px 0 0 0 ${props => props.theme.colors.stroke};
    }
    display: flex;
    column-gap: 20px;
    align-items: center;
`

const HideButton = styled(BoardItem)`
    margin-bottom: 20px;
`

const BoardTitle = styled.h2`
    color: ${props => props.theme.colors.grey};
    font-size: ${props => props.theme.fontSizes.medium};
    padding-left: 30px;
    white-space: nowrap;
`

const ShowButton = styled(Button)`
    position: absolute;
    left: ${props => props.expanded ? "0px" : "-100px"};
    border-radius: 0px 50px 50px 0px;
    bottom: 20px;
    display: flex;
    align-items: center;
    transition: 0.4s all;
`

function Sidebar() {
    const { t } = useTranslation();
    const theme = useTheme()

    const [hidden, isHidden] = useState(false);

    const {currentBoard, list, setCurrent} = useContext(BoardContext);
    
    return (
        <Background expanded={!hidden}>
            <BoardTitle>{t('common.allBoards')} ( {list.length} )</BoardTitle>
            <BoardList>
                {list && list.map(board => (
                    <BoardItem key={board} disabled={currentBoard.name === board} onClick={() => setCurrent(board)}>
                        <BoardLogo fill={currentBoard.name === board ? theme.colors.textPrimary : theme.colors.grey}/>
                        {board}
                    </BoardItem>
                ))}
            </BoardList>
            <ThemeSwitch/>
            <HideButton size="L" onClick={(e) => isHidden(true)}><HideLogo />{t('action.hideSidebar')}</HideButton>
            <ShowButton size="S" onClick={(e) => isHidden(false)} expanded={hidden}><ShowLogo/></ShowButton>
        </Background>
    )
}

export default Sidebar;