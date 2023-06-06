import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components";
import Button from "./basics/Button";
import {ReactComponent as BoardLogo} from "../assets/icon-board.svg";
import {ReactComponent as HideLogo} from "../assets/icon-hide-sidebar.svg";
import {ReactComponent as ShowLogo} from "../assets/icon-show-sidebar.svg";
import {ReactComponent as AddLogo} from "../assets/icon-add-task-mobile.svg";
import { ViewContext } from "../context/ViewContext";
import AddViewModal from "./modal/AddViewModal";
import VerticalScroll from "./basics/VerticalScroll";
import { useEffect } from "react";

const Background = styled.div`
    width: ${props => props.expanded ? '291px' : '0px'};
    overflow: hidden;
    background-color: ${props => props.theme.colors.backgroundMain};
    border-right: 1px solid ${props => props.theme.colors.stroke};
    display: 'flex';
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
    max-height: 80%;
    height: 80%;
`

const BoardItem = styled(Button)`
    border-radius: 0px 50px 50px 0px;
    width: 270px;
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
    &:hover:enabled, &:focus:enabled {
        background-color: transparent;
        box-shadow: inset 276px 0 0 0 ${props => props.theme.colors.stroke};
    }
    display: flex;
    column-gap: 20px;
    align-items: center;
    min-height: 48px;
`

const BoardButton = styled(BoardItem)`
    padding-left : 20px;
    font-size : ${props => props.theme.fontSizes.medium};
`

const AddViewButton = styled(BoardItem)`
    color: ${props => props.theme.colors.primary};
`

const HideButton = styled(BoardItem)`
    margin-bottom: 20px;
    height: 48px;
`

const BoardTitle = styled.h2`
    color: ${props => props.theme.colors.grey};
    font-size: ${props => props.theme.fontSizes.medium};
    padding-left: 30px;
    white-space: nowrap;
`

const LogoutButton = styled(Button)`
    margin : 10px;
    width : 90%;
`

const ShowButton = styled(Button)`
    position: absolute;
    left: ${props => props.expanded ? "0px" : "-100px"};
    border-radius: 0px 50px 50px 0px;
    bottom: 20px;
    display: flex;
    align-items: center;
    transition: 0.4s all;
    min-height: 48px;
`

const ScrollList = styled(VerticalScroll)`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    max-height: 80%;
    padding-right: 10px;
`

function Sidebar({ onLogout }) {
    const { t } = useTranslation();
    const theme = useTheme()

    const {currentView, views, setCurrentView} = useContext(ViewContext);

    const storage = localStorage.getItem('sideBarCollapsed');
    const [isExpanded, setIsExpanded] = useState(storage ? false : true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if(!currentView) {
            setShowModal(true)
        }
    }, [currentView])

    const handleAddView = (e) => {
        e.target.blur();
        setShowModal(true)
    }

    const handleToggler = () => {
        if(isExpanded) {
            setIsExpanded(false);
            localStorage.setItem('sideBarCollapsed', true);
        } else {
            setIsExpanded(true);
            localStorage.removeItem('sideBarCollapsed');
        }
    }
    
    return (
        <div>
            <Background expanded={isExpanded}>
                <BoardTitle>{t('common.allViews')} ( {views.length} )</BoardTitle>
                <BoardList>
                    <ScrollList hover={true} color={theme.colors.backgroundSecondary}>
                        {views && views.map(view => (
                            <BoardButton key={view.name} disabled={currentView.name === view.name} onClick={() => setCurrentView(view)}>
                                <BoardLogo fill={currentView.name === view.name ? theme.colors.textPrimary : theme.colors.grey}/>
                                {view.name}
                            </BoardButton>
                        ))}
                    </ScrollList>
                    <AddViewButton onClick={handleAddView}>
                        <AddLogo fill={theme.colors.primary}/> 
                        {t("action.createView")}
                    </AddViewButton>
                </BoardList>
                <LogoutButton size="S" onClick={onLogout}>{t('login.logout')}</LogoutButton>
                <HideButton size="L" onClick={handleToggler}><HideLogo />{t('action.hideSidebar')}</HideButton>
            </Background>
            <ShowButton size="S" onClick={handleToggler} expanded={!isExpanded}><ShowLogo/></ShowButton>
            <AddViewModal show={showModal} onClose={() => setShowModal(false)}></AddViewModal>
        </div>
    )
}

export default Sidebar;