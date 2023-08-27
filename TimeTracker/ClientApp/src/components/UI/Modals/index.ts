import { SchedulerWorkPlan, WorkedHour } from '@redux/types'

export * from './ConfirmModal'
export * from './CalendarModal'
export * from './SchedulerModal'
export * from './DashboardSchedulerModal'
// export * from './CancelVacationModal'
// export * from './MessageModal'
// export * from './StateInfoModal'

export interface CalendarModalProps {
    isHidden: Date | null,
    setIsHidden: (val: Date | null) => void,
}

export interface SchedulerModalModalProps {
    isHidden: SchedulerWorkPlan | null,
    setIsHidden: (val: SchedulerWorkPlan | null) => void,
}

export interface DashboardSchedulerModalProps {
    isHidden: WorkedHour | null,
    setIsHidden: (val: WorkedHour | null) => void,
}