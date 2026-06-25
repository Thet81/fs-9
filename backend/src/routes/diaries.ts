import express, {type Response, type Request} from 'express'
import type { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types.ts';
import diaryService from '../services/diaryService.ts';
import middleware from '../middlewares/middleware.ts';

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

// router.post('/',(_req,res)=> {
//     res.send('Saving a diary!');
// });

// router.post('/',(req,res)=> {
//     try {
//         const newDiaryEntry = newEntrySchema.parse(req.body);
//         const addedEntry = diaryService.addDiary(newDiaryEntry);
//         res.json(addedEntry);
//     }catch(error : unknown){
//         if(error instanceof z.ZodError){
//             res.status(400).send({error : error.issues})
//         }else {
//             res.status(400).send({error : 'unknown error'})
//         }
//     }
// });

router.post('/',middleware.newDiaryParser,(req : Request<unknown, unknown, NewDiaryEntry>, res : Response<DiaryEntry>)=> {
    const addedEntry = diaryService.addDiary(req.body);
    res.json(addedEntry);
})
router.use(middleware.errorMiddleWare)
export default router;