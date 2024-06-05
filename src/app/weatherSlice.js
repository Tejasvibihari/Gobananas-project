import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    weatherData: {}
}

export const weatherSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        weatherStart: (state) => {
            state.loading = true;
        },
        weatherSuccess: (state, action) => {
            state.weatherData = action.payload;
        },
        weatherFailure: (state) => {
            state.loading = false;
            state.weatherData = null
        },
    }
})

// Action creators are generated for each case reducer function
export const { weatherSuccess, weatherStart, weatherFailure } = weatherSlice.actions

export default weatherSlice.reducer