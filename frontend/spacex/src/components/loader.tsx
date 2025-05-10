import { CircularProgress,  Grid } from '@mui/material'

const Loader = () => {
  return (
    <Grid alignItems="center" justifyContent="center" display="flex" sx={{minHeight:"100vh",minWidth:"100vw"}}>
        <CircularProgress  size="3rem" />
    </Grid>
  )
}

export default Loader