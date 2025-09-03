import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Backend URL configuration
const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-backend.com' 
  : 'http://localhost:5000';

// Async thunk for fetching availabilities
export const fetchAvailabilities = createAsyncThunk(
  'availability/fetchAvailabilities',
  async ({ date, token }, { rejectWithValue }) => {
    try {
      //console.log('🔍 Fetching availabilities for:', { date, token: token ? 'present' : 'missing' });
      
      const queryParams = new URLSearchParams();
      queryParams.append('date', date);
      
      // Use full backend URL
      const apiUrl = `${BACKEND_URL}/api/slot/availabilities?${queryParams}`;
      //console.log('🔍 API URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      //console.log('🔍 Response status:', response.status);
      //console.log('🔍 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        //console.error('❌ Error response:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          return rejectWithValue(errorData.error || 'Failed to fetch availabilities');
        } catch {
          return rejectWithValue(`HTTP ${response.status}: ${errorText}`);
        }
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        //console.error('❌ Non-JSON response:', textResponse);
        return rejectWithValue('Server returned non-JSON response');
      }

      const data = await response.json();
      //console.log('✅ Availabilities data:', data);
      
      return data;
    } catch (error) {
      //console.error('❌ Network error:', error);
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const availabilitySlice = createSlice({
  name: 'availability',
  initialState: {
    buckets: {},
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAvailabilities: (state) => {
      state.buckets = {};
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailabilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailabilities.fulfilled, (state, action) => {
        state.loading = false;
        state.buckets = action.payload.buckets;
        state.lastUpdated = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchAvailabilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearAvailabilities } = availabilitySlice.actions;
export default availabilitySlice.reducer;