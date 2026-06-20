
import { NewDiaryEntry, VisibilityValues, type Visibility, Weather } from "./types/types.ts";

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
    if(!weather || !isString(weather) || !isWeather(weather)){
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
    if (!visibility || !isString(visibility) || !isVisibility(visibility)){
        throw new Error(`Incorrect or missing visibility ${visibility}`)
    }
    return visibility;
}
export default parseNewDiaryEntry; 