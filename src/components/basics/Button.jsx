import styled from "styled-components";

const BasicButton = styled.button`
    height: ${props => props.size === "L" ? "48px" : "30px"};
    background-color: ${props =>  props.color !== 'secondary' ? props.theme.colors[props.color] : props.theme.colors.textPrimary};
    color: ${props => props.color === 'secondary' ? props.theme.colors.primary : props.theme.colors.textPrimary};
    border : none;
    white-space: nowrap;
    border-radius: 100px;
    padding: 0px 20px 0px 20px;
    font-weight: 600;
    font-size: ${props => props.size === "L" ? "19px" : "15px"};;
    transform: translate(0%);
    transition: 0.3s ease-out;
    &:hover:enabled {
        background-color: ${props => props.theme.colors[props.color + 'Fade']};
        cursor: pointer;
    }
    &:disabled {
        opacity: 25%;
    }
`
// Bouton basique
// Size = L ou S
// Type = primary , secondary, error
function Button({ children, onClick, size = "L", color = "primary", disabled = false, className, ...props}) {
    return (
        <BasicButton
            onClick={onClick}
            size={size}
            color={color}
            disabled={disabled}
            className={className}
            {...props}
        >
            {children}
        </BasicButton>
    )
}

export default Button;