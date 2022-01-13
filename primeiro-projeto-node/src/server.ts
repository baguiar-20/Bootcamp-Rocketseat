import express, { request } from 'express';

import routes from "./routes/index";

const app = express();

app.use(express.json());


app.use(routes);

app.listen(3333, ()=>{
    console.log('Server started in 3333')
})
