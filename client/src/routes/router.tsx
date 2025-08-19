import { Route } from "react-router-dom";
import UserManagement from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";


const userRoutes = () => {
    return (
        <>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<UserManagement/>} />
        </>
    )
}
export default userRoutes