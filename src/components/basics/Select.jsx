import styled, { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import Input from "./Input";
import { useEffect, useState } from "react";
import VerticalScroll from "./VerticalScroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 5px;
`
const Label = styled.label`
    color: ${props => props.theme.colors.textPrimary};
    font-size: ${props => props.theme.fontSizes.medium};
    font-weight: 500;
`

const RequiredSpan = styled.span`
    font-size: ${props => props.theme.fontSizes.small};
    color: ${props => props.theme.colors.grey};
    float: right;
`

const SearchInput = styled(Input)`
`

const ListContainer = styled.div`
    background-color: ${props => props.theme.colors.backgroundMain};
    border: 1px solid ${props => props.theme.colors.stroke};
    border-radius: 5px;
    width: 99.8%;
    z-index: 11;
    margin-bottom: 10px;
`

const List = styled(VerticalScroll)`
    max-height: 100px;
    overflow-y : scroll;
`

const OptionCustom = styled.button`
    all: unset;
    width: 100%;
    color: ${props => props.theme.colors.textPrimary};
    height: 30px;
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.colors.backgroundMain};
    padding-left: 10px;
    transition: all 0.5s;
    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.colors.primary};
    }
`

const OptionCustomNeutral = styled(OptionCustom)`
    color: ${props => props.theme.colors.grey};
    &:hover {
        cursor: default;
        background-color: ${props => props.theme.colors.backgroundMain};
    }
`

const ChipContainer = styled.div`
    column-gap: 10px;
    padding-top: 10px;
    min-height: 20px;
    overflow-wrap: anywhere;
`

const Chip = styled.span`
    color: ${props => props.theme.colors.textPrimary};
    background-color: ${props => props.theme.colors.primary};
    padding: 3px 10px 3px 10px;
    margin-right: 10px;
    border-radius: 20px;
    white-space: nowrap;
    transition: all 0.5s;
    height: 20px;
    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.colors.primaryFade};
    };
`
const ChipNeutral = styled(Chip)`
    background-color: ${props => props.theme.colors.stroke};
    &:hover {
        cursor: default;
        background-color: ${props => props.theme.colors.stroke};
    }
`

const DeleteIcon = styled(FontAwesomeIcon)`
    margin-left: 4px;
`

const ResetButton = styled.span`
    color: ${props => props.theme.colors.error};
    transition: all 0.5s;
    &:hover {
        cursor: pointer;
        color: ${props => props.theme.colors.errorFade};
    }
`

function Select({values = [], onSearchChange, label = null, name, placeholder, onChange, options = [],...props}) {
    const { t } = useTranslation()
    const theme = useTheme()

    const [search, setSearch] = useState("")
    const [valuesD, setValuesD] = useState(values)
    const [optionsD , setOptionsD] = useState(options)

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleAdd = (e) => {
        const data = e.target.dataset;
        setValuesD([...valuesD, {id : data.id, label : data.label}])
    }

    const handleRemove = (id) => {
        setValuesD(valuesD.filter(v => v.id !== id))
    }

    const handleReset = () => {
        setValuesD([])
    }

    useEffect(() => {
        onChange(valuesD)
    }, [valuesD])

    // Attendre que l'utilisateur est finit de taper pour lancer le onChange
    useEffect(() => {
        if(onSearchChange)
        {
            const delayDebounceFn = setTimeout(async() => {
                setOptionsD(await onSearchChange(search))
            }, 400)
        
            return () => clearTimeout(delayDebounceFn)
        }
    }, [search])

    return (
        <Container>
            {label &&
                <Label htmlFor={name}>
                    {label}
                    {props.required && <RequiredSpan>{t("common.required")}</RequiredSpan>}
                </Label>
            }
            <ChipContainer>
                {valuesD.length > 0 ? (
                    <div>
                        {valuesD.map(({id, label}) => <Chip key={`option-${id}`} onClick={() => handleRemove(id)}>{label}<DeleteIcon icon={faXmark}/></Chip>)}
                        <ResetButton onClick={handleReset}>{t('common.unselectAll')}</ResetButton>
                    </div>
                    ) :
                    <ChipNeutral>{t('common.noneValue')}</ChipNeutral>
                }
            </ChipContainer>
            { onSearchChange != null && <SearchInput name={`search-${name}`} value={search} onChange={handleSearch} placeholder={placeholder}/>}
            <ListContainer>
                <List color={theme.colors.stroke}>
                    {optionsD && optionsD.filter(o => !valuesD.find(v => v.id == o.id)).map(({id, label}) => <OptionCustom className="option-button" key={`option-${id}`} data-id={id} data-label={label} onClick={handleAdd} type="button">{label}</OptionCustom>)}
                    {optionsD && optionsD.filter(o => !valuesD.find(v => v.id == o.id)).length === 0 && <OptionCustomNeutral type="button">{t('common.noMoreResult')}</OptionCustomNeutral>}
                </List>
            </ListContainer>
        </Container>
    )
}

export default Select;