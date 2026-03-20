import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, authentication = true }) {

    const authStatus = useSelector((state) => state.auth.status);

    // If authentication required and user not logged in
    if (authentication && !authStatus) {
        return <Navigate to="/login" replace />;
    }

    // If authentication NOT required and user is logged in
    if (!authentication && authStatus) {
        return <Navigate to="/" replace />;
    }

    return children;
}