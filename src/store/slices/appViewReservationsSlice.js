import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAppViewReservations = createAsyncThunk(
  "appViewReservations/fetchAppViewReservations",
  async ({ token, filters }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(filters).toString();
      // Use regular reservations endpoint for now
      const endpoint = `http://localhost:5000/api/vendor/reservations?${query}`;

      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch reservations");
      }

      return data.reservations;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const appViewReservationsSlice = createSlice({
  name: "appViewReservations",
  initialState: { reservations: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppViewReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppViewReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchAppViewReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appViewReservationsSlice.reducer;