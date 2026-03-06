import { useEffect, useRef, useState } from "react"
import Draggable from "react-draggable"

interface MusicPlayerProps {
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMaximized: boolean
  position: { x: number; y: number }
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
}

interface Track {
  title: string
  artist: string
  audio: string
  image: string
}

// ─── Playlist ────────────────────────────────────────────────────────────────
// Audio files → drop MP3s into /public/music/ and cover art into /public/covers/
const PLAYLIST: Track[] = [
  { title: "Boyfriend",   artist: "Karan Aujla", audio: "/music/track1.mp3", image: "/covers/cover1.jpg" },
  { title: "Gall",        artist: "Kunwarr",     audio: "/music/track2.mp3", image: "/covers/cover2.jpg" },
  { title: "For a Reason",artist: "Karan Aujla", audio: "/music/track3.mp3", image: "/covers/cover3.jpg" },
  { title: "Sao Paulo",   artist: "The Weeknd",  audio: "/music/track4.mp3", image: "/covers/cover4.jpg" },
  { title: "MF Gabru",    artist: "Karan Aujla", audio: "/music/track5.mp3", image: "/covers/cover1.jpg" },
]

export default function MusicPlayerWindow({
  onClose, onMinimize, onMaximize, isMaximized, position, setPosition
}: MusicPlayerProps) {

  const nodeRef  = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  const currentTrack = PLAYLIST[currentIndex]

  /* Load + autoplay when track changes */
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.src = currentTrack.audio
    audioRef.current.play().catch(() => {})
    setPlaying(true)
  }, [currentIndex])

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(p => !p)
  }

  const nextSong = () => setCurrentIndex(i => (i + 1) % PLAYLIST.length)
  const prevSong = () => setCurrentIndex(i => (i - 1 + PLAYLIST.length) % PLAYLIST.length)

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".xp-window-header"
      bounds="parent"
      disabled={isMaximized}
      position={isMaximized ? { x: 0, y: 0 } : position}
      onStop={(_, data) => { if (!isMaximized) setPosition({ x: data.x, y: data.y }) }}
    >
      <div ref={nodeRef} className="xp-music-window">

        {/* TITLE BAR */}
        <div className="xp-window-header">
          <div className="xp-title-left">
            <img src="/music.webp" />
            <span>Music Player</span>
          </div>
          <div className="xp-window-controls">
            <div className="xp-btn" onClick={onMinimize}>—</div>
            <div className="xp-btn" onClick={onMaximize}>□</div>
            <div className="xp-btn close" onClick={onClose}>×</div>
          </div>
        </div>

        {/* BODY */}
        <div className="xp-music-body">

          {/* ALBUM CARD */}
          <div className="xp-album-card">
            <img src={currentTrack.image} />
            <div className="xp-song-overlay">
              <strong>{currentTrack.title}</strong>
              <span>{currentTrack.artist}</span>
            </div>
          </div>

          <audio ref={audioRef} onEnded={nextSong} />

          {/* IPOD CONTROLS */}
          <div className="xp-ipod-wheel">
            <div className="xp-wheel-btn top">+</div>
            <div className="xp-wheel-btn left" onClick={prevSong}>⏮</div>
            <div className="xp-wheel-center" onClick={togglePlay}>{playing ? "❚❚" : "▶"}</div>
            <div className="xp-wheel-btn right" onClick={nextSong}>⏭</div>
            <div className="xp-wheel-btn bottom">—</div>
          </div>

        </div>
      </div>
    </Draggable>
  )
}
