export interface WorkedHour {
    id: number,
    userId: number,
    startTime: string,
    endTime: string,
    totalTime: string,
    date: Date,
}

export interface WorkedTime {
    hours: number,
    minutes: number,
    seconds: number
}

export interface CreateWorkedHourType {
    userId: number,
    date: string,
    startTime: string,
    endTime: string,
}

export interface UpdateWorkedHourType {
    id: number,
    startTime: string,
    endTime: string,
}

export interface WorkedHoursStatistic{
    actuallyWorked:string,
    actuallyWorkedHours:string,
    needToWork:string
}

export interface WorkedHoursStatisticInput{
    userId:number,
    date:Date
}