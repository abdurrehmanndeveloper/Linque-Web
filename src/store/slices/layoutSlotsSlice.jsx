// store/slices/layoutSlotsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Token helpers
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

export const fetchLayoutSlots = createAsyncThunk(
  "layoutSlots/fetchLayoutSlots",
  async (date, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No auth token found");

      const res = await axios.get("http://localhost:5000/api/slot/layout", {
        headers: { Authorization: `Bearer ${token}` },
        params: { date },
      });
      return res.data.slots;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);


const layoutSlotsSlice = createSlice({
  name: "layoutSlots",
  initialState: {
    slots: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLayoutSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLayoutSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload;
      })
      .addCase(fetchLayoutSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default layoutSlotsSlice.reducer;
