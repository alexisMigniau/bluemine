import { useTranslation } from "react-i18next";
import Modal from "../basics/Modal";
import { useContext } from "react";
import { ViewContext } from "../../context/ViewContext";
import ViewForm from "../form/ViewForm";

function AddViewModal(props) {
    const { t } = useTranslation();

    const { addView, currentView } = useContext(ViewContext);

    const handleSubmit = (view) => {
       
        addView(view)
        props.onClose()
    }

    const onCloseCustom = (e) => {
        props.onClose(e)
    }

    return (
        <Modal {...props} width={"80%"} canClose={currentView ? true : false} onClose={onCloseCustom} title={currentView ? t("view.form.addView") : t("view.form.createYourFirstView")}>
            <ViewForm onSubmit={handleSubmit}/>
        </Modal>
    )
}

export default AddViewModal;