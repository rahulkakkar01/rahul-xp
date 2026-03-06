import { useState, useEffect, useRef } from "react"
import Draggable from "react-draggable"
import AboutWindow from "./aboutcomponent"

interface CmdWindowProps {
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMaximized: boolean
  position: { x: number; y: number }
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  openAbout: () => void 
  openResume: () => void
  openContact: () => void
  openPaint: () => void
}

export default function CmdWindow({
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  position,
  setPosition,
  openAbout,
  openResume,
  openContact,
  openPaint
}: CmdWindowProps) {

  const [history, setHistory] = useState<string[]>([
    "Rahul XP v1.0 (2026)",
    "Inspired by Windows XP",
    "",
    "Type 'help' for a list of commands.",
    "Press ENTER/RETURN to execute commands.",
    ""
  ])

  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const nodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight
    })
  }, [history])

  const handleCommand = (cmd: string) => {

    let output: string[] = []

    switch (cmd.toLowerCase()) {

      case "help":
        output = [
          "Info: AUTHOR, STACK, DISCLAIMER",
          "Commands: DATE, TIME, VER, HELP, EXIT",
          "Applications: ABOUT, RESUME, CONTACT, PAINT"
        ]
        break

      case "author":
        output = [
          "Designed and developed by Rahul Kakkar",
        ]
        break

      case "stack":
        output = [
          "React",
          "typescript",
          "",
          "Key Dependencies:",
          "xp.css",
          "github.com/1j01/jspaint",
          "github.com/Xiexe/WoWLoginScreens"
        ]
        break

      case "ver":
        output = ["Rahul XP Version 1.0"]
        break

      case "date":
        output = [new Date().toLocaleDateString()]
        break

      case "time":
        output = [new Date().toLocaleTimeString()]
        break

      case "clear":
        setHistory([])
        return

     case "about":
    output = ["Opening About window..."]
    openAbout()
    break

    case "resume":
    output = ["Opening Resume window..."]
    openResume()
    break

    case "contact":
    output = ["Opening Contact window..."]
    openContact()
    break

    case "paint":
    output = ["Launching Paint..."]
    openPaint()
    break

      case "exit":
        onClose()
        return

      default:
        output = [`'${cmd}' is not recognized as an internal command.`]
    }

    setHistory(prev => [
      ...prev,
      `C:\\> ${cmd}`,
      ...output,
      ""
    ])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.key === "Enter") {
      handleCommand(input)
      setInput("")
    }
  }

  return (

        <Draggable
        nodeRef={nodeRef}
        handle=".xp-window-header"
        bounds="parent"
        disabled={isMaximized}
        position={isMaximized ? { x: 0, y: 0 } : position}
        onStop={(e, data) => {
            if (!isMaximized) {
            setPosition({ x: data.x, y: data.y })
            }
        }}
        >
  <div ref={nodeRef} className="xp-cmd-window">

    {/* TITLE BAR */}
        <div className="xp-window-header">

        <div className="xp-title-left">
            <img src="/cmd.webp" />
            <span>Command Prompt</span>
        </div>

        <div className="xp-window-controls">
            <div className="xp-btn" onClick={onMinimize}>—</div>
            <div className="xp-btn" onClick={onMaximize}>□</div>
            <div className="xp-btn close" onClick={onClose}>×</div>
        </div>

        </div>

        {/* TERMINAL BODY */}

        <div className="cmd-body" ref={bodyRef}>

          {history.map((line, i) => (
            <div key={i}>{line}</div>
          ))}

          <div className="cmd-input-line">

            <span style={{ marginRight: "6px" }}>C:\&gt;</span>

            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="cmd-input"
            />

          </div>

        </div>

      </div>

    </Draggable>
  )
}