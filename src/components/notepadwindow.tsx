import Draggable from "react-draggable"
import { useRef, useState, useEffect } from "react"

interface Props {
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMaximized: boolean
  position: { x: number; y: number }
  setPosition: (pos: { x: number; y: number }) => void
}

function safeGetStorage(key: string): string {
  try { return localStorage.getItem(key) ?? "" } catch { return "" }
}

function safeSetStorage(key: string, value: string): void {
  try { localStorage.setItem(key, value) } catch { /* incognito / blocked */ }
}

export default function NotepadWindow({
  onClose, onMinimize, onMaximize, isMaximized, position, setPosition
}: Props) {

  const nodeRef = useRef<HTMLDivElement>(null)
  const [text, setText] = useState("")

  useEffect(() => {
    setText(safeGetStorage("xp-notepad"))
  }, [])

  const saveText = (value: string) => {
    setText(value)
    safeSetStorage("xp-notepad", value)
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".xp-window-header"
      bounds="parent"
      disabled={isMaximized}
      position={isMaximized ? { x: 0, y: 0 } : position}
      onStop={(_, data) => { setPosition({ x: data.x, y: data.y }) }}
    >
      <div ref={nodeRef} className={`xp-notepad-window ${isMaximized ? "maximized" : ""}`}>

        {/* TITLE BAR */}
        <div className="xp-window-header">
          <div className="xp-title-left">
            <img className="xp-notepad-icon" src="/notepad.png" />
            <span>Your Notepad</span>
          </div>
          <div className="xp-window-controls">
            <div className="xp-btn" onClick={onMinimize}>—</div>
            <div className="xp-btn" onClick={onMaximize}>{isMaximized ? "❐" : "□"}</div>
            <div className="xp-btn close" onClick={onClose}>✕</div>
          </div>
        </div>

        {/* MENU */}
        <div className="xp-notepad-menu">
          <span>File</span>
          <span>Edit</span>
          <span>Format</span>
          <span>View</span>
          <span>Help</span>
        </div>

        {/* TEXT AREA */}
        <textarea
          className="xp-notepad-text"
          value={text}
          onChange={e => saveText(e.target.value)}
          placeholder="Leave a message for Rahul..."
        />

      </div>
    </Draggable>
  )
}
