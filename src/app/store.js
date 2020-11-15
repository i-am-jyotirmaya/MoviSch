import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homeReducer from '../features/Home/HomeSlice';
import appReducer from "../AppSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
    app: appReducer
  },
});
