import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginScreen() {
  const [showShutdown, setShowShutdown] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [stage, setStage] = useState<"login" | "fade" | "welcome">("login")
  const navigate = useNavigate()

  // After fade → show welcome
  useEffect(() => {
    if (stage === "fade") {
      const timer = setTimeout(() => {
        setStage("welcome")
      }, 700)

      return () => clearTimeout(timer)
    }
  }, [stage])

  // After welcome → redirect
  useEffect(() => {
    if (stage === "welcome") {
      const timer = setTimeout(() => {
        navigate("/desktop")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [stage, navigate])

  return (
    <>
      {/* LOGIN SCREEN */}
      {stage !== "welcome" && (
        <div className={`xp-login ${showShutdown ? "dimmed" : ""} ${stage === "fade" ? "fade-out" : ""}`}>

          {showShutdown && <div className="xp-dim-layer" />}

          <div className="xp-top-bar" />
          <div className="xp-orange-line-top" />
          <div className="xp-center-glow" />
          <div className="xp-orange-line" />
          <div className="xp-bottom-bar" />

          <div className={`xp-content ${isLoggingIn ? "fade-out" : ""}`}>

            <div className="xp-left">
              <img src="/boot.png" className="xp-login-logo" />
              <p className="xp-login-text">
                To begin, click on Rahul to log in
              </p>
            </div>

            <div className="xp-divider" />

            {/* USER CARD */}
            <div
              className="xp-user-card"
              onClick={() => {
                    setIsLoggingIn(true)
                    setTimeout(() => {
                        navigate("/desktop")
                    }, 2000)
                    }}
            >  <div className="xp-user-avatar">
    <img src="/avatar.JPG" alt="Rahul" />
  </div>
              <div>
                <div className="xp-user-name">Rahul</div>
                <div className="xp-user-role">Cloud Engineer</div>
              </div>
            </div>

          </div>

         <div
              className={`xp-restart ${isLoggingIn ? "fade-out" : ""}`}
              onClick={() => setShowShutdown(true)}
            >
            <div className="xp-restart-icon"></div>
            <p>Restart Rahul XP</p>
          </div>

            <div className={`xp-footer-text ${isLoggingIn ? "fade-out" : ""}`}>
            After you log on, the system's yours to explore.
            <br />
            Every detail has been designed with a purpose.
          </div>
          {isLoggingIn && (
            <div className="xp-welcome">
                welcome
            </div>
)}


          {showShutdown && (
            <div className="shutdown-overlay">
              <div className="shutdown-window">

                <div className="shutdown-header">
                  <span>Turn off Rahul XP</span>
                  <img src="/xp.png" width="45" />
                </div>

                <div className="shutdown-body">
                  <div className="shutdown-option">
                    <div className="shutdown-icon restart" />
                    <span>Restart</span>
                  </div>

                  <div className="shutdown-option">
                    <div className="shutdown-icon shutdown" />
                    <span>Shut Down</span>
                  </div>
                </div>

                <div className="shutdown-footer">
                  <button onClick={() => setShowShutdown(false)}>
                    Cancel
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      )}
    </>
  )
}