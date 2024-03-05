import { createSlice } from '@reduxjs/toolkit';
import User from '../models/User';
import Fact from 'src/models/Fact';

// 1
interface State {
  loginUser: User;
  factsBasket: Array<Fact>;
}

// 2
const initialState: State = {
  loginUser: null,
  factsBasket: []
}

// 3
const reducers = {
  setLoginUser: (state: State, action: any) => {
    state.loginUser = action.payload; 
  },

  setFactsBasket: (state: State, action: any) => {
    state.factsBasket = action.payload; 
  },
}

const Slice = createSlice({
  name: 'slice',
  initialState,
  reducers: reducers,
})

export default Slice;
