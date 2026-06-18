import express, {type Response} from 'express'
import type { NonSensitiveDiaryEntry } from '../types/types.ts';
import diaryService from '../services/diaryService.ts';
import parseNewDiaryEntry from '../utils.ts';

const router = express.Router();

router.get('/',(_req,res : Response<NonSensitiveDiaryEntry[]>)=> {
    const data = diaryService.getNonSensitiveEntries();
    res.send(data);
});

router.get('/:id', (req,res)=> {
    const diary = diaryService.findById(Number(req.params.id))
    if(diary){
        return res.send(diary)
    }else {
        return res.sendStatus(404);
    }
})  

router.post('/',(_req,res)=> {
    res.send('Saving a diary!');
});

router.post('/',(req,res)=> {
    try {
        const newDiaryEntry = parseNewDiaryEntry(req.body);
        const addedEntry = diaryService.addDiary(newDiaryEntry);
        res.json(addedEntry);
    }catch(error : unknown){
        let errorMessage = 'Something went wrong';
        if(error instanceof Error){
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})

export default router;