import { WorkPlan, CalendarEvent, SchedulerWorkPlan } from '@redux/types'


export * from './DayPlanForm'


export interface EventFormProps {
    date: Date,
    setIsOpen: (val: Date | null) => void,
    event?: CalendarEvent
}

export interface WorkPlanFormProps {
    date: Date,
    setIsOpen: (val: Date | null) => void,
    workPlan?: SchedulerWorkPlan
}
