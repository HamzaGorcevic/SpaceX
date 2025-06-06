import {  createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type { Launch } from "../types/Launch";
import axios from "axios";

interface initialStateType{
    launches:Launch[],
    savedLaunches:Launch[],
    loading:boolean,
    error: string | undefined; 
}
const initialState:initialStateType = {
    launches:[],
    savedLaunches:[],
    loading:false,
    error:""
}

export const fetchLaunches = createAsyncThunk(
    'launches/fetchLaunches',
    async (savedFlightNumbers: string[], { rejectWithValue }) => {
    console.log(savedFlightNumbers)
      try {
        const response = await axios.post('https://api.spacexdata.com/v4/launches/query', {
          query: {
            flight_number: { $nin: savedFlightNumbers },
          },
          options: {
            limit: 30,
            sort: { date_utc: 'desc' },
          },
        });
        return response.data.docs;
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'An error occurred while fetching launches');
      }
    }
  );
export const fetchSavedLaunches = createAsyncThunk('launches/fetchSavedLaunches', async () => {
    try {
        const response = await axios.get('https://spacex-production-c1f9.up.railway.app/api/launches');
        return response.data?.launches;
    } catch (err: any) {
            throw new Error(err.response.data.message || 'Error fetching saved launches');
      
    }
});

export const saveLaunch = createAsyncThunk('launches/createLaunch', async (launch: Launch) => {
    try {
        await axios.post('https://spacex-production-c1f9.up.railway.app/api/launches', launch);
        return launch;
    } catch (err: any) {
            throw new Error(err.response.data.message || 'Error saving launch');
       
    }
});

export const deleteLaunch = createAsyncThunk('launches/deleteLaunch', async (id: string) => {
    try {
        await axios.delete(`https://spacex-production-c1f9.up.railway.app/api/launches/delete/${id}`);
        return id;
    } catch (err: any) {
            throw new Error(err.response.data.message || 'Error deleting launch');
    }
});

const launchesSlice = createSlice({
    name:"launches",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(fetchLaunches.pending,(state:initialStateType)=>{
                state.loading=true
            })
            .addCase(fetchLaunches.fulfilled,(state:initialStateType,action)=>{
                state.loading=false,
                state.launches=action.payload
                state.error=""
            })
            .addCase(fetchLaunches.rejected,(state:initialStateType,action)=>{
                state.loading=false,
                state.error=action.error.message

            })
            .addCase(fetchSavedLaunches.pending,(state:initialStateType)=>{
                state.loading=true
            })
            .addCase(fetchSavedLaunches.fulfilled,(state:initialStateType,action)=>{
                state.savedLaunches = action.payload
                state.loading=false
                state.error=""

            })
            .addCase(fetchSavedLaunches.rejected,(state:initialStateType,action)=>{
                state.loading=false
                state.error = action.error.message
            })
            .addCase(saveLaunch.fulfilled,(state:initialStateType,action)=>{
                state.savedLaunches.push(action.payload)
                state.launches = state.launches.filter((launch:Launch)=>launch.flight_number != action.payload.flight_number)
                state.error=""

            })
            .addCase(saveLaunch.rejected,(state:initialStateType,acion)=>{
                state.error = acion.error.message
            })
            .addCase(deleteLaunch.fulfilled,(state:initialStateType,action)=>{
                state.savedLaunches = state.savedLaunches.filter((launch:Launch)=>launch._id != action.payload)
                state.error=""

            })
            .addCase(deleteLaunch.rejected,(state:initialStateType,acion)=>{
                state.error=acion.error.message
            })
    }


})

export default launchesSlice.reducer