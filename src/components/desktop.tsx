import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../index.css"
import AboutWindow from "./aboutcomponent"
import ResumeWindow from "./resumewindow";
import ContactWindow from "./contactwindow";
import PaintWindow from "./paintwindow"
import CmdWindow from "./cmdwindow"
import MusicPlayerWindow from "./musicplayerwindow"

import ProjectsWindow from "./projectwindow"
import NotepadWindow from "./notepadwindow"




export default function Desktop() {
const [showWelcome, setShowWelcome] = useState(false)
const [showTooltip, setShowTooltip] = useState(false)
const [crtOn, setCrtOn] = useState(true)
const [showCrtTooltip, setShowCrtTooltip] = useState(false)
const [time, setTime] = useState(new Date())
const [isFullScreen, setIsFullScreen] = useState(false)
const [showFsTooltip, setShowFsTooltip] = useState(false)
const [showStartMenu, setShowStartMenu] = useState(false)
const [showRecentMenu, setShowRecentMenu] = useState(false)
const [showAboutWindow, setShowAboutWindow] = useState(false)
const [aboutMinimized, setAboutMinimized] = useState(false)
const [resumeMinimized, setResumeMinimized] = useState(false)
const [contactMinimized, setContactMinimized] = useState(false)
const [showPaint, setShowPaint] = useState(false)
const [paintMinimized, setPaintMinimized] = useState(false)
const [paintMaximized, setPaintMaximized] = useState(false)
const [paintPosition, setPaintPosition] = useState({ x: 400, y: 200 })
const [aboutMaximized, setAboutMaximized] = useState(false)
const [resumeMaximized, setResumeMaximized] = useState(false)
const [contactMaximized, setContactMaximized] = useState(false)
const [_, setIsActive] = useState(true)
const [aboutPosition, setAboutPosition] = useState({ x: 200, y: 100 })
const [resumePosition, setResumePosition] = useState({ x: 300, y: 150 })
const [contactPosition, setContactPosition] = useState({ x: 350, y: 180 })
const startMenuRef = useRef<HTMLDivElement | null>(null)
const [showResumeWindow, setShowResumeWindow] = useState(false);
const [showContactWindow, setShowContactWindow] = useState(false);
const [showCmd, setShowCmd] = useState(false)
const [cmdMinimized, setCmdMinimized] = useState(false)
const [cmdMaximized, setCmdMaximized] = useState(false)
const [cmdPosition, setCmdPosition] = useState({ x: 250, y: 120 })
const [showMusic, setShowMusic] = useState(false)
const [musicMinimized, setMusicMinimized] = useState(false)
const [musicMaximized, setMusicMaximized] = useState(false)
const [musicPosition, setMusicPosition] = useState({
  x: window.innerWidth - 500,
  y: 0
})

const [showProjectsWindow, setShowProjectsWindow] = useState(false)
const [projectsMinimized, setProjectsMinimized] = useState(false)
const [projectsMaximized, setProjectsMaximized] = useState(false)
const [projectsPosition, setProjectsPosition] = useState({ x: 250, y: 120 })
const [showProgramsMenu, setShowProgramsMenu] = useState(false)
const [showNotepad, setShowNotepad] = useState(false)
const [notepadMinimized, setNotepadMinimized] = useState(false)
const [notepadMaximized, setNotepadMaximized] = useState(false)
const [notepadPosition, setNotepadPosition] = useState({ x: 200, y: 120 })
const navigate = useNavigate()
const [shutdown, setShutdown] = useState(false)

const balloonAudioRef = useRef<HTMLAudioElement | null>(null)
const startupAudioRef = useRef<HTMLAudioElement | null>(null)




/*-----------------------------
exit START MENU WHEN CLICKING OUTSIDE
-----------------------------*/ 
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      showStartMenu &&
      startMenuRef.current &&
      !startMenuRef.current.contains(event.target as Node)
    ) {
      setShowStartMenu(false)
      setShowRecentMenu(false)
    }
  }

  document.addEventListener("mousedown", handleClickOutside)

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [showStartMenu])

