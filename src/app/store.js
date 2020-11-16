import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homeReducer from '../features/Home/HomeSlice';
import appReducer from "../AppSlice";
import detailsReducer from "../features/Details/DetailsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
    app: appReducer,
    details: detailsReducer
  },
});
