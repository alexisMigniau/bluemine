import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

const Label = styled.label`
    color: ${props => props.theme.colors.textPrimary};
    font-size: ${props => props.theme.fontSizes.medium};
    font-weight: 500;
`

const InputDom = styled.input`
    z-index: 2;
    background-color: transparent;
    border: 1px solid ${props => props.error ? props.theme.colors.error : props.theme.colors.stroke};
    color: ${props => props.theme.colors.textPrimary};
    border-radius: 4px;
    padding: 10px;
    transition: all 0.5s;
    &:focus, &:hover {
        border-color: ${props => props.theme.colors.primary};
        outline: none;
    }
`

const RequiredSpan = styled.span`
    font-size: ${props => props.theme.fontSizes.small};
    color: ${props => props.theme.colors.grey};
    float: right;
`

const ErrorSpan = styled.span`
    font-size: ${props => props.theme.fontSizes.small};
    color: ${props => props.theme.colors.error};
    position: relative;
    bottom: 36px;
    text-align: right;
    right: 10px;
    height: 0px;
`

const ShowIcon = styled(FontAwesomeIcon)`
    position: relative;
    color: ${props => props.theme.colors.grey};
    bottom: 36px;
    width: 20px;
    z-index: 3;
    align-self: end;
    transition: all 0.5s;
    right: 10px;
    &:hover {
        color : ${props => props.theme.colors.primary};
        cursor: pointer;
    }
`

function Input({label = "", type = "text", name, error, ...props}) {
    
    const { t } = useTranslation()

    const [typeD, setTypeD] = useState(type)

    return (
        <Container>
            <Label htmlFor={name}>
                {label}
                {props.required && <RequiredSpan>{t("common.required")}</RequiredSpan>}
            </Label>
            <InputDom type={typeD} name={name} id={name} error={error} {...props} autoComplete={"off"} />
            {type === "password" && <ShowIcon icon={typeD === "password" ? faEye : faEyeSlash} onClick={() => setTypeD(typeD === "password" ? "text" : "password")}/>}
            <ErrorSpan>{error}</ErrorSpan>
        </Container>
    )
}

export default Input;