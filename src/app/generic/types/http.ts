import { eHttpStatusCode } from '../enums/http';

export interface HttpResponseType<T> {
    data: T;
    errorCode?: keyof typeof eHttpStatusCode;
}