import { Routes, Route, Link } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import RegisterPage from "./RegisterPage";
import Home from "./Home";
import LoginPage from "./LoginPage";
import UploadPage from "./UploadPage";

import VideoPage from "./VideoPage";


function App() {

  return (
    <>

      <div className="bg-dark" style={{minHeight:"100vh"}}>
        <MyNavbar></MyNavbar>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/upload" element={<UploadPage />}></Route>
          <Route path="/video/:id" element={<VideoPage/>}></Route>
        </Routes>
      </div>



    </>
  )
}

export default App
