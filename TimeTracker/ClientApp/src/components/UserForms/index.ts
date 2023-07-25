import { UserAddType, UserEditType } from '@redux/types'

export * from './UserForm'
export * from './AddApproversForm'

export interface UserFormProps {
    formDataHandler: (data: UserEditType) => void,
    step?: number
}

export type Inputs = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    hoursPerMonth: number,
    permissions: number,
    vacationDays: number,
}