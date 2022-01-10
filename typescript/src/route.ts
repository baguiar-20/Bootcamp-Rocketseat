import {Request, Response} from 'express';


export function Hello(request: Request, response: Response){
    return response.json({message: "coco"});
}