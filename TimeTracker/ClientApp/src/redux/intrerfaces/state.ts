import { DecodedTokenStructure, TokenStructure, User } from './'

export interface UserSliceState {
    user: User | null,
    token: DecodedTokenStructure | null,
    status: boolean,
    loading: boolean,
    error: string
}