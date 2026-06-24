
// import { NewDiaryEntry, VisibilityValues, type Visibility, Weather } from "./types.ts";
import { type NewDiaryEntry, VisibilityValues, type Visibility,  Weather } from "./types.ts";
import {z} from 'zod';

const parseNewDiaryEntry = (object : unknown): NewDiaryEntry => {
    console.log(object);

    if(!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }
   
    if('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object){
        const newEntry : NewDiaryEntry = {
        // comment : parseComment(object.comment),
        comment : z.string().parse(object.comment),
        date : z.iso.date().parse(object.date),
        weather : parseWeather(object.weather),
        visibility : parseVisibility(object.visibility)
    };
        return newEntry;
    }
    throw new Error('Incorrect data, some fields are missing');
}

export const parseComment = (comment : unknown) : string=> {
    if(!comment || !isString(comment)){
        throw new Error('Incorrect or missing comment');
    }

    return comment;
}

const isString = (text : unknown) : text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseDate = (date : unknown) : string => {
    if(!date || !isString(date) || !isDate(date) ){
        throw new Error(`Incorrect or missing date ${date}`)
    }
    return date;
}

const isDate = (date : string) : boolean => {
    return Boolean(Date.parse(date));
}

const parseWeather = (weather : unknown) : Weather => {
    if(!isString(weather) || !isWeather(weather)){
        throw new Error(`Incorrect or missing weather ${weather}`);
    }
    return weather;
}

const isWeather = (param : string) : param is Weather => {
    return (Object.values(Weather) as string[]).includes(param);
}

const isVisibility = (param : string) : param is Visibility=> {
    return (Object.values(VisibilityValues) as string[]).includes(param);
}

const parseVisibility = (visibility : unknown) : Visibility => {
    if ( !isString(visibility) || !isVisibility(visibility)){
        throw new Error(`Incorrect or missing visibility ${visibility}`)
    }
    return visibility;
}
export default parseNewDiaryEntry; 