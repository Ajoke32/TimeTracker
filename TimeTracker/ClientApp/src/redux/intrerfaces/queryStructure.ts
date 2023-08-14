interface QueryStructure<T> {
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