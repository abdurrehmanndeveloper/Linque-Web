import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, verifyVendor } from '@/store/slices/vendorSlice';

export const useVendorAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.vendor);

  // Check for existing token on mount
  useEffect(() => {
    const existingToken = localStorage.getItem('auth_token');
    if (existingToken && !isAuthenticated) {
      dispatch(setToken(existingToken));
      dispatch(verifyVendor(existingToken));
    }
  }, [dispatch, isAuthenticated]);

  const login = async (credentials) => {
    try {
      const result = await dispatch(verifyVendor(credentials)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const logout = () => {
    dispatch(setToken(null));
    localStorage.removeItem('auth_token');
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  };
};
