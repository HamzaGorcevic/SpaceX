import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { deleteLaunch, fetchSavedLaunches } from '../store/launchesSlice'
import type { Launch } from '../types/Launch'
import styles from "../styles/launchesPage.module.scss"

const SavedLaunchesTable = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {loading,savedLaunches,error} = useSelector((state:RootState)=>state.launches)

    useEffect(()=>{
        dispatch(fetchSavedLaunches())
    },[dispatch])

    const handleDelete = (id:string)=>{
        dispatch(deleteLaunch(id))
    }
    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }

    return (
        <div className={styles.launchesTable}>
            {savedLaunches.map((launch: Launch) => (
                <div className={styles.launch} key={launch._id}>
                    <h1>{launch.name}</h1>
                    <h2>{launch.flight_number}</h2>
                    <p>{new Date(launch.date_utc).toLocaleString()}</p>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(launch._id!)}>Delete launch</button>
                </div>
            ))}
        </div>
    );
};
export default SavedLaunchesTable