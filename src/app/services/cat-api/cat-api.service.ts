import axios from 'axios';

export interface CatBreed {
  id: string;
  name: string;
}

export interface CatImage {
  id: string;
  url: string;
  width?: number;
  height?: number;
}

const catAxios = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
});

export const CatApiService = {
  fetchBreedList: async (): Promise<CatBreed[]> => {
    const response = await catAxios.get<CatBreed[]>('/breeds');
    return response.data;
  },
  fetchRandomImages: async (count: number): Promise<CatImage[]> => {
    const response = await catAxios.get<CatImage[]>(`/images/search?limit=${count}`);
    return response.data;
  },
  fetchBreedImageList: async (breedId: string): Promise<CatImage[]> => {
    const response = await catAxios.get<CatImage[]>(`/images/search?limit=100&breed_ids=${breedId}`);
    return response.data;
  },
};
