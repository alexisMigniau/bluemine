import styled, { useTheme } from "styled-components";
import VerticalScroll from "./VerticalScroll";
import {ReactComponent as AddLogo} from "../../assets/icon-add-task-mobile.svg";

const Background = styled.div`
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
`

const ModalContainer = styled.div`
    width: 480px;
    max-height: 675px;
    background-color: ${props => props.theme.colors.backgroundMain};
    border-radius: 8px;
    padding: 32px;
`

const ModalTitle = styled.h2`
    color: ${props => props.theme.colors.textPrimary};
    margin-top: 0px;
    margin-bottom: 0px;
    width: 100%;
`

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    align-content: space-around;
    width: 100%;
`

const CloseLogo = styled(AddLogo)`
    rotate: 45deg;
    transition: all 0.5s;
    scale: 1.5;
    &:hover {
        rotate: -45deg;
        scale: 2;
    }
`

function Modal({show, children, title, onClose}) {

    const theme = useTheme()

    return show ? (
        <Background>
            <ModalContainer>
                <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                    <CloseLogo fill={theme.colors.error} onClick={onClose}/>
                </ModalHeader>
                <VerticalScroll>{children}</VerticalScroll>
            </ModalContainer>
        </Background>
    ) : null;
}

export default Modal;