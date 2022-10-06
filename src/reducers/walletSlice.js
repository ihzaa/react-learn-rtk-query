import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { user: {}, balance: 100000 };

// kita membuat sebuah middleware untuk hit data user dari API
// di redux toolkit middlewarenya pakai thunk
// jadi kita akan membuat thunk dengan fungsi createAsyncThunk
// dia dapat didispatch seperti action biasa
// anggeplah dia kayak custom action
export const userAsync = createAsyncThunk(
  'WALLET/FETCH_USER',
  async (userId) => {
    // aku destructure data dari axios
    // karena axios by default akan mengembalikan response yang sudah dibungkus dengan object
    // responsenya itu dibungkus dalam atribut 'data'
    const { data: axiosData } = await axios.get(`https://reqres.in/api/users/${userId}`);

    // data yang satu lagi datengnya dari API nya
    // karena API nya balikin respons dalam atribut data juga
    return axiosData.data;
  }
)

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
  // extraReducers adalah field tamabahn untuk menghandle custom actions
  // custom actions ini salah satunya adalah yang kita buat dengan createAsyncThunk
  extraReducers: (builder) => {
    // kita buat builder untuk menghandle setiap case dari promise kita
    // karena promise bisa rejected, pending, dan fulfilled, maka kita handle
    // action.payload akan didapatkan dari apa yang kita return di userAsync
    builder
      .addCase(userAsync.rejected, () => {
        console.log('fail to get user');
      })
      .addCase(userAsync.pending, () => {
        console.log('loading');
      })
      .addCase(userAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
  }
});

// akan dibuatkan object action otomatis dari sini
export const { DEPOSIT, WITHDRAW } = walletSlice.actions;

// selector bisa dibuat di sini, biar bisa reusesable
export const selectBalance = (state) => state.wallet.balance;
export const selectUser = (state) => state.wallet.user;

export default walletSlice.reducer;
