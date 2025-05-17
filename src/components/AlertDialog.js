import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  open,
  onClose,
  actionType = "block",
  onConfirm,
}) {
  const config = {
    add: {
      title: "Add Friend",
      message: "Are you sure you want to add this friend?",
      confirmText: "Add",
    },
    remove: {
      title: "Remove Friend",
      message: "Are you sure you want to remove this friend?",
      confirmText: "Remove",
    },
    block: {
      title: "Block User",
      message: "Are you sure you want to block this user?",
      confirmText: "Block",
    },
    unblock: {
      title: "Unblock User",
      message: "Are you sure you want to unblock this user?",
      confirmText: "Unblock",
    },
  };

  const { title, message, confirmText } = config[actionType];

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
