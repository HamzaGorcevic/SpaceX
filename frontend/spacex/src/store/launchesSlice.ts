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
export const fetchLaunches = createAsyncThunk('launches/fetchLaunches', async () => {
    try {
        const response = await axios.get('https://api.spacexdata.com/v4/launches/past');
        return response.data.slice(0, 30).sort(
            (a: Launch, b: Launch) => new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime()
        );
    } catch (err: any) {
            throw new Error(err.response.data.message || 'An error occurred while fetching launches');

    }
});

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
            .addCase(saveLaunch.pending,(state:initialStateType)=>{
                state.loading = true
            })
            .addCase(saveLaunch.fulfilled,(state:initialStateType,action)=>{
                state.loading=false
                state.savedLaunches.push(action.payload)
                state.error=""

            })
            .addCase(saveLaunch.rejected,(state:initialStateType,acion)=>{
                state.loading = false
                state.error = acion.error.message
            })
            .addCase(deleteLaunch.pending,(state:initialStateType)=>{
                state.loading = true
            })
            .addCase(deleteLaunch.fulfilled,(state:initialStateType,action)=>{
                state.loading = false
                state.savedLaunches = state.savedLaunches.filter((launch:Launch)=>launch._id != action.payload)
                state.error=""

            })
            .addCase(deleteLaunch.rejected,(state:initialStateType,acion)=>{
                state.loading = false
                state.error=acion.error.message
            })
    }


})

export default launchesSlice.reducer