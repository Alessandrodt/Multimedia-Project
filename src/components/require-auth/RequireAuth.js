import { useLocation, Navigate, Outlet } from "react-router-dom";

// Implementing a system to guard routes, forcing a user to log in before
// being able to access them.

export const RequireAuth = () => {
    const location = useLocation()

    // Check if the interceptor has a functional redirect.
    return (
        sessionStorage.getItem('Auth Token')
        ? <Outlet />
        : <Navigate to="/" state={{ from: location}} replace />
    )
}