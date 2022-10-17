import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { user: {}, balance: 0 };

export const userAsync = createAsyncThunk('WALLET/FETCH_USER',
  async () => {
    const { data } = await axios.get('https://reqres.in/api/users/6');
    return data.data;
  });

// kita akan membuat sebuah irisan
// ceritanya si reducer itu yang tadinya pake switch case mau kita iris-iris per state
// jadi di sini cuma menyimpan state dari wallet
const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    withdraw: (state, action) => {
      // di sini kita bisa seakan-akan mengubah state secara langsung
      // karena ada menggunakan Immer library
      // untuk nama parameter akan selalu by default payload
      if (state.balance >= action.payload.amount) {
        state.balance -= action.payload.amount;
      } else {
        throw new Error('insufficient balance');
      }
    },
    deposit: (state, action) => {
      state.balance += action.payload.amount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAsync.rejected, () => {
        console.log('Fail to get user!');
      })
      .addCase(userAsync.pending, () => {
        console.log('Loading...');
      })
      .addCase(userAsync.fulfilled, (state, action) => {
        console.log(action);
        state.user = action.payload;
      })
      ;
  }
});

// akan dibuatkan object action otomatis dari sini
export const { deposit, withdraw } = walletSlice.actions;

// selector bisa dibuat di sini, biar bisa reusesable
export const selectBalance = (state) => state.wallet.balance;
export const selectUser = (state) => state.wallet.user;

export default walletSlice.reducer;
