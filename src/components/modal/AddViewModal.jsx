import { useTranslation } from "react-i18next";
import Modal from "../basics/Modal";
import { useContext } from "react";
import { ViewContext } from "../../context/ViewContext";
import ViewForm from "../form/ViewForm";

function AddViewModal(props) {
    const { t } = useTranslation();

    const { addView } = useContext(ViewContext);

    const handleSubmit = (view) => {
       
        addView(view)
        props.onClose()
    }

    const onCloseCustom = (e) => {
        props.onClose(e)
    }

    return (
        <Modal {...props} width={"80%"} onClose={onCloseCustom} title={t("view.form.addView")}>
            <ViewForm onSubmit={handleSubmit}/>
        </Modal>
    )
}

export default AddViewModal;