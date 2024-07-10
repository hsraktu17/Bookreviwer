import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Marketing from "./pages/Marketing";
import Signup from "./components/signup";
import Dashboard from "./pages/Dashboard";
import Publish from "./pages/Publish";
import UpdateProfile from "./pages/Update";
import VerifyForm from "./pages/Verification";
import BooksList from "./pages/BookPage";
import BookDetails from "./pages/BookDetail";

function App(){
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Marketing />}/>
        <Route path ="/signin" element={<Signin />}/>
        <Route path ="/signup" element={<Signup />}/>
        <Route path ="/dashboard" element={<Dashboard />}/>
        <Route path ="/publish" element={<Publish />}/>
        <Route path ="/update-profile" element={<UpdateProfile />}/>
        <Route path ="/verification" element={<VerifyForm />}/>
        <Route path ="/bookpage" element={<BooksList />}/>
        <Route path ="/bookdetail" element={<BookDetails />}/>
      </Routes>
    </BrowserRouter>
  </div>
}

export default App;