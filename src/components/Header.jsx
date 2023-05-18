import styled from "styled-components";
import logoLight from "../assets/logo-light.svg" 
import { useContext, useState } from "react";
import { ViewContext } from "../context/ViewContext";
import ResumeView from "./ResumeView";
import Button from "./basics/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faChartSimple, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from "react-i18next";
import EditViewModal from "./modal/EditViewModal";

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

const BoardName = styled.div`
    display : flex;
    align-items : center;
    column-gap : 20px;
`

const BoardTitle = styled.h2`
    color: ${props => props.theme.colors.textPrimary};
    margin: 0px;
`

const HeaderButton = styled(Button)`
    display : flex;
    column-gap : 10px;
    align-items : center;
    font-size : 15px;
`

const ExpansiveButton = styled(HeaderButton)`
    overflow : hidden;
    justify-content : start;
    padding-left : 7px;
    width : auto;
    max-width : 30px;
    border-radius : 200px;
    transition : all 1s;
    &:hover {
        max-width : 300px;
    }
    font-size : 17px;
`

function Header() {

    const { currentView, total, issues, removeCurrentView, fetchIssues } = useContext(ViewContext);
    const {t} = useTranslation();

    const [showEditViewModal, setShowEditViewModal] = useState(false)

    return (
        <HeaderDiv>
            <SliderTop>
                <Logo src={logoLight} alt="Kanban logo"/>
            </SliderTop>
            <TitleContainer>
               {currentView && <BoardName>
                    <BoardTitle>{currentView.name}</BoardTitle>
                    <HeaderButton size="S" color="primary"><FontAwesomeIcon icon={faChartSimple} />
                        {issues.length === total ?
                           issues.length :
                           issues.length  + ' / '  +total
                        }
                    </HeaderButton>
                    <ExpansiveButton size="S" color="success" onClick={() => fetchIssues()}><FontAwesomeIcon icon={faArrowsRotate} spin={issues.length !== total}/>{t('common.sync')}</ExpansiveButton>
                    <ExpansiveButton size="S" color="warning" onClick={() => setShowEditViewModal(true)}><FontAwesomeIcon icon={faPen} />{t('common.edit')}</ExpansiveButton>
                    <ExpansiveButton size="S" color="error" onClick={removeCurrentView}><FontAwesomeIcon icon={faTrash} />{t('common.delete')}</ExpansiveButton>
                </BoardName>
                }
                {currentView && currentView.projects && <ResumeView projectAuto={currentView.projects.auto} projectsManual={currentView.projects.manual} trackers={currentView.trackers} status={currentView.status}/>}
            </TitleContainer>
            <EditViewModal show={showEditViewModal} onClose={() => setShowEditViewModal(false)}/>
        </HeaderDiv>
    )
}

export default Header;