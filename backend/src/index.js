const express = require('express'); 
const cors = require('cors')
const { uuid } = require('uuidv4')

const app = express();

app.use(cors())
app.use(express.json());

// http
// GET: buscar informação do backen
// Post: criar uma informação no backend
// PUT: alterar uma infromação no back
// DELETE: deletar um informação no back



//  tipos de parametros
// query params: filtros e paginação
//  route params: identificar recursos (atualizar/ deletar)
// request body: consteudo na hora de criar ou editar um recurso (JSON)


const projects = [];





app.get('/projects', (req, res)=>{

    return res.json(projects);
})

app.post('/projects', (req, res)=>{

    const { title, owner } = req.body;

    const project = { id: uuid(), title, owner};

    projects.push(project);


    return res.json(project);
})

app.put('/projects/:id', (req, res)=>{

    const {id} = req.params;
    const { title, owner } = req.body;

    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0){
        return res.status(400).json({
            "error": "project not found!"
        })
    }

    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;

    return res.json([
        'Projeto 4',
        'Projeto 2',
        'Project 3'
    ]);
})

app.delete('/projects/:id', (req, res)=>{

    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0){
        return res.status(400).json({
            "error": "project not found!"
        })
    }

    projects.slice(projectIndex, 1);

    return res.status(204).send();
})


app.listen(3333, () =>{
    console.log('Backend started!');
});

