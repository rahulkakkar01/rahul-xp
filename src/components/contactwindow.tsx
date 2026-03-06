import { useState, useRef } from "react"
import Draggable from "react-draggable"

interface ContactWindowProps {
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMaximized: boolean
  position: { x: number; y: number }
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
}

type SendStatus = "idle" | "sending" | "sent" | "error"

export default function ContactWindow({
  onClose, onMinimize, onMaximize, isMaximized, position, setPosition
}: ContactWindowProps) {

  const [form, setForm] = useState({ from: "", subject: "", message: "" })
  const [status, setStatus] = useState<SendStatus>("idle")
  const nodeRef = useRef<HTMLDivElement>(null)

  const isValid = form.from.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.from)
  const canSend = isValid && form.message.trim() !== "" && status === "idle"

  const handleSend = async () => {
    if (!canSend) return
    setStatus("sending")
    try {
      // ── Formspree integration ──────────────────────────────────────────────
      // 1. Sign up at https://formspree.io and create a form
      // 2. Add VITE_FORMSPREE_URL=https://formspree.io/f/YOUR_ID to your .env
      const endpoint = import.meta.env.VITE_FORMSPREE_URL as string | undefined

      if (!endpoint) {
        // Fallback: open mailto if no Formspree URL configured
        window.location.href = `mailto:rkakkar0111@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`
        setStatus("sent")
        return
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email: form.from, subject: form.subject, message: form.message }),
      })

      if (res.ok) {
        setStatus("sent")
        setForm({ from: "", subject: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const handleNew = () => {
    setForm({ from: "", subject: "", message: "" })
    setStatus("idle")
  }

  const statusText =
    status === "sending" ? "Sending…" :
    status === "sent"    ? "✓ Message sent!" :
    status === "error"   ? "✗ Failed to send. Try again." :
    "Compose a message"

  return (
    <Draggable
      nodeRef={nodeRef}
      disabled={isMaximized}
      handle=".xp-titlebar"
      position={isMaximized ? { x: 0, y: 0 } : position}
      onStop={(_, data) => { if (!isMaximized) setPosition({ x: data.x, y: data.y }) }}
    >
      <div
        ref={nodeRef}
        className={`xp-window contact-window ${isMaximized ? "fixed top-0 left-0 w-screen h-[calc(100vh-30px)]" : "w-[700px]"}`}
      >

        {/* TITLE BAR */}
        <div className="xp-titlebar xp-mail-title">
          <div className="xp-title-left">
            <img src="/contact.webp" />
            <span>Contact Me</span>
          </div>
          <div className="xp-window-controls">
            <button onClick={onMinimize} className="xp-btn">—</button>
            <div className="xp-btn" onClick={onMaximize}>
              <span className="xp-button">{isMaximized ? "❐" : "□"}</span>
            </div>
            <button onClick={onClose} className="xp-btn close">✖</button>
          </div>
        </div>

        {/* MENU BAR */}
        <div className="xp-mail-menubar">
          <span>File</span><span>Edit</span><span>View</span><span>Tools</span><span>Help</span>
          <img src="/xp.png" className="xp-menu-logo" />
        </div>

        {/* TOOLBAR */}
        <div className="xp-mail-toolbar">
          <div
            className={`xp-mail-tool ${!canSend ? "disabled" : ""}`}
            onClick={handleSend}
            title={!isValid && form.from ? "Enter a valid email address" : ""}
          >
            <img src="/send.webp" />
            <span>{status === "sending" ? "Sending…" : "Send Message"}</span>
          </div>

          <div className="xp-mail-tool" onClick={handleNew}>
            <img src="/new.webp" />
            <span>New Message</span>
          </div>

          <div className="xp-mail-divider" />

          <div className="xp-mail-tool disabled"><img src="/cut.webp" /></div>
          <div className="xp-mail-tool disabled"><img src="/copy.webp" /></div>
          <div className="xp-mail-tool disabled"><img src="/paste.webp" /></div>

          <div className="xp-mail-divider" />

          <div
            className="xp-mail-tool linkedin"
            onClick={() => window.open("https://www.linkedin.com/in/rahul-kakkar-416757264/", "_blank")}
          >
            <img src="/linkedin.webp" />
            <span>LinkedIn</span>
          </div>
        </div>

        {/* FORM */}
        <div className="xp-mail-body">
          <div className="xp-mail-row">
            <label>To:</label>
            <input value="rkakkar0111@gmail.com" disabled />
          </div>

          <div className="xp-mail-row">
            <label>From:</label>
            <input
              placeholder="Your email address"
              value={form.from}
              onChange={e => setForm({ ...form, from: e.target.value })}
            />
          </div>

          <div className="xp-mail-row">
            <label>Subject:</label>
            <input
              placeholder="Subject of your message"
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
            />
          </div>

          <textarea
            placeholder="Write your message here"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
          />
        </div>

        {/* STATUS BAR */}
        <div className="xp-mail-status">{statusText}</div>

      </div>
    </Draggable>
  )
}
