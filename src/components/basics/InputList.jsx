import { useRef } from "react";
import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components"
import VerticalScroll from "./VerticalScroll";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding-bottom: 20px;
`

const Label = styled.label`
    color: ${props => props.theme.colors.textPrimary};
    font-size: ${props => props.theme.fontSizes.medium};
    font-weight: 500;
`

const InputDom = styled.input`
    background-color: ${props => props.theme.colors.backgroundMain};
    border: 1px solid ${props => props.theme.colors.stroke};
    color: ${props => props.theme.colors.textPrimary};
    border-radius: 4px;
    padding: 10px;
    transition: all 1s;
    &:focus, &:hover {
        border-color: ${props => props.theme.colors.primary};
        outline: none;
    }
`

const ScrollList = styled(VerticalScroll)`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    max-height: 400px;
    padding-right: 10px;
`

function InputList({label = "", type = "text", name = "", values = [], onChangeList,...props}) {

    const [list, setList] = useState(values);
    const scrollList = useRef(null)

    const theme = useTheme()

    useEffect(() => {
        if(list.length > 1) {
            onChangeList(list.filter((item) => item !== ""))
            scrollList.current.scrollTop = scrollList.current.scrollHeight
        }
    }, [list])

    const updateValue = (event, index) => {
        let items = [...list]
        
        // Ajout d'une nouvel input si la dernière valeur de la liste n'est pas vide
        if(items.slice(-1) !== "" && items[index] === "")
        {
            items.push("")
        }

        items[index] = event.target.value

        // On ne garde que les valeurs
        items = items.filter((item, index, arr) => item !== "" || index + 1 === arr.length)

        setList(items)        
    }

    return (
        <Container>
            <Label htmlFor={`${name}-0`}>{label}</Label>
            <ScrollList ref={scrollList} color={theme.colors.backgroundSecondary}>
                {list && list.map((value,index) => (
                    <InputDom
                        type={type}
                        key={`${name}-${index}`}
                        name={`${name}-${index}`}
                        id={`${name}-${index}`}
                        value={value}
                        onChange={(e) => updateValue(e, index)}
                        {...props}
                    />
                ))}
            </ScrollList>
        </Container>
    )
}

export default InputList