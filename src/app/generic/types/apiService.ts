import { HttpResponseType } from './http';

interface CommonResponse<T> {
    message: T;
    status: string;
}

type FetchBreedList = () => Promise<HttpResponseType<CommonResponse<Record<string, Array<string>>>>>;
type FetchRandomImage = () => Promise<HttpResponseType<CommonResponse<string>>>;
type FetchRandomImageList = (breed: string) => Promise<HttpResponseType<CommonResponse<Array<string>>>>;

interface ApiServiceInterface {
    fetchBreedList: FetchBreedList,
    fetchRandomImage: FetchRandomImage;
    fetchBreedImageList: FetchRandomImageList
}
export type { ApiServiceInterface };