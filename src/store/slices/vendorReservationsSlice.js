import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVendorReservations = createAsyncThunk(
  "reservations/fetchVendorReservations",
  async ({ token, filters }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(filters).toString();
      // Use booking-ticker endpoint for time filtering support
      const endpoint = filters.time
        ? `http://localhost:5000/api/vendor/booking-ticker?${query}`
        : `http://localhost:5000/api/vendor/reservations?${query}`;

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

const vendorReservationsSlice = createSlice({
  name: "reservations",
  initialState: { reservations: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(fetchVendorReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vendorReservationsSlice.reducer;
