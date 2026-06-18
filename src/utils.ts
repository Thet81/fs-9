
import type { NewDiaryEntry } from "./types/types.ts";

const parseNewDiaryEntry = (object : unknown): NewDiaryEntry => {
    console.log(object);
    const newEntry : NewDiaryEntry = {
        weather : 'cloudy',
        visibility : 'good',
        date : '2026-3-4',
        comment : 'fake news'
    };

    return newEntry;
}

export default parseNewDiaryEntry;