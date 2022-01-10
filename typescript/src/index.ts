import express from 'express';
import {Hello} from './route'


const app = express();


app.get('/', Hello )
app.listen(3333);