useEffect(() => {
  const timer = setTimeout(() => {
    setShowCmd(true)
  }, 3500) // delay in milliseconds

  return () => clearTimeout(timer)
}, [])
  /* -----------------------------
     PRELOAD SOUNDS
  ----------------------------- */
  useEffect(() => {
    balloonAudioRef.current = new Audio("/windows-xp-balloon-sound.mp3")
    balloonAudioRef.current.volume = 1

    startupAudioRef.current = new Audio("/windows-xp-startup.mp3")
    startupAudioRef.current.volume = 0.6
  }, [])

  /* -----------------------------
     STARTUP SOUND
  ----------------------------- */
  useEffect(() => {
    if (startupAudioRef.current) {
      startupAudioRef.current.play().catch(() => {})
      startupAudioRef.current.onended = () => {
        setShowWelcome(true)
      }
    }
  }, [])

  /* -----------------------------
     BALLOON SOUND
  ----------------------------- */
  useEffect(() => {
    if (showWelcome && balloonAudioRef.current) {
      balloonAudioRef.current.currentTime = 0
      balloonAudioRef.current.play().catch(() => {})
    }
  }, [showWelcome])

  /* -----------------------------
     LIVE CLOCK
  ----------------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    setIsFullScreen(true)
  } else {
    document.exitFullscreen()
    setIsFullScreen(false)
  }
}
if (shutdown) {
  return (
    <div className="xp-shutdown-screen">
      <img src="/shutdown.png" />
      <h1>Windows is shutting down...</h1>
    </div>
  )
}

return (
    <div className={`xp-desktop ${crtOn ? "crt" : ""}`}>

      {/* ================= DESKTOP ICONS ================= */}
      <div className="xp-icons">
      {[
        { img: "/about.webp", label: "About Me" },
        { img: "/resume.webp", label: "My Resume" },
        { img: "/projects.webp", label: "My Projects" },
        { img: "/contact.webp", label: "Contact Me" },
        { img: "/notepad.png", label: "Notepad" }
      ].map((icon, index) => (
        <div key={index} className="xp-icon">
          <div
            className="xp-icon-inner"
            onDoubleClick={() => {
                if (icon.label === "About Me") {
                  setShowAboutWindow(true)
                }
                if (icon.label === "My Resume") {
                  setShowResumeWindow(true)
                }
                if (icon.label === "My Projects") {
                setShowProjectsWindow(true)
    }
                if (icon.label === "Contact Me") {
                  setShowContactWindow(true)
                }
                if (icon.label === "Notepad") {
                  setShowNotepad(true)
                }
              }}
          >
            <img src={icon.img} />
            <span>{icon.label}</span>
          </div>
        </div>
      ))}
    </div>
    {/* ================= ABOUT WINDOW ================= */}
      {showAboutWindow && !aboutMinimized && (
        <AboutWindow
            onClose={() => {
              setShowAboutWindow(false)
              setAboutMinimized(false)
            }}
            onMinimize={() => setAboutMinimized(true)}
            onMaximize={() => setAboutMaximized(prev => !prev)}
            isMaximized={aboutMaximized}
            setActive={() => setIsActive(true)}
            hidden={aboutMinimized}
            position={aboutPosition}
            setPosition={setAboutPosition}
            openResume={() => {
              setShowResumeWindow(true)
              setResumeMinimized(false)
            }}
          />
      )}

      {/* ================= RESUME WINDOW ================= */}
        {showResumeWindow && !resumeMinimized && (
          <ResumeWindow
            onClose={() => {
              setShowResumeWindow(false)
              setResumeMinimized(false)
            }}
            onMinimize={() => setResumeMinimized(true)}
            onMaximize={() => setResumeMaximized(prev => !prev)}
            isMaximized={resumeMaximized}
            setActive={() => setIsActive(true)}
            hidden={resumeMinimized}
            position={resumePosition}
            setPosition={setResumePosition}
          />
        )}

      {/* ================= CONTACT WINDOW ================= */}
      {showContactWindow && !contactMinimized && (
  <ContactWindow
    onClose={() => setShowContactWindow(false)}
    onMinimize={() => setContactMinimized(true)}
    onMaximize={() => setContactMaximized(prev => !prev)}
    isMaximized={contactMaximized}
    position={contactPosition}
    setPosition={setContactPosition}
  />
  

  
)}

{/* ================= PAINT WINDOW ================= */}
{showPaint && !paintMinimized && (
  <PaintWindow
    onClose={() => {
      setShowPaint(false)
      setPaintMinimized(false)
    }}
    onMinimize={() => setPaintMinimized(true)}
    onMaximize={() => setPaintMaximized(prev => !prev)}
    isMaximized={paintMaximized}
    position={paintPosition}
    setPosition={setPaintPosition}
  />
)}

