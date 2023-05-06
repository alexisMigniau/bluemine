import { useTranslation } from "react-i18next";
import Modal from "../basics/Modal";
import { useContext } from "react";
import { ViewContext } from "../../context/ViewContext";
import ViewForm from "../form/ViewForm";

function EditViewModal(props) {
    const { t } = useTranslation();

    const { editCurrentView, currentView } = useContext(ViewContext);

    const handleSubmit = (view) => {
        editCurrentView(view)
        props.onClose()
    }

    const onCloseCustom = (e) => {
        props.onClose(e)
    }

    return (
        <Modal {...props} width={"80%"} onClose={onCloseCustom} title={t("view.form.editView")}>
            <ViewForm onSubmit={handleSubmit} view={currentView}/>
        </Modal>
    )
}

export default EditViewModal;