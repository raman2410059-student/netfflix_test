import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export default function AdminRoute({ children }) {
  const { status, userData } = useSelector(state => state.auth)

  if (!status || userData?.email !== "ramansingh29112004@gmail.com") {
    return <Navigate to="/" replace />
  }

  return children
}