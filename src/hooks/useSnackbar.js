import { useState } from "react";

export default function useSnackbar() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const createSnackbar = (isSuccess, message) => {
    setIsSuccess(isSuccess);
    setSnackMessage(message);
    setOpenSnackbar(true);
  };

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  return {
    openSnackbar,
    isSuccess,
    snackMessage,
    createSnackbar,
    handleClose,
  };
}
