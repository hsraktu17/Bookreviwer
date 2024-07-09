import { BrowserRouter, Route, Routes } from "react-router-dom";

function App(){
  return <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<SignIn />}/>
    </Routes>
  </BrowserRouter>
}

export default App;