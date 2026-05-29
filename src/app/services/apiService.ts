import { ApiServiceInterface } from "../generic/types/apiService";
import HttpClient from "./httpClient";

const ApiService: ApiServiceInterface = {
  fetchBreedList: () => HttpClient.get("/breeds/list/all"),
  fetchRandomImage: () => HttpClient.get("/breeds/image/random"),
  fetchBreedImageList: (breed) => HttpClient.get(`/breed/${breed}/images`),
  fetchRandomImages: (count) => HttpClient.get(`/breeds/image/random/${count}`),
};

export { ApiService };
