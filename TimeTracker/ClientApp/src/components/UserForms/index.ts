import { UserAddType, UserEditType, UserType } from '@redux/types'

export * from './UserForm'
export * from './AddApproversForm'

export interface UserFormProps {
    formDataHandler: (data: UserAddType | UserEditType) => void,
    step?: number
}

export type Inputs = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    hoursPerMonth: number,
    permissions: number,
}