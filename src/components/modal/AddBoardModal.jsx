import { useTranslation } from "react-i18next";
import Modal from "../basics/Modal";
import Input from "../basics/Input";
import InputList from "../basics/InputList";
import Button from "../basics/Button"
import styled from "styled-components";
import { useContext, useState } from "react";
import { BoardContext } from "../../context/boardContext";

const ConfirmButton = styled(Button)`
    width: 100%;
`

function AddBoardModal(props) {
    const { t } = useTranslation();
    const { addBoard } = useContext(BoardContext)

    const [name, setName] = useState("");
    const [columns, setColumns] = useState([""])

    const [errors, setErrors] = useState({})

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleColumnChange = (list) => {
        setColumns(list)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(name === "")
        {
            setErrors({...errors, name : t("common.fieldIsRequired")})
        } else {
            addBoard(name, columns)
            setName("")
            setColumns([""])
            props.onClose()
        }
    }

    const onCloseCustom = (e) => {
        setErrors({})
        props.onClose(e)
    }

    return (
        <Modal {...props} onClose={onCloseCustom} title={t("board.form.addBoard")}>
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
                <InputList
                    name="columns"
                    label={t("board.form.column")}
                    placeholder={t("board.form.columnPlaceHolder")}
                    values={columns}
                    onChangeList={handleColumnChange}
                />
                <ConfirmButton size="S" type="submit">{t("action.createBoard")}</ConfirmButton>
            </form>
        </Modal>
    )
}

export default AddBoardModal;