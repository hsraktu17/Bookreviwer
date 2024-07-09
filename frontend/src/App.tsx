import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Marketing from "./pages/Marketing";
import Signup from "./components/signup";

function App(){
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Marketing />}/>
        <Route path ="/signin" element={<Signin />}/>
        <Route path ="/signup" element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  </div>
}

export default App;