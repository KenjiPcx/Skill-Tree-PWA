import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/core/Alert";
import { ErrorData } from "../Types";

interface ErrorSnackBarProps {
  errorMsg: string;
  showError: boolean;
  setErrorData: React.Dispatch<React.SetStateAction<ErrorData>>;
}

function ErrorSnackBar({
  errorMsg,
  showError,
  setErrorData,
}: ErrorSnackBarProps) {
  const handleClose = (event: any, reason?: any) => {
    if (reason && reason === "clickaway") return;
    setErrorData((data: ErrorData) => {
      return {
        ...data,
        showError: false,
      };
    });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Snackbar
      open={showError}
      autoHideDuration={3000}
      onClose={handleClose}
      action={action}
      sx={{
        position: "absolute",
        top: 70,
      }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {errorMsg}
      </Alert>
    </Snackbar>
  );
}

export default ErrorSnackBar;
