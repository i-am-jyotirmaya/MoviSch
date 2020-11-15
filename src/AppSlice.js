import { createSlice } from "@reduxjs/toolkit";

export const AppSlice = createSlice({
    name: 'app',
    initialState: {
        isMobile: false
    },
    reducers: {
        setScreenSize: (state, action) => {
            console.log("action ==>", action)
            state.isMobile = action.payload;
        }
    }
});

export const {setScreenSize} = AppSlice.actions;

export default AppSlice.reducer;