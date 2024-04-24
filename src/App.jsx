import { useState, useEffect, useRef } from 'react'
import Project from './Project.jsx'
import Task from './Task.jsx'
import Editor from './Editor.jsx'

function App() {
  // listen for storage events and update state
  const [taskStorage, setTaskStorage] = useState(Object.values(localStorage).map(task => { return JSON.parse(task) }))
  // TODO: redo this so that it doesn't always set new array but instead compares and updates existing array if needed
  window.onstorage = () => setTaskStorage(Object.values(localStorage).map(task => { return JSON.parse(task) }))

  // filter tasks based on selected project
  const [currentProject, setCurrentProject] = useState("All")

  // edit selected task
  const [currentTask, setCurrentTask] = useState()

  function projectsSortedAndFiltered(array) {
    // create Set out of taskStorage, convert it to Array, map project names, sort with no case-sensitivity, filter out empty values
    return [...new Set(array.map(task => task.project).sort(Intl.Collator().compare).filter(item => item))]
  }

  function tasksSortedAndFiltered(array) {
    // return tasks sorted by timestamp and filtered by the selected project
    return currentProject == "All"
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
