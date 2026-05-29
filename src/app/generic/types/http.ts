import { eHttpStatusCode } from '../constants/http.constants';

export interface HttpResponseType<T> {
  data: T;
  errorCode?: keyof typeof eHttpStatusCode;
}
