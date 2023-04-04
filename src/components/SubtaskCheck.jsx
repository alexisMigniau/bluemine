import { useEffect, useState } from "react";
import styled from "styled-components"
import {ReactComponent as CheckLogo} from "../assets/icon-check.svg";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${props => props.theme.colors.backgroundSecondary};
    min-height: 40px;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 4px;
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.theme.colors.primary + 45};
    }
`

const Checkbox = styled.input`
    width: 0px;
    height: 0px;
    opacity: 0;
    background-color: ${props => props.theme.colors.backgroundMain};
`

const CustomCheckbox = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${props => props.checked ? props.theme.colors.primary : props.theme.colors.backgroundMain};
    border-radius: 4px;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Label = styled.label`
    font-size: ${props => props.theme.fontSizes.medium};
    padding-left: 20px;
    color: ${props => props.checked ? props.theme.colors.grey : props.theme.colors.textPrimary};
    text-decoration: ${props => props.checked ? "line-through" : "none"};
    transition: all 0.5s;
`

const CheckLogoCustom = styled(CheckLogo)`
    scale: 1.3;
    stroke: ${props => props.checked ? "white" : props.theme.colors.backgroundMain};
    transition: all 0.5s;
`

function SubtaskCheck({subtask, onChange ,...props}) {

    const [checked, setChecked] = useState(subtask.isCompleted);

    const reverseChecked = (e) => {
        setChecked(!checked)
    }

    useEffect(() => {
        onChange(checked)
    }, [checked])

    return (
        <Container onClick={reverseChecked}>
            <Checkbox type="checkbox" id={props.key} name={props.key} checked={checked} onChange={reverseChecked}/>
            <CustomCheckbox checked={checked}><CheckLogoCustom checked={checked} /></CustomCheckbox>
            <Label htmlFor={props.key} checked={checked}>{subtask.title}</Label>
        </Container>
    )
}

export default SubtaskCheck