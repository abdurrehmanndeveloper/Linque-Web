// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:5000";

// Helpers
const saveToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }
};
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

// ========================
// Async Thunks
// ========================

// Login
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/api/vendor-auth/login`, {
        email,
        password,
      });
      saveToken(res.data.token);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Signup
export const signup = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/api/vendor-auth/signup`, userData);
      saveToken(res.data.token);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch User
 export const fetchUser = createAsyncThunk(
   "user/fetchUser",
   async (id, { rejectWithValue }) => {
     try {
       const token = getToken();
       const response = await axios.get(`${API_BASE}/api/vendor-auth/getuser/${id}`, {
         headers: { Authorization: `Bearer ${token}` },
       });
       return response.data.user;
     } catch (error) {
       return rejectWithValue(error.response?.data || error.message);
     }
   }
 );

// Update User
 export const updateUser = createAsyncThunk(
   "user/updateUser",
   async (updates, { getState, rejectWithValue }) => {
     try {
       const { user } = getState().user;
       const token = getToken();
       const res = await axios.put(
         `${API_BASE}/api/vendor-auth/updateuser/${user._id}`,
         updates,
         { headers: { Authorization: `Bearer ${token}` } }
       );
       return res.data.user;
     } catch (err) {
       return rejectWithValue(err.response?.data || err.message);
     }
   }
 );

// ========================
// Slice
// ========================
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    userId: "",
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    logout: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
      }
      state.user = null;
      state.userId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export const { setUserId, logout } = userSlice.actions;
export default userSlice.reducer;

