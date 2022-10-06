import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DEPOSIT, selectBalance, selectUser, userAsync, WITHDRAW } from '../reducers/walletSlice';

const Wallet = () => {
  // untuk mengakses state yang kita buat di store, kita bisa pakai hook useSelector
  // useSelector akan menerima sebuah fungsi
  // fungsi itu mempunyai parameter state, statenya itu adalah single object yang tadi kita sudah buat
  // jadi kalau mau pilih attribute ballance, kita bisa panggil dengan state.balance
  const balance = useSelector(selectBalance);
  const user = useSelector(selectUser);

  // kita pakai hooknya useDispatch agar bisa menggunakan fungsinya
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAsync());
  }, []);

  // kita memanggil dispatch dengan sebuah objek yang kita sebut action
  // action ini akan berisi type dan payload jika ada
  // payload juga biasanya bentuknya object
  const onWithdraw = (amount) => {
    try {
      // const action = {
      //   type: 'withdraw',
      //   payload: { amount: amount },
      // };

      dispatch(WITHDRAW({ amount }));
    } catch (e) {
      alert(e.message);
    }
  };

  const onDeposit = (amount) => {
    // const action = {
    //   type: 'deposit',
    //   payload: { amount: amount },
    // };

    dispatch(DEPOSIT({ amount }));
  };

  const [customAmount, setCustomAmount] = useState(0);

  return (
    <div>
      <h1>{user.first_name} Wallet</h1>
      <h2>Balance: Rp {balance.toLocaleString('ID')}</h2>
      <button onClick={() => onWithdraw(10000)}>Withdraw Rp 10.000</button>
      <button onClick={() => onDeposit(10000)}>Deposit Rp 10.000</button>
      <br />
      <br />
      <input
        type="number"
        value={customAmount}
        onChange={({ target }) => setCustomAmount(parseInt(target.value))}
      />
      <button onClick={() => onWithdraw(customAmount)}>withdraw</button>
      <button onClick={() => onDeposit(customAmount)}>deposit</button>
    </div>
  );
};

export default Wallet;
