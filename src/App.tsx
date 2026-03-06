import { useState } from "react"
import LoginScreen from "./components/loginscreen"
import BootScreen from "./components/bootscreen"
import Desktop from "./components/desktop"

export type Stage = "boot" | "login" | "desktop"

export default function App() {
  const [stage, setStage] = useState<Stage>("boot")

  return (
    <>
      {stage === "boot"    && <BootScreen  onDone={() => setStage("login")} />}
      {stage === "login"   && <LoginScreen onDone={() => setStage("desktop")} />}
      {stage === "desktop" && <Desktop     onLogoff={() => setStage("login")} />}
    </>
  )
}
