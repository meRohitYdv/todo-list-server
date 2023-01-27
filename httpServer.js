const http = require('http');

// const urlParser = require('url');
let tasks = [{id:1, title:'wash clothes', isComplete: false}];
let taskId = 0;


http.createServer(function(request, response){
    
    if(request.url=='/tasks' && request.method=='GET'){
        response.write(JSON.stringify(tasks));
    }
    if(request.url=='/tasks' && request.method=='POST'){
        let data = '';
        request.on('data', (buffer)=>{
            data+=buffer;
            // console.log(data);
        });
        request.on('end', ()=>{
            // console.log(data);
            const body = JSON.parse(data);
            body.id = ++taskId;
            body.isComplete = false;
            tasks.push(body);
            // console.log(tasks);
        });
    }
    if(request.method=='DELETE' && request.url.includes('tasks')){
        const id = Number(request.url.substring(request.url.lastIndexOf('/')+1));
        // if(isNaN(id))q
        //     response.
        let deletedTask;
        tasks = tasks.filter(task => {
            if(task.id==id)
                deletedTask = task;
            return task.id!=id;
        });
        response.write(JSON.stringify(deletedTask));
        response.end();

    }
    if(request.method=='PUT' && request.url.includes('tasks')){
        let data = '';
        request.on('data', (buffer)=>{
            data+=buffer;
        });
        request.on('end', ()=>{
            const body = JSON.parse(data);
            const index = tasks.findIndex(task => task.id === body.id);
            tasks[index] = body;
            console.log(tasks[index]);
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify([tasks[index]]));
            response.end();
        });
    }

}).listen(8080);

