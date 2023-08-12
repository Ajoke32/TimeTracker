


export interface WhereFilter{
    property:string,
    value:string,
    operator:string,
    connector?:string|null
}

export interface FiltersType{
    group:WhereFilter[]
}

export interface PagingExtraInfo{
    extensions?:{
        count:number
    }
}