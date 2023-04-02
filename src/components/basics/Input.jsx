import { useTranslation } from "react-i18next";
import styled from "styled-components";

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
    background-color: ${props => props.theme.colors.backgroundMain};
    border: 1px solid ${props => props.error ? props.theme.colors.error : props.theme.colors.stroke};
    color: ${props => props.theme.colors.textPrimary};
    border-radius: 4px;
    padding: 10px;
    transition: all 1s;
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

function Input({label = "", type = "text", name, error, ...props}) {
    
    const { t } = useTranslation()

    return (
        <Container>
            <Label htmlFor={name}>
                {label}
                {props.required && <RequiredSpan>{t("common.required")}</RequiredSpan>}
            </Label>
            <InputDom type={type} name={name} id={name} error={error} {...props} />
            <ErrorSpan>{error}</ErrorSpan>
        </Container>
    )
}

export default Input;