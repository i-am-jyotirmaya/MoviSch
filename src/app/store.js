import { configureStore } from "@reduxjs/toolkit";

import appReducer from "../AppSlice";
import detailsReducer from "../features/Details/DetailsSlice";
import homeReducer from "../features/Home/HomeSlice";

export default configureStore({
  reducer: {
    home: homeReducer,
    app: appReducer,
    details: detailsReducer,
  },
});
