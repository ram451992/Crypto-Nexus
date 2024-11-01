import { createSlice } from '@reduxjs/toolkit';

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    cryptoData: [],
  },
  reducers: {
    updateCryptoData: (state, action) => {
      state.cryptoData = action.payload;
    },
  },
});

export const { updateCryptoData } = portfolioSlice.actions;
export default portfolioSlice.reducer;