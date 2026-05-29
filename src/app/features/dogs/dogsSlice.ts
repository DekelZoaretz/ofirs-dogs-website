import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiService } from '../../services/api.service';

export interface DogOption {
  value: string;
  label: string;
}

interface DogsState {
  breeds: DogOption[];
  selectedBreed: string;
  allImages: string[];
  visibleImages: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DogsState = {
  breeds: [],
  selectedBreed: 'all',
  allImages: [],
  visibleImages: [],
  status: 'idle',
  error: null,
};

const IMAGES_PER_PAGE = 24;

export const fetchBreedsThunk = createAsyncThunk<
  DogOption[],
  void,
  { rejectValue: string }
>('dogs/fetchBreeds', async (_, { rejectWithValue }) => {
  try {
    console.log('Fetching breed list started...');
    const response = await ApiService.fetchBreedList();
    console.log('Breed list response received:', response);
    const breedRecord = response.data.message;
    const options: DogOption[] = [];
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    Object.entries(breedRecord).forEach(([breed, subs]) => {
      if (subs.length === 0) {
        options.push({
          value: breed,
          label: capitalize(breed),
        });
      } else {
        // Add main breed
        options.push({
          value: breed,
          label: `${capitalize(breed)} (All)`,
        });
        // Add sub breeds
        subs.forEach((sub) => {
          options.push({
            value: `${breed}/${sub}`,
            label: `${capitalize(sub)} ${capitalize(breed)}`,
          });
        });
      }
    });

    // Sort alphabetically by label
    options.sort((a, b) => a.label.localeCompare(b.label));
    console.log('Processed breed options count:', options.length);
    return options;
  } catch (error: any) {
    console.error('fetchBreedsThunk error:', error);
    return rejectWithValue(error.message || 'Failed to load breeds');
  }
});

export const fetchImagesThunk = createAsyncThunk<
  string[],
  string,
  { rejectValue: string }
>('dogs/fetchImages', async (breed, { rejectWithValue }) => {
  try {
    console.log(`Fetching images for breed: ${breed}`);
    if (breed === 'all') {
      const response = await ApiService.fetchRandomImages(100);
      return response.data.message;
    } else {
      const response = await ApiService.fetchBreedImageList(breed);
      return response.data.message;
    }
  } catch (error: any) {
    console.error(`fetchImagesThunk error for breed ${breed}:`, error);
    return rejectWithValue(error.message || 'Failed to load images');
  }
});

const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    setSelectedBreed(state, action: PayloadAction<string>) {
      state.selectedBreed = action.payload;
      state.visibleImages = [];
      state.allImages = [];
    },
    loadMoreImages(state) {
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
      .addCase(fetchBreedsThunk.fulfilled, (state, action) => {
        console.log(
          'fetchBreedsThunk.fulfilled dispatched with',
          action.payload.length,
          'breeds',
        );
        state.breeds = action.payload;
      })
      .addCase(fetchBreedsThunk.rejected, (state, action) => {
        console.error(
          'fetchBreedsThunk.rejected dispatched with error:',
          action.payload,
        );
      })
      // fetchImages
      .addCase(fetchImagesThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchImagesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allImages = action.payload;
        // Render initial chunk
        state.visibleImages = action.payload.slice(0, IMAGES_PER_PAGE);
      })
      .addCase(fetchImagesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load images';
      });
  },
});

export const { setSelectedBreed, loadMoreImages } = dogsSlice.actions;
export const dogsReducer = dogsSlice.reducer;
