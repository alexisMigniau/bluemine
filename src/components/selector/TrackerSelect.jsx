import { useEffect, useState } from "react";
import { getTrackers } from "../../service/api";
import { useTranslation } from "react-i18next";
import Select from "../basics/Select";

function TrackerSelect({values, onChange}) {
    const { t } = useTranslation();

    const [trackers, setTrackers] = useState(values);
    const [options, setOptions] = useState(null);

    const handleTrackersChange = (values) => {
        setTrackers(values)
    }

    useEffect(() => {
        onChange(trackers)
    }, [trackers])

    const updateOptions = async () => {
        const res = await getTrackers()
        setOptions(res.trackers.map(t => ({id : t.id, label : t.name})))
    }

    useEffect(() => {
        updateOptions();        
    }, [])

    return options && (
        <Select
            name="trackers"
            label={t('tracker.label')}
            onChange={handleTrackersChange}
            options={options}
            values={trackers}
        />
    )
}  export default TrackerSelect;