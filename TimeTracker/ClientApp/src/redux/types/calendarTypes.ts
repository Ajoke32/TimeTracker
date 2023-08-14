export interface CalendarType {
    previousDates: CalendarCell[],
    currentDates: CalendarCell[],
    nextDates: CalendarCell[],
}

export interface WorkPlan {
    id: number,
    userId: number,
    firstName: string,
    lastName: string,
    date: Date,
    startTime: string,
    endTime: string,
}

export interface CalendarEvent {
    id: number,
    date: Date,
    title: string,
    eventType: number
}

export interface CalendarCell {
    date: Date,
    events: CalendarEvent[],
    workPlans: WorkPlan[],
    isHoliday: boolean
}

export interface CreateCalendarEventType {
    date: string,
    title: string,
    eventType: number,
}

export interface UpdateCalendarEventType {
    id: number,
    title: string
}

export interface UpdateWorkPlanType {
    id: number,
    startTime: string,
    endTime: string,
    date: Date
}

export interface DateRangeType {
    startDate: string,
    endDate: string
}