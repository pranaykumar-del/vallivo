import { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

class GlobalErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', background: '#F5F1EA', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'serif' }}>
          <div style={{ color: '#1E3A5F', fontSize: '2rem', marginBottom: '1rem' }}>VALLIVO</div>
          <div style={{ color: '#C9A96E', fontSize: '0.75rem', letterSpacing: '0.2em' }}>TEA FROM THE VALLEYS</div>
          <div style={{ marginTop: '2rem', color: '#1E3A5F', opacity: 0.5, fontSize: '0.8rem' }}>Loading...</div>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalErrorBoundary>
)
