import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    profilePic: "@/assets/images/profilepic.jpg", // Add this line
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.profilePic = null; // Reset profile pic on logout
    },
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
  },
});

export const { setUser, logout, setProfilePic } = authSlice.actions;
export default authSlice.reducer;