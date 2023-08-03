export * from './AddEventForm'

export interface EventFormProps {
    formDataHandler: (data: any) => void,
}

export type Inputs = {
    id: number,
    title: string,
    description: string,
    eventDate: Date,
}