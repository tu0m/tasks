import { useState, useEffect, useRef } from 'react'
import Project from './Project.jsx'
import Task from './Task.jsx'
import Editor from './Editor.jsx'

function App() {
  // listen for storage events and update state
  const [taskStorage, setTaskStorage] = useState(getLocalStorage())
  // TIL: I think there is an issue with react developer tools in chrome or maybe with the 'vite run dev' thingy.
  // Sometimes useState stops working after like 2 seconds from page refresh? Clicking around react dev tools fixes it?
  // Or maybe I'm the issue. It's a WONTFIX then.
  window.onstorage = () => setTaskStorage(getLocalStorage())

  function getLocalStorage() {
    return Object.entries(localStorage).filter(([key, value]) => key.startsWith('task-')).map(([key, value]) => JSON.parse(value))
  }

  // filter tasks based on selected project
  const [currentProject, setCurrentProject] = useState("All")

  // edit selected task
  const [currentTask, setCurrentTask] = useState()

  function projectsSortedAndFiltered(array) {
    // create Set out of taskStorage, convert it back to Array (removes duplicates), map project names, sort with no case-sensitivity, filter out empty values
    return [...new Set(array.map(task => task.project).sort(Intl.Collator().compare).filter(item => item))]
  }

  function tasksSortedAndFiltered(array) {
    // if project has 0 tasks, show all tasks
    if (currentProject != "All" && array.filter(task => task.project == currentProject) == 0) setCurrentProject("All")
    // show all tasks or filter by project name
    return (currentProject == "All")
      ? array.sort((a, b) => a.timestamp - b.timestamp).reverse()
      : array.sort((a, b) => a.timestamp - b.timestamp).reverse().filter(task => task.project == currentProject)
  }

  return (
    <>
      <div>
        <h1>Projects</h1>
        <ul className="content" id="projects">
          <Project taskData={"All"} key={"All"} isSelected={"All" == currentProject} onSelect={setCurrentProject}></Project>
          {projectsSortedAndFiltered(taskStorage).map(project => {
            return <Project taskData={project} key={project} isSelected={project == currentProject} onSelect={setCurrentProject}></Project>
          })}
        </ul>
      </div>
      <div>
        <h1>Tasks</h1>
        {tasksSortedAndFiltered(taskStorage).map(task => {
          return <Task taskData={task} key={task.timestamp} onSelectTask={setCurrentTask} onSelectProject={setCurrentProject}></Task>
        })}
      </div>
      <div>
        <h1>Editor</h1>
        <Editor taskData={currentTask}></Editor>
      </div>
    </>
  )
}

export default App