{/* ================= CMD WINDOW ================= */}
{showCmd && !cmdMinimized && (
  <CmdWindow
    onClose={() => {
      setShowCmd(false)
      setCmdMinimized(false)
    }}
    onMinimize={() => setCmdMinimized(true)}
    onMaximize={() => setCmdMaximized(prev => !prev)}
    isMaximized={cmdMaximized}
    position={cmdPosition}
    setPosition={setCmdPosition}

    openAbout={() => setShowAboutWindow(true)}
    openResume={() => setShowResumeWindow(true)}
    openContact={() => setShowContactWindow(true)}
    openPaint={() => setShowPaint(true)}
  />
)}
{/* ================= MUSIC PLAYER WINDOW ================= */}
{showMusic && !musicMinimized && (
  <MusicPlayerWindow
    onClose={() => setShowMusic(false)}
    onMinimize={() => setMusicMinimized(true)}
    onMaximize={() => setMusicMaximized(prev => !prev)}
    isMaximized={musicMaximized}
    position={musicPosition}
    setPosition={setMusicPosition}
  />
)}


{/* ================= PROJECTS WINDOW ================= */}

            {showProjectsWindow && !projectsMinimized && (
              <ProjectsWindow
                onClose={() => {
                  setShowProjectsWindow(false)
                  setProjectsMinimized(false)
                }}
                onMinimize={() => setProjectsMinimized(true)}
                onMaximize={() => setProjectsMaximized(prev => !prev)}
                isMaximized={projectsMaximized}
                setActive={() => setIsActive(true)}
                hidden={projectsMinimized}
                position={projectsPosition}
                setPosition={setProjectsPosition}
              />
            )}

      {/* ================= NOTEPAD WINDOW ================= */}
      {showNotepad && !notepadMinimized && (
          <NotepadWindow
            onClose={()=>{
              setShowNotepad(false)
              setNotepadMinimized(false)
            }}
            onMinimize={()=>setNotepadMinimized(true)}
            onMaximize={()=>setNotepadMaximized(prev=>!prev)}
            isMaximized={notepadMaximized}
            position={notepadPosition}
            setPosition={setNotepadPosition}
          />
        )}

     {/* ================= TASKBAR ================= */}
  <div className="xp-taskbar">
  
<div className="xp-taskbar-left">
  {/* START BUTTON */}
  <div
  className="xp-start-button"
  onClick={(e) => {
    e.stopPropagation()
    setShowStartMenu(prev => !prev)
  }}
