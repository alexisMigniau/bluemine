import styled from "styled-components"
import { forwardRef } from "react"

const Container = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-gutter: stable;
    ${props => props.hover ? `
        &:hover {
            &::-webkit-scrollbar
            {
                opacity: 100%;
            }
            &::-webkit-scrollbar-thumb
            {
                border-radius: 20px;
                background-color: ${props.color ? props.color : props.theme.colors.backgroundMain};
            }
        }
        &::-webkit-scrollbar
        {
            opacity: 0%;
            width: 12px;
        }
        &::-webkit-scrollbar-thumb
        {
            border-radius: 20px;
            background-color: transparent;
        }
    ` : `
        &::-webkit-scrollbar
        {
            width: 12px;
        }
        &::-webkit-scrollbar-thumb
        {
            border-radius: 20px;
            background-color: ${props.color ? props.color : props.theme.colors.backgroundMain};
        }
    `}
`

const VerticalScroll = forwardRef(({hover = false,...props}, ref) => {
    return (
        <Container ref={ref} hover={hover} {...props}>{props.children}</Container>
    )
})

export default VerticalScroll;