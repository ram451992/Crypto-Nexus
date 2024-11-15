import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, get, set } from 'firebase/database';

// Async thunk for fetching balance from Firebase
export const fetchBalance = createAsyncThunk(
  'balance/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      const db = getDatabase();
      const balanceRef = ref(db, 'balance');
      const snapshot = await get(balanceRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return 0; // Default balance if not found
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// New async thunk for updating balance in Firebase
export const updateBalanceInFirebase = createAsyncThunk(
  'balance/updateBalanceInFirebase',
  async (newBalance, { rejectWithValue }) => {
    try {
      console.log("updating balance in firebase")
      console.log(newBalance)
      const db = getDatabase();
      const balanceRef = ref(db, 'balance');
      await set(balanceRef, newBalance);
      return newBalance;
    } catch (error) {
      console.log("failed updating balance in firebase")
      console.log(error)
      return rejectWithValue(error.message);
    }
  }
);

const tokenBalanceSlice = createSlice({
  name: 'balance',
  initialState: {
    tokenBalance: 0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    // You can add more reducers here if needed
    updateBalance: (state, action) => {
      state.tokenBalance = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tokenBalance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateBalanceInFirebase.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBalanceInFirebase.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tokenBalance = action.payload;
      })
      .addCase(updateBalanceInFirebase.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { updateBalance } = tokenBalanceSlice.actions;

export default tokenBalanceSlice.reducer;