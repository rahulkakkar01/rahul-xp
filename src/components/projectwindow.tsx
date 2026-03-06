import Draggable from "react-draggable"
import { useRef, useState } from "react"

interface Project {
  title: string
  image: string
  category: string
  items: number
  brief: string
  description: string
  link: string
}
interface Props {
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMaximized: boolean
  setActive: () => void
  hidden: boolean
  position: { x: number; y: number }
  setPosition: (pos: { x: number; y: number }) => void
}

const projects: Project[] = [
{
title: "Portfolio Website",
image: "/projects/project4.png",
category: "Personal Work • Web",
items: 4,
brief: "Modern portfolio built using React and Tailwind.",
description: "This project showcases my full stack and frontend work using animations, responsive layouts and modern UI patterns.",
link: "https://yourportfolio.com"
},
{
title: "Beyond Chats",
image: "/projects/project3.png",
category: "Personal Work • Web",
items: 4,
brief: "Realtime chat platform.",
description: "A full stack realtime messaging system built with WebSockets and NodeJS.",
link: "https://beyondchats-cyan.vercel.app/"
},
{
title: "Comic San",
image: "/projects/project2.png",
category: "Personal Work • Image",
items: 5,
brief: "Typography experiment.",
description: "A playful typography project exploring expressive fonts and comic UI.",
link: "https://comic-san.vercel.app/"
},
{
title: "Softsell",
image: "/projects/project1.png",
category: "Personal Work • Web",
items: 4,
brief: "Software resale platform.",
description: "A marketplace to resell unused software licenses.",
link: "https://softsell-lovat-six.vercel.app/"
}

]

export default function ProjectsWindow({
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  setActive,
  hidden,
  position,
  setPosition
}: Props) {

  const nodeRef = useRef<HTMLDivElement>(null)

  /* ================= STATE ================= */

  const [category, setCategory] = useState("All")
  const [history, setHistory] = useState<string[]>(["All"])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [historyIndex, setHistoryIndex] = useState(0)
  const [darkMode] = useState(true)

  /* ================= NAVIGATION ================= */

  const goHome = () => {
    setCategory("All")
    setHistory(["All"])
    setHistoryIndex(0)
  }

  const navigateTo = (cat: string) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(cat)

    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setCategory(cat)
  }

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setCategory(history[newIndex])
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setCategory(history[newIndex])
    }
  }

  const showFavorites = () => {
    setCategory("Favorites")
  }


