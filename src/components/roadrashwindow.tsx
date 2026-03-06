import { useRef } from "react"
import Draggable from "react-draggable"

interface Props {
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMaximized: boolean
  position: { x: number; y: number }
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
}

export default function RoadRashWindow({
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  position,
  setPosition
}: Props){

const nodeRef = useRef<HTMLDivElement>(null)

return(

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

<div ref={nodeRef} className="xp-game-window">

<div className="xp-window-header">

<div className="xp-title-left">
<img src="/roadrash.jpg"/>
<span>Road Rash</span>
</div>

<div className="xp-window-controls">
<div className="xp-btn" onClick={onMinimize}>—</div>
<div className="xp-btn" onClick={onMaximize}>□</div>
<div className="xp-btn close" onClick={onClose}>×</div>
</div>

</div>

<div className="xp-game-body">

<iframe
src="/public/games/minesweeper/index.html"
style={{
width:"100%",
height:"100%",
border:"none"
}}
/>


</div>

</div>

</Draggable>

)

}