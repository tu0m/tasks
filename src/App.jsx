import { useState } from 'react'
import Projects from './Projects.jsx'
import Tasks from './Tasks.jsx'
import CreateTask from './CreateTask.jsx'

function App() {
  const [count, setCount] = useState(0);

  let data = [
    {
      "title": "test title 1",
      "body": "test body 1",
      "project": "projectname 1",
      "timestamp": "1713435166"
    },
    {
      "title": "test title 2",
      "body": "test body 2",
      "project": "projectname 2",
      "timestamp": "1"
    },
  ]

  let titles = ["test title 1", "test title 2"]
  let projects = ["projectname 1", "projectname 2"]

  return (
    <>
      <div>
        <h1>Projects</h1>
        <Projects data={data} />
      </div>
      <div>
        <h1>Tasks</h1>
        <Tasks data={data} />
      </div>
      <div>
        <h1>New Task</h1>
        <CreateTask />
      </div>
    </>
  )
}

export default App
