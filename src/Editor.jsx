import { useEffect, useState } from "react"

const emptyForm = {
    title: "",
    body: "",
    project: "",
    timestamp: "",
    uuid: ""
}

export default function Editor({ taskData = emptyForm }) {
    const [formData, setFormData] = useState(taskData)
    useEffect(() => setFormData(taskData), [taskData])

    const [date, setDate] = useState(timestampToDate(Date.now()))

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        // set uuid if needed
        if (!formData.get('uuid').length) formData.set('uuid', crypto.randomUUID())
        // set new timestamp
        formData.set('timestamp', Date.now())

        const object = Object.fromEntries(formData)

        // this is probably unnecessary as the form already requires a title
        if (!object.title) return

        saveData(object)

        // clear form
        setFormData(emptyForm)
    }

    function saveData(object) {
        localStorage.setItem(`task-${object.uuid}`, JSON.stringify(object))
        window.dispatchEvent(new Event("storage"))
    }

    function clearForm() {
        if (confirm('All form text will be cleared. Continue?')) {
            setFormData(emptyForm)
        }
    }

    // show current date
    useEffect(() => {
        const updateDate = () => setDate(timestampToDate(Date.now()))
        const interval = setInterval(updateDate, 1000)

        return () => clearInterval(interval)
    }, [])

    function timestampToDate(timestamp) {
        return new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: '2-digit' }).format(timestamp)
    }

    return (
        <form onSubmit={handleSubmit} id="edit">
            <input value={formData.title} onChange={(e) => setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }))} name="title" placeholder="Task" required></input>
            <input value={formData.project} onChange={(e) => setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }))} name="project" placeholder="Project"></input>
            <textarea value={formData.body} onChange={(e) => setFormData(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }))} name="body" placeholder="Additional Information…"></textarea>
            <input name="uuid" type="hidden" value={formData.uuid}></input>
            <div>
                <span>{date}</span>
                <button type="submit">Save</button>
                <button type="reset" onClick={clearForm}>Clear</button>
            </div>
        </form>
    )
}