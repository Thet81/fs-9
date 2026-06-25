
import express, {type Request, type Response, type NextFunction} from 'express'
import { newEntrySchema } from '../utils.ts'
import z from 'zod';

const newDiaryParser = (req : Request, _res: Response, next : NextFunction)=> {
    try{
        newEntrySchema.parse(req.body);
        next();
    }catch(error : unknown){
        next(error);
    }
}

const errorMiddleWare = (error : unknown, _req:Request, res: Response, next : NextFunction) => {
    if(error instanceof z.ZodError){
        res.status(400).send({error : error.issues})
    }else {
        next(error)
    }
}

export default {
    newDiaryParser,
    errorMiddleWare
}