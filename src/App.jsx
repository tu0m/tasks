import { useState } from 'react'
import Project from './Project.jsx'
import Task from './Task.jsx'
import CreateTask from './CreateTask.jsx'

function App() {
  // remove this when localstorage is done?
  // const [taskData, setTaskData] = useState({
  //   title: "",
  //   body: "",
  //   project: "",
  //   timestamp: "",
  //   uuid: ""
  // })

  // const [editTask, setEditTask] = useState()

  // read localstorage and create multiple Task components
  // if localstorage changes, create or remove components? useEffect?
  // save tasks to localStorage with their UUID as key

  return (
    <>
      <div>
        <h1>Projects</h1>
        <Project />
      </div>
      <div>
        <h1>Tasks</h1>
        <Task />
      </div>
      <div>
        <h1>New Task</h1>
        <CreateTask />
      </div>
    </>
  )
}

export default App
