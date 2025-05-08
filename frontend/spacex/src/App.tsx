import { BrowserRouter, Route, Routes } from "react-router-dom"
import LaunchesTable from "./pages/launchesTable"
import SavedLaunchesTable from "./pages/savedLaunchesTable"
import Navbar from "./components/navbar"

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<LaunchesTable/>}/>
      <Route path="/saved" element={<SavedLaunchesTable/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
