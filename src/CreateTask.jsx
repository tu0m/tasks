import { useEffect, useState, useRef, useReducer } from "react"

const emptyForm = {
    title: "",
    body: "",
    project: "",
    timestamp: "",
    uuid: ""
}

export default function CreateTask({ taskData = emptyForm }) {
    const [defaultValues, setDefaultValues] = useState(taskData)

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        // set uuid if needed
        if (!formData.get('uuid').length) formData.set('uuid', crypto.randomUUID())
        // set new timestamp
        formData.set('timestamp', Date.now())

        const object = Object.fromEntries(formData)
        console.log(object)

        // if (!title) return
        // saveData()

        // reset form


        // * YOU ARE HERE *
        // TODO: force re-render of the form? oruse some other way to set default values?
        setDefaultValues(emptyForm)






        // event.target.reset()
        // // reset uuid
        // setUuid(null)
    }

    function saveData() {
        // const formData = {
        //     title: title,
        //     body: body,
        //     project: project,
        //     timestamp: timestamp,
        //     uuid: uuid
        // }

        // localStorage.setItem(formData.uuid, JSON.stringify(formData))
        // window.dispatchEvent(new Event("storage"))
    }

    // // keep timestamp up to date
    // useEffect(() => {
    //     const updateTimestamp = () => setTimestamp(Date.now())
    //     const interval = setInterval(updateTimestamp, 1000)
    //     updateTimestamp()

    //     return () => clearInterval(interval)
    // }, [])

    // // set uuid
    // useEffect(() => {
    //     if (!uuid) console.log('setuuid')
    //     if (!uuid) setUuid(crypto.randomUUID())
    // }, [uuid])


    return (
        <form onSubmit={handleSubmit} className="content" id="create-task">
            <input name="title" placeholder="Title" defaultValue={defaultValues.title} required></input>
            <textarea name="body" placeholder="Additional Information…" defaultValue={defaultValues.body}></textarea>
            <input name="project" placeholder="Project" defaultValue={defaultValues.project}></input>
            <input name="uuid" type="hidden" defaultValue={defaultValues.uuid}></input>
            <div>
                {/* <span>{new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit' }).format(form.timestamp)}</span> */}
                {/* <span>{timestamp}</span> */}
                <button type="submit">Save</button>
                <button type="reset">Clear</button>
            </div>
        </form>
    )
}