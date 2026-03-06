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

export default function MusicPlayerWindow({
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  position,
  setPosition
}: MusicPlayerProps) {

  const nodeRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const [tracks,setTracks] = useState<Track[]>([])
  const [currentTrack,setCurrentTrack] = useState<Track | null>(null)
  const [currentIndex,setCurrentIndex] = useState(0)
  const [playing,setPlaying] = useState(false)

  /* PLAYLIST (FRONTEND ONLY) */

  useEffect(()=>{

    const playlist: Track[] = [

      {
    "title": "Boyfriend",
    "artist": "Karan Aujla",
    "audio": "http://localhost:5000/music/track1.mp3",
    "image": "http://localhost:5000/covers/cover1.jpg"
  },
  {
    "title": "Gall",
    "artist": "kunwarr",
    "audio": "http://localhost:5000/music/track2.mp3",
    "image": "http://localhost:5000/covers/cover2.jpg"
  },
  {
    "title": "For a reason",
    "artist": "Karan Aujla",
    "audio": "http://localhost:5000/music/track3.mp3",
    "image": "http://localhost:5000/covers/cover3.jpg"
  },
  {
    "title": "Sao Paulo",
    "artist": "Weekend",
    "audio": "http://localhost:5000/music/track4.mp3",
    "image": "http://localhost:5000/covers/cover4.jpg"
  },
  {
    "title": "MF Gabru",
    "artist": "Karan Aujla",
    "audio": "http://localhost:5000/music/track5.mp3",
    "image": "http://localhost:5000/covers/cover1.jpg"
  }

    ]

    setTracks(playlist)
    setCurrentTrack(playlist[0])

  },[])

  /* AUTOPLAY WHEN SONG CHANGES */

  useEffect(()=>{

    if(audioRef.current && currentTrack){
      audioRef.current.src = currentTrack.audio
      audioRef.current.play()
      setPlaying(true)
    }

  },[currentTrack])

  /* PLAY / PAUSE */

  const togglePlay = () => {

    if(!audioRef.current) return

    if(playing){
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setPlaying(!playing)
  }

  /* NEXT SONG */

  const nextSong = () => {

    if(tracks.length === 0) return

    const next = (currentIndex + 1) % tracks.length

    setCurrentIndex(next)
    setCurrentTrack(tracks[next])
  }

  /* PREVIOUS SONG */

  const prevSong = () => {

    if(tracks.length === 0) return

    const prev = (currentIndex - 1 + tracks.length) % tracks.length

    setCurrentIndex(prev)
    setCurrentTrack(tracks[prev])
  }

  return (

    <Draggable
      nodeRef={nodeRef}
      handle=".xp-window-header"
      bounds="parent"
      disabled={isMaximized}
      position={isMaximized ? {x:0,y:0} : position}
      onStop={(e,data)=>{
        if(!isMaximized){
          setPosition({x:data.x,y:data.y})
        }
      }}
    >

      <div ref={nodeRef} className="xp-music-window">

        {/* TITLE BAR */}

        <div className="xp-window-header">

          <div className="xp-title-left">
            <img src="/music.webp"/>
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

          {currentTrack && (

            <div className="xp-album-card">

              <img src={currentTrack.image}/>

              <div className="xp-song-overlay">
                <strong>{currentTrack.title}</strong>
                <span>{currentTrack.artist}</span>
              </div>

            </div>

          )}

          {/* AUDIO */}

          <audio
            ref={audioRef}
            onEnded={nextSong}
          />

          {/* IPOD CONTROLS */}

          <div className="xp-ipod-wheel">

            <div className="xp-wheel-btn top">+</div>

            <div
              className="xp-wheel-btn left"
              onClick={prevSong}
            >
              ⏮
            </div>

            <div
              className="xp-wheel-center"
              onClick={togglePlay}
            >
              {playing ? "❚❚" : "▶"}
            </div>

            <div
              className="xp-wheel-btn right"
              onClick={nextSong}
            >
              ⏭
            </div>

            <div className="xp-wheel-btn bottom">—</div>

          </div>

        </div>

      </div>

    </Draggable>
  )
}