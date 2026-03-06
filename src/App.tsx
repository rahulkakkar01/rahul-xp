import { Routes, Route } from "react-router-dom"
import LoginScreen from "./components/loginscreen"
import BootScreen from "./components/bootscreen"
import Desktop from "./components/desktop"

function App() {
  return (
    <Routes>
      <Route path="/" element={<BootScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/desktop" element={<Desktop />} />
    </Routes>
  )
}

export default App