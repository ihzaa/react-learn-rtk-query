import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: '', balance: 0 };

// kita akan membuat sebuah irisan
// ceritanya si reducer itu yang tadinya pake switch case mau kita iris-iris per state
// jadi di sini cuma menyimpan state dari wallet
const walletSlice = createSlice({
  name: 'WALLET',
  initialState,
  reducers: {
    WITHDRAW: (state, action) => {
      // di sini kita bisa seakan-akan mengubah state secara langsung
      // karena ada menggunakan Immer library
      // untuk nama parameter akan selalu by default payload
      if (state.balance >= action.payload.amount) {
        state.balance -= action.payload.amount;
      } else {
        throw new Error('insufficient balance');
      }
    },
    DEPOSIT: (state, action) => {
      state.balance += action.payload.amount;
    },
  },
});

// akan dibuatkan object action otomatis dari sini
export const { DEPOSIT, WITHDRAW } = walletSlice.actions;

// selector bisa dibuat di sini, biar bisa reusesable
export const selectBalance = (state) => state.wallet.balance;
export const selectUser = (state) => state.wallet.user;

export default walletSlice.reducer;
