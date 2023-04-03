import styled from "styled-components";
import {ReactComponent as LightLogo} from "../assets/icon-light-theme.svg";
import {ReactComponent as DarkLogo} from "../assets/icon-dark-theme.svg";
import { useContext } from "react";
import { ThemePreferenceContext } from "../context/theme";

const Container = styled.div`
    width: 251px;
    display: flex;
    background-color: ${props => props.theme.colors.backgroundSecondary};
    justify-content: center;
    align-items: center;
    min-height: 48px;
    margin-left: 22px;
    border-radius: 10px;
    margin-bottom: 20px;
`

const SwitchContainer = styled.label`
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    align-items: center;
    cursor: pointer;
`

const CustomSlider = styled.div`
    position: relative;
    width: 40px;
    height: 20px;
    background: ${props => props.theme.colors.primary};
    border-radius: 32px;
    padding: 4px;
    transition: 300ms all;

    &:before {
        transition: 300ms all;
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 35px;
        top: 50%;
        left: 4px;
        background: white;
        transform: translate(0, -50%);
    }
`

const CustomCheckbox = styled.input`
    display: none;
    &:checked + ${CustomSlider} {
        &:before {
            transform: translate(20px, -50%);
        }
    }
`

function ThemeSwitch() {
    
    const {currentTheme, setCurrentTheme} = useContext(ThemePreferenceContext)

    return (
        <Container>
            <LightLogo/>
            <SwitchContainer>
                { currentTheme && <CustomCheckbox type={"checkbox"} checked={currentTheme === 'dark'} onChange={(e) => setCurrentTheme(e.target.checked ? 'dark' : 'light')}/>}
                <CustomSlider />
            </SwitchContainer>
            <DarkLogo/>
        </Container>
    )
}

export default ThemeSwitch;