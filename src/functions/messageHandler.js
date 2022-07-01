import { Notif } from "../components/notif/Notif";

export function messageHandler (severity, message) {
    console.log(severity, message);
    return (
        <Notif severity={severity} message={message} />
    );
};