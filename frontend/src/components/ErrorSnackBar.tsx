import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/core/Alert";

interface ErrorSnackBarProps {
  showError: boolean;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
}

function ErrorSnackBar({ showError, setShowError }: ErrorSnackBarProps) {
  const handleClose = (event: any, reason?: any) => {
    if (reason && reason === "clickaway") {
      return;
    }
    setShowError(false);
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
      autoHideDuration={2000}
      onClose={handleClose}
      action={action}
      sx={{
        position: "absolute",
        top: 70,
      }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        Not found{" "}
      </Alert>
    </Snackbar>
  );
}

export default ErrorSnackBar;
