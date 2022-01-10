import {Request, Response} from 'express';
import createUser from './services/CreateUser'


export function Hello(request: Request, response: Response){
    const user = createUser({
        name: 'brenda', 
        email: 'brenda@gmail.com', 
        password: '1234',
        techs: ['Nodejs'],
    });
    return response.json({message: "coco"});
}