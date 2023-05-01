import { useEffect, useState } from "react";
import { getStatus } from "../../service/api";
import { useTranslation } from "react-i18next";
import Select from "../basics/Select";

function StatusSelect({values, onChange}) {
    const { t } = useTranslation();

    const [status, setStatus] = useState(values);
    const [options, setOptions] = useState(null);

    const handleStatusChange = (values) => {
        setStatus(values)
    }

    useEffect(() => {
        onChange(status)
    }, [status])

    const updateOptions = async () => {
        const res = await getStatus()
        setOptions(res.issue_statuses.map(t => ({id : t.id, label : t.name})))
    }

    useEffect(() => {
        updateOptions();        
    }, [])

    return options && (
        <Select
            name="status"
            label={t('status.label')}
            onChange={handleStatusChange}
            options={options}
        />
    )
}  export default StatusSelect;