>
    <img src="/xp.png" />
    <span>start</span>
  </div>
  {showStartMenu && (
  <div
      className="xp-start-menu"
      ref={startMenuRef}
      >

    {/* HEADER */}
    <div className="xp-start-header">
      <img src="/avatar.JPG" />
      <span>Rahul Kakkar</span>
    </div>

    {/* BODY */}
    <div className="xp-start-body">

      {/* LEFT COLUMN */}
      <div className="xp-start-left">

  {/* PROJECTS */}
  <div
    className="xp-start-item"
    onClick={() => {
      setShowProjectsWindow(true)
      setShowStartMenu(false)
    }}
  >
    <img src="/projects.webp" />
    <div>
      <strong>My Projects</strong>
      <div className="xp-sub">View my work</div>
    </div>
  </div>

  {/* CONTACT */}
  <div
    className="xp-start-item"
    onClick={() => {
      setShowContactWindow(true)
      setShowStartMenu(false)
    }}
  >
    <img src="/contact.webp" />
    <div>
      <strong>Contact Me</strong>
      <div className="xp-sub">Send me a message</div>
    </div>
  </div>

  <div className="xp-start-divider"></div>

  {/* ABOUT */}
  <div
    className="xp-start-item"
    onClick={() => {
      setShowAboutWindow(true)
      setShowStartMenu(false)
    }}
  >
    <img src="/about.webp" />
    <strong>About Me</strong>
  </div>

        <div
          className="xp-start-item"
          onClick={() => {
            setShowMusic(true)
            setShowStartMenu(false)
          }}
        >
          <img src="/music.webp" />
          Music Player
        </div>

     {/* ================= PAINT WINDOW ================= */}
          <div
            className="xp-start-item"
            
            onClick={() => {
              setShowPaint(true)
              setShowStartMenu(false)
            }}
          >
            <img src="/paint.webp" />
            Paint
          </div>
    <div className="xp-start-divider"></div>
         {/* 🔹 DIVIDER BEFORE ALL PROGRAMS */}
  <div
  className="xp-all-programs xp-has-submenu"
  onMouseEnter={() => setShowProgramsMenu(true)}
  onMouseLeave={() => setShowProgramsMenu(false)}
>
  All Programs ▶

  {showProgramsMenu && (
    <div
      className="xp-programs-menu"
      onMouseEnter={() => setShowProgramsMenu(true)}
      onMouseLeave={() => setShowProgramsMenu(false)}
    >

    <div className="xp-program-item" onClick={()=>setShowAboutWindow(true)}>
      <img src="/about.webp" /> About Me
    </div>

    <div className="xp-program-item" onClick={()=>setShowProjectsWindow(true)}>
      <img src="/projects.webp" /> My Projects
    </div>

    <div className="xp-program-item" onClick={()=>setShowResumeWindow(true)}>
      <img src="/resume.webp" /> My Resume
    </div>

    <div className="xp-program-item" onClick={()=>setShowContactWindow(true)}>
      <img src="/contact.webp" /> Contact Me
    </div>

    <div className="xp-program-item" onClick={()=>setShowMusic(true)}>
      <img src="/music.webp" /> Music Player
    </div>

    <div className="xp-program-item" onClick={()=>setShowPaint(true)}>
      <img src="/paint.webp" /> Paint
    </div>

    <div className="xp-program-item" onClick={()=>setShowCmd(true)}>
      <img src="/cmd.webp" /> Command Prompt
    </div>
    <div className="xp-program-item" onClick={()=>setShowNotepad(true)}
    >
      <img src="/notepad.png" /> Notepad
    </div>

    <div className="xp-program-item" onClick={()=>window.open("https://instagram.com","_blank")}>
      <img src="/instagram.webp" /> Instagram
    </div>

    <div className="xp-program-item" onClick={()=>window.open("https://github.com","_blank")}>
      <img src="/github.webp" /> Github
    </div>

    <div className="xp-program-item" onClick={()=>window.open("https://linkedin.com","_blank")}>
      <img src="/linkedin.webp" /> LinkedIn
    </div>

  </div>
)}
</div>
</div>

      {/* RIGHT COLUMN */}
      <div className="xp-start-right">

        <div className="xp-start-item" onClick={() => window.open("https://www.instagram.com/rahulkakkar_04/", "_blank")}>
          <img src="/instagram.webp" />
          Instagram
        </div>

        <div className="xp-start-item" onClick={() => window.open("https://github.com/rahulkakkar01", "_blank")}>
          <img src="/github.webp" />
          GitHub
        </div>
        <div className="xp-start-divider"></div>
        <div
          className="xp-start-item xp-has-submenu"
          onMouseEnter={() => setShowRecentMenu(true)}
          onMouseLeave={() => setShowRecentMenu(false)}
        ><img src="/recently-used.webp" />
          <span>Recently Used</span>
          <span className="xp-arrow">▶</span>

          {showRecentMenu && (
            <div
              className="xp-submenu"
              onMouseEnter={() => setShowRecentMenu(true)}
              onMouseLeave={() => setShowRecentMenu(false)}
            >
              <div className="xp-sub-item"><img src="/vscode.png" />VS Code</div>
              <div className="xp-sub-item"><img src="/claude.jpg" />Claude</div>
              <div className="xp-sub-item"><img src="/github.webp" />GitHub</div>
              <div className="xp-sub-item"><img src="/git-copilot.png" />Git Copilot</div>
              <div className="xp-sub-item"><img src="/docker.jpg" />Docker</div>
              <div className="xp-sub-item"><img src="/jenkins.jpg" />Jenkins</div>
              <div className="xp-sub-item"><img src="/javascript.jpg" />JavaScript</div>
              <div className="xp-sub-item"><img src="/react.jpg" />React</div>
              <div className="xp-sub-item"><img src="/cursor.png" />Cursor</div>
              <div className="xp-sub-item"><img src="/antigravity.jpg" />Antigravity</div>
              <div className="xp-sub-item"><img src="/chatgpt.png" />ChatGPT</div>
              <div className="xp-sub-item"><img src="/flutter.jpg" />Flutter</div>
              <div className="xp-sub-item"><img src="/nestjs.png" />NestJS</div>
            </div>
          )}
        </div>
        <div className="xp-start-divider"></div>

        <div className="xp-start-item" onClick={() => window.open("https://www.linkedin.com/in/rahul-kakkar-416757264", "_blank")}  >
          <img src="/linkedin.webp" />
          LinkedIn
        </div>

        <div
          className="xp-start-item"
          onClick={() => {
            setShowCmd(true)
            setShowStartMenu(false)
          }}
        >
          <img src="/cmd.webp" />
          Command Prompt
        </div>

        <div className="xp-start-item" onClick={() => window.open("https://drive.google.com/file/d/17802345678901234567890123456789/view?usp=sharing", "_blank")}>
          <img src="/resume.webp" />
          My Resume
        </div>

      </div>

    </div>

    {/* FOOTER */}
   <div className="xp-start-footer">
  <div
      className="xp-footer-btn logoff"
      onClick={() => navigate("/login")}
    >
    <img src="/logoff.webp" />
    <span>Log Off</span>
  </div>

  <div
        className="xp-footer-btn shutdown"
        onClick={() => setShutdown(true)}
      >
    <img src="/shutdown.png" />
    <span>Shut Down</span>
  </div>
</div>

  </div>
)}
 {/* TASK AREA */}
    <div className="xp-task-area">

        {showAboutWindow && (
          <div
            className={`xp-task-button ${!aboutMinimized ? "active" : ""}`}
            onClick={() => {
              setAboutMinimized(prev => !prev)
            }}
          >
            <img src="/about.webp" />
            About Me
          </div>
        )}

        {showResumeWindow && (
          <div
            className={`xp-task-button ${!resumeMinimized ? "active" : ""}`}
            onClick={() => {
              setResumeMinimized(prev => !prev)
            }}
          >
            <img src="/resume.webp" />
            My Resume
          </div>
        )}

        {showContactWindow && (
          <div
            className={`xp-task-button ${!contactMinimized ? "active" : ""}`}
            onClick={() => setContactMinimized(prev => !prev)}
          >
            <img src="/contact.webp" />
            Contact Me
          </div>
        )}



        {showPaint && (
          <div
            className={`xp-task-button ${!paintMinimized ? "active" : ""}`}
            onClick={() => setPaintMinimized(prev => !prev)}
          >
            <img src="/paint.webp" />
            Paint
          </div>
        )}

        {showCmd && (
          <div
            className={`xp-task-button ${!cmdMinimized ? "active" : ""}`}
            onClick={() => setCmdMinimized(prev => !prev)}
          >
            <img src="/cmd.webp" />
            Command Prompt
          </div>
        )}

        {showMusic && (
          <div
            className={`xp-task-button ${!musicMinimized ? "active" : ""}`}
            onClick={() => setMusicMinimized(prev => !prev)}
          >
            <img src="/music.webp" />
             Music Player
          </div>
        )}
        

        {showProjectsWindow && (
        <div
          className={`xp-task-button ${!projectsMinimized ? "active" : ""}`}
          onClick={() => setProjectsMinimized(prev => !prev)}
        >
          <img src="/projects.webp" />
          My Projects
        </div>
      )}

     


      </div>
    </div>
  {/* SYSTEM TRAY */}
  <div className="xp-tray">

    {/* WELCOME ICON */}
    <div
      className="xp-tray-icon"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowWelcome(prev => !prev)}
    >
      <img src="/welcome.webp" />
      {showTooltip && !showWelcome && (
        <div className="xp-tooltip">
          Click to view "Welcome"
        </div>
      )}
    </div>

    {/* CRT ICON */}
    <div
      className="xp-tray-icon"
      onMouseEnter={() => setShowCrtTooltip(true)}
      onMouseLeave={() => setShowCrtTooltip(false)}
      onClick={() => setCrtOn(prev => !prev)}
    >
      <img src={crtOn ? "/crt.webp" : "/crt-off.webp"} />
      {showCrtTooltip && (
        <div className="xp-tooltip">
          {crtOn ? "Turn CRT Off" : "Turn CRT On"}
        </div>
      )}
    </div>

    {/* FULLSCREEN ICON */}
    <div
      className="xp-tray-icon"
      onMouseEnter={() => setShowFsTooltip(true)}
      onMouseLeave={() => setShowFsTooltip(false)}
      onClick={toggleFullScreen}
    >
      <img src="/fullscreen.webp" />
      {showFsTooltip && (
        <div className="xp-tooltip">
          {isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
        </div>
      )}
    </div>

    {/* CLOCK */}
    <div className="xp-clock">
      {time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      })}
    </div>

  </div>
        </div>
      {/* ================= WELCOME BALLOON ================= */}
      {showWelcome && (
        <div className="xp-welcome-popup">
          <div className="xp-balloon-title">
            <div className="xp-balloon-title-left">
              <img src="/welcome.webp" width="18" />
              <span>Welcome to Rahul XP</span>
            </div>
            <span
              className="xp-balloon-close"
              onClick={() => setShowWelcome(false)}
            >
              ×
            </span>
          </div>

          <div>
            A faithful XP-inspired interface, custom-built
            to showcase my work and attention to detail.
            for better understainding how to use go through 
            cmd
            <br /><br />
          </div>
          
        </div>
      )}
    </div>
  )
}