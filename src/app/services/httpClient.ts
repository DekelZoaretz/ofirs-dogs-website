import axios, { AxiosRequestConfig } from 'axios';
import { HttpResponseType } from '../generic/types/http';
import { eHttpStatusCode } from '../generic/enums/http';

const BASE_URL = 'https://dog.ceo/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

const defaultTransformResponse = (errorCode?: keyof typeof eHttpStatusCode) => (
    data: any
): HttpResponseType<any> => {
    return {
        data: JSON.parse(data),
        errorCode
    };
};

const defaultAxiosRequestConfig: AxiosRequestConfig = {
    transformResponse: defaultTransformResponse()
};

const getFullConfig = (config: AxiosRequestConfig = {}) => ({
    ...defaultAxiosRequestConfig,
    ...config
});

const handleResponse = async (request: Promise<any>): Promise<any | { data: any; errorCode: string }> => {
    try {
        const response = await request;
        return response.data;
    } catch (error) {
        throw error;
    }
};

const HttpClient = {
    get<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return handleResponse(axiosInstance.get<T, R>(url, getFullConfig(config)));
    },
    delete<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return handleResponse(axiosInstance.delete<T, R>(url, getFullConfig(config)));
    },
    post<T = any, R = T>(url: string, payload?: Record<string, any>, config?: AxiosRequestConfig): Promise<R> {
        return handleResponse(axiosInstance.post<T, R>(url, payload, getFullConfig(config)));
    },
    put<T = any, R = T>(url: string, payload?: Record<string, any>, config?: AxiosRequestConfig): Promise<R> {
        return handleResponse(axiosInstance.put<T, R>(url, payload, getFullConfig(config)));
    },
    patch<T = any, R = T>(url: string, payload?: Record<string, any>, config?: AxiosRequestConfig): Promise<R> {
        return handleResponse(axiosInstance.patch<T, R>(url, payload, getFullConfig(config)));
    }
};

export default HttpClient;