// const CustomSnackbar = styled(Snackbar)(({ theme }) => ({
//
// })

import { Alert, Snackbar } from "@mui/material";

const CustomSnackbar = ({ message, isError, open, close }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={close}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={close}
        severity={isError ? "error" : "success"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
export default CustomSnackbar;
