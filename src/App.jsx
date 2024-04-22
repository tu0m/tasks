import { useState, useEffect } from 'react'
import Project from './Project.jsx'
import Task from './Task.jsx'
import CreateTask from './CreateTask.jsx'

function App() {
  useEffect(() => window.onstorage = () => renderTasks())

  function renderTasks() {
    console.log('change in localStorage')
  }

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

  const exampleFormData = {
    title: "Title1",
    body: "Body2",
    project: "Project3",
    timestamp: "1713794256000",
    uuid: "233a732a-9e18-4e84-8255-31d95d245a12"
  }

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
        <CreateTask taskData={exampleFormData} />
      </div>
    </>
  )
}

export default App
