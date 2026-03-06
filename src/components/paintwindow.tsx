// components/PaintWindow.tsx
import Draggable from "react-draggable"
import { useRef } from "react"

interface PaintWindowProps {
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMaximized: boolean
  position: { x: number; y: number }
  setPosition: (pos: { x: number; y: number }) => void
}

export default function PaintWindow({
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  position,
  setPosition
}: PaintWindowProps) {

  const nodeRef = useRef<HTMLDivElement>(null)

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".xp-titlebar"
      disabled={isMaximized}
      position={isMaximized ? { x: 0, y: 0 } : position}
      onStop={(_, data) => {
        if (!isMaximized) {
          setPosition({ x: data.x, y: data.y })
        }
      }}
    >
      <div
        ref={nodeRef}
        className={`xp-window absolute ${
          isMaximized
            ? "top-0 left-0 w-full h-[calc(100vh-30px)]"
            : "w-[900px] h-[600px]"
        }`}
      >
        {/* ================= TITLE BAR ================= */}
        <div className="xp-paint-titlebar">

          <div className="xp-title-left">
            <img src="/paint.webp" className="xp-paint-icon" />
            <span>Paint</span>
          </div>

          <div className="xp-paint-controls">
            <button onClick={onMinimize}>_</button>
            <button onClick={onMaximize}>{isMaximized ? "❐" : "▢"}</button>
            <button onClick={onClose} className="xp-close">X</button>
          </div>

        </div>

        {/* ================= CONTENT ================= */}
        <div className="xp-paint-content">
        <iframe
  src="/jspaint-master/jspaint-master/index.html"
  className="w-full h-full border-none"
  title="Paint"
/>
</div>
      </div>
    </Draggable>
  )
}