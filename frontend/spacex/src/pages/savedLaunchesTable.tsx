import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { deleteLaunch, fetchSavedLaunches } from '../store/launchesSlice'
import type { Launch } from '../types/Launch'
import Loader from '../components/loader'
import { Container, Grid } from '@mui/material'
import LaunchCard from '../components/launchCard'
import { toast } from 'react-toastify'
import Error from './error404'
import ConfirmDeleteDialog from '../components/confirmDeleteDialog'
const SavedLaunchesTable = () => {
    const [savingId,setSavingId] = useState<string|null>(null);
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>()
    const {loading,savedLaunches,error} = useSelector((state:RootState)=>state.launches)

    useEffect(()=>{
        dispatch(fetchSavedLaunches())
    },[dispatch])

    const handleDelete = async(id:string)=>{
        setSavingId(id)
        try{
            await dispatch(deleteLaunch(id)).unwrap()
            toast.success(`Successfully delete launch`)
        }catch(err){
            toast.error(`Error deleting launch`)

        }finally{
            setIsOpen(false)
        }
        setSavingId("")
    }
    const openModal =()=>{
        setIsOpen(true)
    }
    const onCancel=()=>{
        setIsOpen(false)
    }

    if (loading) {
        return <Loader/>
    }

    if (error) {
        return <Error error={error}/>;
    }
    return (
        <Container sx={{mt:'2rem',mx:"auto"}}  maxWidth="lg" disableGutters>
            <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 2, sm: 8, md: 12 }}>
            {savedLaunches.map((launch: Launch,index:number) => (
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                    <ConfirmDeleteDialog isOpen={isOpen} onConfirm={()=>{handleDelete(launch._id!)}} onCancel={onCancel}/>
                    <LaunchCard launch={launch}  onAction={openModal} loader={launch._id === savingId} actionLabel='Delete Launch' actionColor='error'/>
                </Grid>
            ))}
            </Grid>    
        </Container>
    );
};
export default SavedLaunchesTable