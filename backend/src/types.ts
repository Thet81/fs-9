
import { newEntrySchema } from "./utils";
import z from "zod";

export const Weather = {
    Sunny : 'sunny',
    Rainy : 'rainy',
    Cloudy : 'cloudy',
    Stormy : 'stormy',
    Windy : 'windy'
} as const;

export const VisibilityValues = {
    Great : 'great',
    Good : 'good',
    Ok : 'ok',
    Poor : 'poor'
}as const;

export type Weather = typeof Weather[keyof typeof Weather];

export type Visibility = typeof VisibilityValues[keyof typeof VisibilityValues];

// export interface DiaryEntry {
//     id : number;
//     date : string;
//     weather : Weather;
//     visibility : Visibility;
//     comment ?: string | undefined;
// }

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
// export type NewDiaryEntry = Omit<DiaryEntry,'id'>;
export type NewDiaryEntry = z.infer<typeof newEntrySchema>

export interface DiaryEntry extends NewDiaryEntry{
    id : number;
}