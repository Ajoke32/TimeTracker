export interface WorkedHour {
    id: number,
    userId: number,
    workedTime: string
    date: Date,
}

export interface WorkedTime {
    hours: number,
    minutes: number,
    seconds: number
}

export interface SetWorkedHoursType {
    userId: number,
    date: string,
    workedTime: string
}

export interface UpdateWorkedHoursType {
    id: number,
    workedTime: string
}