import { useLocation, Navigate, Outlet } from "react-router-dom";

// Implementing a system to guard routes, forcing a user to log in before
// being able to access them.

export const RequireAuth = () => {
    const location = useLocation()

    // This function checks the presence of the Auth token.
    // If the token is present, then the user accesses the requested route through Outlet.
    // If the token is not present, then they're forcefully redirected to the landing page.
    return (
        sessionStorage.getItem('Auth Token')
        ? <Outlet />
        : <Navigate to="/" state={{ from: location}} replace />
    )
}