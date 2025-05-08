import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { useEffect } from 'react';
import { fetchLaunches, saveLaunch } from '../store/launchesSlice';
import type { Launch } from '../types/Launch';
import styles from "../styles/launchesPage.module.scss"
const LaunchesTable = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {launches,loading,error} = useSelector((state:RootState)=>state.launches)

    useEffect((
    )=>{
        dispatch(fetchLaunches())
    },[dispatch])


    const handleSave = (launch:Launch)=>{
        dispatch(saveLaunch(launch))
    }
    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

     if (error && !error.includes("flight_number")) {
        return <div className={styles.error}>Error: {error}</div>;
    }
    

    return (
        <div className={styles.launchesTable}>
            {launches.map((launch: Launch) => (
                <div className={styles.launch} key={launch._id}>
                    <h1>{launch.name}</h1>
                    <h2>{launch.flight_number}</h2>
                    <p>{new Date(launch.date_utc).toLocaleString()}</p>
                    <button onClick={() => handleSave(launch)}>Save launch</button>
                </div>
            ))}
        </div>
    );
};

export default LaunchesTable