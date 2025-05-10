import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { Launch } from '../types/Launch';
import { CircularProgress } from '@mui/material';

export default function LaunchCard({launch,onAction,loader,actionLabel}:{launch:Launch,onAction:Function,loader:boolean,actionLabel:string}) {
  
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {launch.name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{launch.flight_number}</Typography>
        <Typography variant="body2">
          {new Date(launch.date_utc).toUTCString()}
        </Typography>
      </CardContent>
      <CardActions>
      <Button
        variant="contained"
        onClick={() => onAction(launch)}
        disabled={loader}
        sx={{ width:"160px", justifyContent: 'center' }}
      >
        {loader ? <CircularProgress size={20} color="inherit" /> : actionLabel}
      </Button>

        
      </CardActions>
    </Card>
  );
}