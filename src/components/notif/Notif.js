import { Alert, Snackbar } from "@mui/material"

export const Notif = ({ severity, message }) => {
    <Snackbar autoHideDuration={4000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={severity} message={message} />
    </Snackbar>
}