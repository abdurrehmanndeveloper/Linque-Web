// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import availabilityReducer from "./slices/availability.jsx";
import vendorReducer from "./slices/vendorSlice";
import vendorReservationsReducer from "./slices/vendorReservationsSlice";
import appViewReservationsReducer from "./slices/appViewReservationsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    availability: availabilityReducer,
    vendor: vendorReducer,
    vendorReservations: vendorReservationsReducer,
    appViewReservations: appViewReservationsReducer,
  },
});

export default store;
