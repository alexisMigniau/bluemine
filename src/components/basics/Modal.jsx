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
    background-color: ${props => props.fullScreen ? props.theme.colors.backgroundMain : "rgba(0, 0, 0, 0.4)" };
    display: flex;
    align-items: start;
    padding-top: 5%;
    justify-content: center;
`

const ModalContainer = styled.div`
    width: ${props => props.width};
    max-height: 90%;
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
    margin-bottom: 20px;
`

const CloseLogo = styled(AddLogo)`
    rotate: 45deg;
    transition: all 0.5s;
    scale: 2.2;
    &:hover, &:focus {
        rotate: -45deg;
    }
    cursor: pointer;
`

function Modal({show, children, title, onClose, canClose = true, fullScreen = false, width = '480px'}) {

    const theme = useTheme()

    const handleClickOutside = (e) => {
        e.stopPropagation();
    }

    const handleManualClose = () => {
        if(canClose)
        {
            onClose()
        }
    }

    return show ? (
        <Background fullScreen={fullScreen} onClick={handleManualClose}>
            <ModalContainer onClick={handleClickOutside} width={width}>
                <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                    {canClose && <CloseLogo fill={theme.colors.error} onClick={handleManualClose}/>}
                </ModalHeader>
                <VerticalScroll>{children}</VerticalScroll>
            </ModalContainer>
        </Background>
    ) : null;
}

export default Modal;