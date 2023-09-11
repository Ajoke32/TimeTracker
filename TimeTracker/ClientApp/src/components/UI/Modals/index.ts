import { CalendarEvent, SchedulerWorkPlan, WorkedHour } from '@redux/types'

export * from './ConfirmModal'

export * from './SchedulerModal'
export * from './DashboardSchedulerModal'
// export * from './CancelVacationModal'
// export * from './MessageModal'
// export * from './StateInfoModal'

export interface CalendarModalProps {
    isHidden: Date | null,
    setIsHidden: (val: Date | null) => void,
    event? : CalendarEvent
}

export interface SchedulerModalModalProps {
    isHidden: SchedulerWorkPlan | null,
    setIsHidden: (val: SchedulerWorkPlan | null) => void,
}

export interface DashboardSchedulerModalProps {
    isHidden: boolean,
    setIsHidden: (val: boolean) => void,
}