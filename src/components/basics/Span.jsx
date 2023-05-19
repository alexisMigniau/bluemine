import styled from "styled-components"

const SpanCustom = styled.span`
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
`

function Span({children}) {
    return <SpanCustom>{children}</SpanCustom>
}

export default Span;