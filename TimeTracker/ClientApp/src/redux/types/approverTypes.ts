export interface ApproversAddType {
    approvers: number[],
    userId: number
}

export interface FetchApproversType {
    take: number,
    skip: number,
    activated: Boolean,
    userId: number
}