const [searchQuery, setSearchQuery] = useState("")
const refresh = () => {
  setSearchQuery("")
  setSelectedProject(null)
}

  /* ================= COMPONENT RETURN ================= */

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
        className={`xp-explorer-window ${hidden ? "hidden" : ""} ${isMaximized ? "maximized" : ""}`}
        onMouseDown={setActive}
      >

        {/* HEADER */}

        <div className="xp-window-header">

          <div className="xp-title-left">
            <img src="/projects.webp" />
            <span>My Projects</span>
          </div>

          <div className="xp-window-controls">

            <div className="xp-btn" onClick={onMinimize}>
              —
            </div>

            <div className="xp-btn" onClick={onMaximize}>
              {isMaximized ? "❐" : "□"}
            </div>

            <div className="xp-btn close" onClick={onClose}>
              ✕
            </div>

          </div>

        </div>

        {/* MENU */}

        <div className="xp-menu-bar">

          <div className="xp-menu-left">
            <span>File</span>
            <span>View</span>
            <span>Tools</span>
            <span>Help</span>
          </div>

          <img src="/xp.png" className="xp-menu-logo" />

        </div>

        {/* TOOLBAR */}

        <div className="xp-toolbar">

            <div className="xp-nav-group">

                <div
                className={`xp-nav-btn ${category === "All" ? "disabled" : ""}`}
                onClick={goHome}
                >
                <img src="/home.webp" />
                <span>Home</span>
                </div>

                <div
                className={`xp-nav-btn ${historyIndex === 0 ? "disabled" : ""}`}
                onClick={goBack}
                >
                <img src="/back.webp" />
                <span>Back</span>
                </div>

                <div
                className={`xp-nav-btn ${historyIndex === history.length - 1 ? "disabled" : ""}`}
                onClick={goForward}
                >
                <img src="/forward.webp" />
                <span>Forward</span>
                </div>

                <div className="xp-nav-btn" onClick={showFavorites}>
                <img src="/favorites.webp" />
                <span>Favorites</span>
                </div>

                <div className="xp-nav-btn" >
                <img src="/views.webp" />
                <span>{darkMode ? "Light" : "Dark"}</span>
                </div>

            </div>

            </div>

        {/* ADDRESS BAR */}

        <div className="xp-address-bar">

          <span className="xp-address-label">Address</span>

          <div className="xp-address-field">

            <div className="xp-address-content">
              <img src="/projects.webp" />
              <span>https://www.myprojects.com</span>
            </div>

          </div>

          <button className="xp-go-btn">Go</button>

        </div>

        {/* BODY */}

        <div className="xp-prj-layout">

          {/* SIDEBAR */}

            <div className="xp-prj-sidebar">

                <div className="xp-prj-sidebar-header">
                    Categories
                </div>
                    <div
                    className={`xp-prj-sidebar-item ${category === "All" ? "active" : ""}`}
                    onClick={() => navigateTo("All")}
                    >
                    <img src="/l_home.webp" /> All
                    </div>

                    <div
                    className={`xp-prj-sidebar-item ${category === "Image" ? "active" : ""}`}
                    onClick={() => navigateTo("Image")}
                    >
                    <img src="/l_image.webp" /> Image
                    </div>

                    <div
                    className={`xp-prj-sidebar-item ${category === "Web" ? "active" : ""}`}
                    onClick={() => navigateTo("Web")}
                    >
                    <img src="/l_web.webp" /> Web
                    </div>

                    <div
                    className={`xp-prj-sidebar-item ${category === "Personal" ? "active" : ""}`}
                    onClick={() => navigateTo("Personal")}
                    >
                    <img src="/personal.webp" /> Personal
                    </div>

                </div>

                {/* CONTENT */}

                <div className="xp-prj-content">

                    {/* HEADER */}

                    <div className="xp-prj-header">

                    <div className="xp-prj-logo" onClick={refresh}>
                        <img src="/monkey.png" />
                        <span>MyProjects</span>
                    </div>

                    <div className="xp-prj-search">

                            <input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            <button>
                                <img src="/l_search.webp" />
                            </button>

                            </div>

                    <div className="xp-prj-socials">

                        <img src="/l_linked.webp"
                        onClick={() => window.open("https://linkedin.com", "_blank")} />

                        <img src="/l_insta.webp"
                        onClick={() => window.open("https://instagram.com", "_blank")} />

                        <img src="/l_github.webp"
                        onClick={() => window.open("https://github.com", "_blank")} />

                    </div>

                    </div>

        {selectedProject ? (

                /* ================= PROJECT VIEW ================= */

                <div className="xp-project-viewer">

                    {/* LEFT MAIN */}

                    <div className="xp-project-main">

                        <div className="xp-project-preview">
                            <img src={selectedProject.image} />
                            <a
                                href={selectedProject.link}
                                target="_blank"
                                className="xp-project-open"
                                
                                ><img src="/open.webp" /></a>
                        </div>

                        <div className="xp-project-meta">

                            <img src="/avatar.JPG" className="xp-prj-avatar"/>

                            <h2>{selectedProject.title}</h2>

                                <div className="xp-project-tags">
                                    <span className="tag-red">Personal Work</span>
                                    <span className="tag-dark">Web</span>
                                </div>

                            </div>

                            <div className="xp-project-description">

                                <div className="xp-project-box">
                                    <strong>Brief:</strong>
                                    <p>{selectedProject.brief}</p>
                                </div>

                                <div className="xp-project-box">
                                    <strong>Description:</strong>
                                    <p>{selectedProject.description}</p>
                                </div>

                            </div>

                        </div>


                        {/* RIGHT SIDE SUGGESTED */}

                        <div className="xp-project-suggested">

                            <h3>Suggested</h3>

                            {projects
                            .filter(p => p.title !== selectedProject.title)
                            .map((p,i)=>(

                            <div
                            key={i}
                            className="xp-suggested-item"
                            onClick={()=>setSelectedProject(p)}
                            >

                                <img src={p.image}/>



                                    <div>
                                        <div className="xp-suggested-title">{p.title}</div>
                                            
                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    ) : (

                    /* ================= PROJECT GRID ================= */

                    <div className="xp-prj-grid">

                    {projects
                    .filter(project => {

                        const matchesCategory =
                        category === "All" || project.category.includes(category)

                        const matchesSearch =
                        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        project.category.toLowerCase().includes(searchQuery.toLowerCase())

                        return matchesCategory && matchesSearch

                    })
                    .map((project,i)=>(

                    <div
                    key={i}
                    className="xp-prj-card"
                    onClick={()=>setSelectedProject(project)}
                    >

                        <div className="xp-prj-thumb">
                            <img src={project.image}/>
                                <div className="xp-prj-badge">{project.items} Items</div>
                        </div>

                        <div className="xp-prj-info">

                            <img src="/avatar.JPG" className="xp-prj-avatar"/>

                                <div>
                                    <div className="xp-prj-title">{project.title}</div>
                                    <div className="xp-prj-category">{project.category}</div>
                                </div>

                        </div>

                    </div>

                ))}

            </div>

        )}
        </div>
        </div>
        {/* STATUS */}

        <div className="xp-status-bar">
          Select a project to view details
        </div>

      </div>

    </Draggable>

  )
}