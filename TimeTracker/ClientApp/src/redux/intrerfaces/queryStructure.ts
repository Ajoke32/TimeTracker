import {PagingExtraInfo} from "@redux/types/filterTypes.ts";

export interface QueryStructure<T> extends PagingExtraInfo{
    data: T,
    errors: ResponseError[] | null,
}

export interface ResponseError{
    message:string,
    extensions:{
        code:string,
        details:string
    }
}