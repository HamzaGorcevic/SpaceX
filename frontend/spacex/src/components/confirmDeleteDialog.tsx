import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteDialog({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}

      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="confirm-dialog-title">Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          Are you sure you want to delete this launch? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant='contained'>Cancel</Button>
        <Button onClick={onConfirm} variant='contained' color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
