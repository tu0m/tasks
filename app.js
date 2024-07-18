const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
    res.render('index')
})


app.get("/task/new", (req, res) => {
    res.send('new task page')
})

app.post("/", (req, res) => {
    res.send('save new task')
})


app.get("/task/:id", (req, res) => {
    res.send('task page for task id: ' + req.params.id)
    // same as new task page but pre-populated with data by id

    // TODO: handle when task id is not found in database/localstorage
})

app.put("/task/:id", (req, res) => {
    res.send('task page for task id: ' + req.params.id)
    // update task content
})
app.delete("/task/:id", (req, res) => {
    res.send('task page for task id: ' + req.params.id)
    // delete task
})

// 404
app.use((req, res) => {
    res.status(404).send('404 not found')
})

app.listen('3000')