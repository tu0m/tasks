export default function Task({ taskData, onSelectTask, onSelectProject }) {

    function editTask(event) {
        if ((event.type == "keyup" && !(event.key == "Enter" || event.key == " "))) return
        onSelectTask({ ...taskData })
    }

    function deleteTask() {
        if (confirm('This task will be deleted. Continue?')) {
            localStorage.removeItem(`task-${taskData.uuid}`)
            window.dispatchEvent(new Event("storage"))
        }
    }

    function selectProject(event) {
        if ((event.type == "keyup" && !(event.key == "Enter" || event.key == " "))) return
        onSelectProject(taskData.project)
    }

    function timestampToDate(timestamp) {
        return new Intl.DateTimeFormat(undefined, { month: 'short', day: '2-digit' }).format(timestamp)
    }

    return (
        <div className="task">
            <div onClick={editTask} onKeyUp={editTask} tabIndex="0">
                <h2 className="taskTitle">{taskData.title}</h2>
                <p className="taskBody">{taskData.body}</p>
            </div>
            {taskData.project ? <span onClick={selectProject} className="taskProject">{taskData.project}</span> : null}
            <span className="taskTimestamp">{timestampToDate(taskData.timestamp)}</span>
            <button onClick={deleteTask} name="delete">×</button>
        </div>
    )
}