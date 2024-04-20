import { useEffect, useState } from "react"

const initialFormData = {
    title: "",
    body: "",
    project: "",
    timestamp: "",
    uuid: crypto.randomUUID()
}

function CreateTask({ formData = null }) {
    const [{ title, body, project, timestamp, uuid }, setFormData] = useState(formData ?? initialFormData)
    const [date, setDate] = useState(Date.now())

    useEffect(() => {
        let time = setInterval(() => {
            setDate(new Date())
        }, 1000);
        return () => {
            clearInterval(time);
        };
    })

    function handleChange(event) {
        const { name, value } = event.target
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }

    function clearForm() {
        setFormData({ ...initialFormData })
        // also remove task list highlight?
    }

    function handleSubmit(event) {
        event.preventDefault()
        // storage.save().then(clearForm)
        console.log(title, body, project, timestamp, uuid)
        // if uuid is empty, set one
        // save to localStorage with UUID as the key
    }

    return (
        <form onSubmit={handleSubmit} className="content" id="create-task">
            <input name="title" placeholder="Title" value={title} onChange={handleChange}></input>
            <textarea name="body" placeholder="Additional Information…" value={body} onChange={handleChange}></textarea>
            <input name="project" placeholder="Project" value={project} onChange={handleChange}></input>
            <div>
                <span>{new Intl.DateTimeFormat(undefined, { year: '2-digit', month: '2-digit', day: '2-digit' }).format(date)}</span>
                <button type="submit">Save</button>
                <button onClick={clearForm}>Clear</button>
            </div>
        </form>
    )
}

export default CreateTask