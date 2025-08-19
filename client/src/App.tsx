import { Routes } from "react-router-dom";
import userRoutes from "./routes/router";

 
 

export default function App() {
  return (
        <Routes>
          {userRoutes()}
        </Routes>
  );
}
