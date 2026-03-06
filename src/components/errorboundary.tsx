import { Component} from "react"
import type { ReactNode } from "react"

interface Props { children: ReactNode; name?: string }
interface State { hasError: boolean; message: string }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: "" }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="xp-window" style={{ minWidth: 320, padding: "16px 20px" }}>
          <div className="xp-window-header">
            <div className="xp-title-left">
              <span>⚠ {this.props.name ?? "Window"} crashed</span>
            </div>
          </div>
          <div style={{ padding: "12px", fontFamily: "monospace", fontSize: 12, color: "#c0392b" }}>
            {this.state.message}
          </div>
          <button
            style={{ margin: "8px 12px", padding: "4px 12px" }}
            onClick={() => this.setState({ hasError: false, message: "" })}
          >
            Retry
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
