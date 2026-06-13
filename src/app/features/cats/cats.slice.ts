import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CatApiService, CatBreed } from '../../services/cat-api/cat-api.service';

export interface CatOption {
  value: string;
  label: string;
}

interface CatsState {
  breeds: CatOption[];
  selectedBreed: string;
  allImages: string[];
  visibleImages: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CatsState = {
  breeds: [],
  selectedBreed: 'all',
  allImages: [],
  visibleImages: [],
  status: 'idle',
  error: null,
};

const IMAGES_PER_PAGE = 24;

export const fetchCatBreedsThunk = createAsyncThunk<
  CatOption[],
  void,
  { rejectValue: string }
>('cats/fetchBreeds', async (_, { rejectWithValue }) => {
  try {
    const breeds: CatBreed[] = await CatApiService.fetchBreedList();
    const options: CatOption[] = breeds.map((breed) => ({
      value: breed.id,
      label: breed.name,
    }));

    // Sort alphabetically by label
    options.sort((a, b) => a.label.localeCompare(b.label));
    return options;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to load cat breeds');
  }
});

export const fetchCatImagesThunk = createAsyncThunk<
  string[],
  string,
  { rejectValue: string }
>('cats/fetchImages', async (breed, { rejectWithValue }) => {
  try {
    if (breed === 'all') {
      const response = await CatApiService.fetchRandomImages(100);
      return response.map((img) => img.url);
    } else {
      const response = await CatApiService.fetchBreedImageList(breed);
      return response.map((img) => img.url);
    }
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to load cat images');
  }
});

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    setSelectedCatBreed(state, action: PayloadAction<string>) {
      state.selectedBreed = action.payload;
      state.visibleImages = [];
      state.allImages = [];
    },
    loadMoreCatImages(state) {
      const currentLength = state.visibleImages.length;
      const nextBatch = state.allImages.slice(
        currentLength,
        currentLength + IMAGES_PER_PAGE,
      );
      state.visibleImages = [...state.visibleImages, ...nextBatch];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchBreeds
      .addCase(fetchCatBreedsThunk.fulfilled, (state, action) => {
        state.breeds = action.payload;
      })
      // fetchImages
      .addCase(fetchCatImagesThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCatImagesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allImages = action.payload;
        state.visibleImages = action.payload.slice(0, IMAGES_PER_PAGE);
      })
      .addCase(fetchCatImagesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load cat images';
      });
  },
});

export const { setSelectedCatBreed, loadMoreCatImages } = catsSlice.actions;
export const catsReducer = catsSlice.reducer;
