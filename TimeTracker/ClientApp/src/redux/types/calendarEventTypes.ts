
export interface CalendarEvent{
    id:number,
    title:string,
    date:Date,
    description?:string,
    dateOnly:string
}

export interface CalendarEventInput{
    title:string,
    date:Date,
    description?:string
}