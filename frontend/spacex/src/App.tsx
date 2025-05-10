import { BrowserRouter, Route, Routes } from "react-router-dom"
import LaunchesTable from "./pages/launchesTable"
import SavedLaunchesTable from "./pages/savedLaunchesTable"
import Navbar from "./components/navbar"
import { Bounce, ToastContainer } from "react-toastify"
import { GlobalStyles,CssBaseline } from '@mui/material';

function App() {

  return (
    <BrowserRouter>
    <GlobalStyles styles={
      {
        "*":{boxSizing:'border-box',padding:'0px',margin:"0px"},
      }
    }/>

    <Navbar/>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
    <Routes>
      <Route path="/" element={<LaunchesTable/>}/>
      <Route path="/saved" element={<SavedLaunchesTable/>}/>
    </Routes>

    </BrowserRouter>
  )
}

export default App
