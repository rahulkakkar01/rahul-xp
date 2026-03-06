import { useEffect, useState } from "react"
import "../index.css"

interface Props {
  onDone: () => void
}

export default function BootScreen({ onDone }: Props) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 4300)
    const doneTimer = setTimeout(() => onDone(), 5000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div className="xp-boot crt">
      <div id="boot-screen">
        <img src="/boot.png" alt="Rahul XP" className="boot-logo" />
      </div>

      <div className="xp-loader">
        <div className="xp-loader-track">
          <div className="xp-block"></div>
          <div className="xp-block"></div>
          <div className="xp-block"></div>
        </div>
      </div>

      <div className="xp-footer-left">
        For the best experience Enter Full Screen (F11)
      </div>

      <div className="xp-footer-right">
        Portfolio®
      </div>

      <div className={`boot-fade ${fadeOut ? "active" : ""}`} />
    </div>
  )
}
