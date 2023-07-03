export interface DecodedTokenStructure {
    Id: number,
    Email: string,
    FirstName: string,
    LastName: string,
    Permissions: number,
    VacationDays: number,
    WorkType: number,
    exp: Date
}

export interface TokenStructure {
    Id: string,
    Email: string,
    FirstName: string,
    LastName: string,
    Permissions: string,
    VacationDays: string,
    WorkType: string,
    exp: string 
}