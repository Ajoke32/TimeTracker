import { WorkedHour } from '@redux/types'

export * from './DashboardScheduler'
export * from './WorkedHourForm'


export interface WorkedHourFormProps {
    setIsOpen: (val: WorkedHour | null) => void,
    workedHour: WorkedHour
}