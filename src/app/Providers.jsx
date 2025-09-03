"use client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import store from "../store/store";
import { verifyVendor, setToken } from "../store/slices/vendorSlice";

function VendorVerifier({ children }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.vendor);

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    if (savedToken && !token) {
      dispatch(setToken(savedToken));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      dispatch(verifyVendor(token));
    }
  }, [dispatch, token]);

  return <>{children}</>;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <VendorVerifier>{children}</VendorVerifier>
    </Provider>
  );
}
