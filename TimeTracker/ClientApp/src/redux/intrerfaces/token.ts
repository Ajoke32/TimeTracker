export interface TokenStructure {
    Id: number,
    Email: string,
    FirstName: string,
    LastName: string,
    Permissions: number,
    VacationDays: number,
    WorkType: string, // Enum??
    exp: number
}