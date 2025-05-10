import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { useEffect, useState } from 'react';
import { fetchLaunches, saveLaunch } from '../store/launchesSlice';
import type { Launch } from '../types/Launch';
import LaunchCard from '../components/launchCard';
import { Container, Grid } from '@mui/material';
import Loader from '../components/loader';
import { toast } from 'react-toastify';
const LaunchesTable = () => {
    const [savingId,setSavingId] = useState<string|undefined>("")
    const dispatch = useDispatch<AppDispatch>()
    const {launches,loading,error} = useSelector((state:RootState)=>state.launches)
    useEffect((
    )=>{
        dispatch(fetchLaunches())
    },[dispatch])
    const handleSave = async (launch: Launch) => {
        setSavingId(launch.flight_number);
        try {
            await dispatch(saveLaunch(launch)).unwrap();
            toast.success(`Launch "${launch.name}" saved successfully`);
        } catch (err) {
            const msg = typeof err === "string" ? err : (err as any)?.message;

            if(msg.includes("flight_number")){
                toast.error("Launch with that flight_number already exists")
            }else{

                toast.error("Failed to save launch.");
            }
        } finally {
            setSavingId("");
        }
    };
    
    if (loading) {
        return <Loader/>
    }


    

    return (
        <Container sx={{mt:'2rem',mx:"auto"}}  maxWidth="lg" disableGutters>
            <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 2, sm: 8, md: 12 }}>
            {launches.map((launch: Launch,index:number) => (
                    <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                    <LaunchCard launch={launch}  onAction={handleSave} loader={launch.flight_number === savingId} actionLabel='Save Launch' actionColor='primary'/>
                </Grid>

            ))}
            </Grid>    
        </Container>

);
};

export default LaunchesTable