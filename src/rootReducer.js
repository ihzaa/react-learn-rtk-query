// kita membuat reducer atau yang mengatur perubahan dari state kita
// dia seperti kasir di bank
const rootReducer = (state, action) => {
  // kita membuat switch untuk memilih action mana yang akan jalan
  // berdasarkan perintah dari action.type
  switch (action.type) {
    case 'deposit':
      return { ...state, balance: state.balance + action.payload.amount };
    case 'withdraw':
      if (state.balance >= action.payload.amount) {
        return { ...state, balance: state.balance - action.payload.amount };
      }
      throw new Error('insufficient balance');
    // return state;
    default:
      return state;
  }
};

export default rootReducer;
