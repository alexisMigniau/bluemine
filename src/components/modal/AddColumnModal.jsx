import { useTranslation } from "react-i18next";
import Modal from "../basics/Modal";
import Input from "../basics/Input";
import Button from "../basics/Button"
import styled from "styled-components";
import { useContext, useState } from "react";
import { BoardContext } from "../../context/boardContext";

const ConfirmButton = styled(Button)`
    width: 100%;
    margin-top: 20px;
`

function AddColumnModal(props) {
    const { t } = useTranslation();
    const { addColumn } = useContext(BoardContext)

    const [name, setName] = useState("");

    const [errors, setErrors] = useState({})

    const handleNameChange = (e) => {
        setName(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if(name === "")
        {
            setErrors({...errors, name : t("common.fieldIsRequired")})
        } else {
            addColumn(name)
            setName("")
            props.onClose()
        }
    }

    const onCloseCustom = (e) => {
        setErrors({})
        props.onClose(e)
    }

    return (
        <Modal {...props} onClose={onCloseCustom} title={t("action.addNewColumn")}>
            <form onSubmit={handleSubmit}>
                <Input
                    name="name"
                    label={t("board.form.name")}
                    placeholder={t("board.form.namePlaceHolder")}
                    value={name}
                    onChange={handleNameChange}
                    autoComplete="off"
                    error={errors.name}
                />
                <ConfirmButton size="S" type="submit">{t("column.form.addColumn")}</ConfirmButton>
            </form>
        </Modal>
    )
}

export default AddColumnModal;