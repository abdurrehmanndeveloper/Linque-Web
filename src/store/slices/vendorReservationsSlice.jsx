import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Backend URL configuration
const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-backend.com' 
  : 'http://localhost:5000';

// Async thunk for fetching vendor reservations
export const fetchVendorReservations = createAsyncThunk(
  'vendorReservations/fetch',
  async ({ token, filters = {} }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`${BACKEND_URL}/api/vendor/reservations?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || 'Failed to fetch reservations');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for creating walk-in reservation
export const createWalkInReservation = createAsyncThunk(
  'vendorReservations/createWalkIn',
  async ({ token, reservationData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/vendor/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || 'Failed to create walk-in reservation');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for updating reservation
export const updateReservation = createAsyncThunk(
  'vendorReservations/update',
  async ({ token, id, updates }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/vendor/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || 'Failed to update reservation');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for deleting reservation
export const deleteReservation = createAsyncThunk(
  'vendorReservations/delete',
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/vendor/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || 'Failed to delete reservation');
      }

      return { id };
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for fetching booking ticker
export const fetchBookingTicker = createAsyncThunk(
  'vendorReservations/fetchTicker',
  async ({ token, date, time }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (date) queryParams.append('date', date);
      if (time) queryParams.append('time', time);

      const response = await fetch(`${BACKEND_URL}/api/vendor/booking-ticker?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || 'Failed to fetch booking ticker');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const vendorReservationsSlice = createSlice({
  name: 'vendorReservations',
  initialState: {
    reservations: [],
    bookingTicker: [],
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearReservations: (state) => {
      state.reservations = [];
      state.lastUpdated = null;
    },
    addReservation: (state, action) => {
      state.reservations.unshift(action.payload);
    },
    updateReservationInState: (state, action) => {
      const index = state.reservations.findIndex(r => r._id === action.payload._id);
      if (index !== -1) {
        state.reservations[index] = action.payload;
      }
    },
    removeReservation: (state, action) => {
      state.reservations = state.reservations.filter(r => r._id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch reservations
      .addCase(fetchVendorReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload.reservations;
        state.lastUpdated = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchVendorReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create walk-in
      .addCase(createWalkInReservation.fulfilled, (state, action) => {
        state.reservations.unshift(action.payload.reservation);
      })
      // Update reservation
      .addCase(updateReservation.fulfilled, (state, action) => {
        const index = state.reservations.findIndex(r => r._id === action.payload.reservation._id);
        if (index !== -1) {
          state.reservations[index] = action.payload.reservation;
        }
      })
      // Delete reservation
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.reservations = state.reservations.filter(r => r._id !== action.payload.id);
      })
      // Fetch booking ticker
      .addCase(fetchBookingTicker.fulfilled, (state, action) => {
        state.bookingTicker = action.payload.reservations;
      });
  },
});

export const { 
  clearError, 
  clearReservations, 
  addReservation, 
  updateReservationInState, 
  removeReservation 
} = vendorReservationsSlice.actions;

export default vendorReservationsSlice.reducer;
