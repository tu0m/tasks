import { useEffect, useState } from "react"

export default function Project({ taskData, isSelected, onSelect }) {

    const [selected, setSelected] = useState(isSelected)
    useEffect(() => setSelected(isSelected), [isSelected])

    function selectProject(event) {
        if ((event.type == "keyup" && !(event.key == "Enter" || event.key == " "))) return
        onSelect(taskData)
    }

    return (
        <li onClick={selectProject} onKeyUp={selectProject} tabIndex="0" data-selected={selected}>{taskData}</li>
    )
}