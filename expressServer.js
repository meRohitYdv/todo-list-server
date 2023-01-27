const express = require('express');
const app = express();
const port = 8080;

let tasks = [{'id': 1, 'title': 'wash clothes', 'isComplete': false}, {'id': 2, 'title': 'polish shoe', 'isComplete': false}];
let taskId = 1;

// app.use((request, response, next)=>{
//     console.log('Currently in middleware 1');
//     next();
// });
// app.use((request, response, next)=>{
//     console.log('Currently in middleware 2');
//     next();
// });

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/tasks', (request, response)=>{
    response.send(tasks);
});

app.post('/tasks', (request, response)=>{
    let newTask = {};
    newTask.id = ++taskId;
    newTask.title = request.body.title;
    newTask.isComplete = false;
    tasks.push(newTask);
    response.send(newTask);
});

app.delete('/tasks/:id', (request, response)=>{
    let deleted;
    tasks = tasks.filter( task => {
        if(task.id == request.params.id)
            deleted = task;
        return task.id != request.params.id; 
    });
    response.send(deleted);
});

app.put('/tasks', (request, response)=>{
    const index = tasks.findIndex(task => task.id == request.body.id);
    tasks[index].title = request.body.title;
    tasks[index].isComplete = request.body.isComplete;  

    response.send(tasks[index]);
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}....`);
});