import styled from "styled-components"
import { forwardRef } from "react"

const Container = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    &:hover {
        &::-webkit-scrollbar
        {
            opacity: 100%;
        }
        &::-webkit-scrollbar-thumb
        {
            border-radius: 20px;
            background-color: ${props => props.theme.colors.backgroundMain};
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
`

const VerticalScroll = forwardRef((props, ref) => {
    return (
        <Container ref={ref} {...props}>{props.children}</Container>
    )
})

export default VerticalScroll;