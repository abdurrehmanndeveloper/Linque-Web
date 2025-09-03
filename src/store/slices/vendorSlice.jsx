import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Backend URL configuration
const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-backend.com' 
  : 'http://localhost:5000';

// Async thunk for vendor login
export const vendorLogin = createAsyncThunk(
  'vendor/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/vendor-auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('auth_token', data.token);
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for vendor signup
export const vendorSignup = createAsyncThunk(
  'vendor/signup',
  async (vendorData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/vendor-auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || 'Signup failed');
      }

      // Store token in localStorage
      localStorage.setItem('auth_token', data.token);
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Async thunk for vendor verification
export const verifyVendor = createAsyncThunk(
  'vendor/verify',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/vendor-auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || 'Verification failed');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth_token');
    },
    clearError: (state) => {
      state.error = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(vendorLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(vendorLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(vendorLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Signup
      .addCase(vendorSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(vendorSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(vendorSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify
      .addCase(verifyVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(verifyVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, setToken } = vendorSlice.actions;
export default vendorSlice.reducer;
