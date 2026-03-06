interface Props {
  onClose: () => void
}

export default function ShutdownModal({ onClose }: Props) {
  return (
    <div className="shutdown-overlay">
      <div className="shutdown-window">

        <div className="shutdown-header">
          Turn off Rahul XP
        </div>

        <div className="shutdown-body">
          <div className="shutdown-option">
            <div className="restart-icon"></div>
            Restart
          </div>

          <div className="shutdown-option">
            <div className="power-icon"></div>
            Shut Down
          </div>
        </div>

        <div className="shutdown-footer">
          <button onClick={onClose}>Cancel</button>
        </div>

      </div>
    </div>
  )
}