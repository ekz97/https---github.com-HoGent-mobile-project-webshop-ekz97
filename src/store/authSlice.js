import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = {
        uid: action.payload.user.uid,
        email: action.payload.user.email,
        displayName: action.payload.user.displayName || '',  
        photoURL: action.payload.user.photoURL || '' 
      };
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    }
  },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
