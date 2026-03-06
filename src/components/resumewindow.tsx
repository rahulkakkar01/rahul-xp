import Draggable from "react-draggable"
import { useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

interface ResumeProps {
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMaximized: boolean
  setActive: () => void
  hidden: boolean
  position: { x: number; y: number }
  setPosition: (pos: { x: number; y: number }) => void
}

export default function ResumeWindow({
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  setActive,
  hidden,
  position,
  setPosition
}: ResumeProps) {

  const nodeRef = useRef<HTMLDivElement>(null)
  const [numPages, setNumPages] = useState<number>(0)
  const [scale, setScale] = useState(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".xp-window-header"
      cancel=".xp-btn"
      bounds="parent"
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
        className={`xp-explorer-window 
          ${hidden ? "hidden" : ""} 
          ${isMaximized ? "maximized" : ""}`}
        onMouseDown={setActive}
      >

        {/* TITLE BAR */}
        <div className="xp-window-header">
          <div className="xp-title-left">
            <img src="/resume.webp" />
            <span>Finalresume.pdf</span>
          </div>

          <div className="xp-window-controls">
            <div className="xp-btn" onClick={onMinimize}>—</div>
            <div className="xp-btn" onClick={onMaximize}>
              {isMaximized ? "❐" : "□"}
            </div>
            <div className="xp-btn close" onClick={onClose}>X</div>
          </div>
        </div>

        {/* MENU */}
        <div className="xp-menu-bar">
          <div className="xp-menu-left">
            <span>File</span>
            <span>View</span>
            <span>Help</span>
          </div>
          <img src="/xp.png" className="xp-menu-logo" />
        </div>

        {/* TOOLBAR */}
        <div className="xp-toolbar">

          <div
            className="xp-toolbar-item"
            onClick={() => setScale(prev => prev + 0.1)}
          >
            <img src="/search.webp" />
            <span>Zoom In</span>
          </div>

          <div
            className="xp-toolbar-item"
            onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}
          >
            <img src="/search.webp" />
            <span>Zoom Out</span>
          </div>

          <div className="xp-toolbar-separator" />

          <div
            className="xp-toolbar-item"
            onClick={() => {
              const link = document.createElement("a")
              link.href = "/Finalresume.pdf"
              link.download = "Rahul_Kakkar_Resume.pdf"
              link.click()
            }}
          >
            <img src="/save.webp" />
            <span>Save</span>
          </div>

          <div
            className="xp-toolbar-item"
            onClick={() => window.open("/Finalresume.pdf")}
          >
            <img src="/print.webp" />
            <span>Print</span>
          </div>

          <div className="xp-toolbar-separator" />

          <div
            className="xp-toolbar-item"
            onClick={() => window.location.href = "mailto:rkakkar0111@gmail.com"}
          >
            <img src="/contact.webp" />
            <span>Contact Me</span>
          </div>

          <span style={{ marginLeft: 15 }}>
            {Math.round(scale * 100)}%
          </span>

        </div>

        {/* ADDRESS */}
        <div className="xp-address-bar">
          <span className="xp-address-label">Address</span>
          <div className="xp-address-field">
            <div className="xp-address-content">
              <img src="/projects.png" />
              <span>Documents/Finalresume.pdf</span>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="xp-explorer-body">
          <div className="xp-pdf-container">
            <Document
              file="/Finalresume.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (_, index) => (
                <Page
                  key={index}
                  pageNumber={index + 1}
                  scale={scale}
                />
              ))}
            </Document>
          </div>
        </div>

        {/* STATUS */}
        <div className="xp-status-bar">
          {numPages} Pages | Ready
        </div>

      </div>
    </Draggable>
  )
}