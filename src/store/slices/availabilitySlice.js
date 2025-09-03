import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAvailabilities = createAsyncThunk(
  "availability/fetchAvailabilities",
  async ({ token, date }, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/slot/availabilities?date=${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch availabilities");
      }

      return data.buckets;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const availabilitySlice = createSlice({
  name: "availability",
  initialState: {
    buckets: {},
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
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
        state.buckets = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchAvailabilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearAvailabilities } = availabilitySlice.actions;
export default availabilitySlice.reducer;
