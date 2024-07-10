import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Marketing from "./pages/Marketing";
import Signup from "./components/signup";
import Dashboard from "./pages/Dashboard";
import { Publish } from "./pages/Publish";

function App(){
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Marketing />}/>
        <Route path ="/signin" element={<Signin />}/>
        <Route path ="/signup" element={<Signup />}/>
        <Route path ="/dashboard" element={<Dashboard />}/>
        <Route path ="/publish" element={<Publish />}/>
      </Routes>
    </BrowserRouter>
  </div>
}

export default App;