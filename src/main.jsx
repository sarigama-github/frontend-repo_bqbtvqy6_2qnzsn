import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from './App'
import Test from './Test'
import GalleryEmbed from './components/GalleryEmbed'
import './index.css'

function RouterGate() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const isEmbed = params.get('embed') === 'gallery'
  if (isEmbed) {
    return <GalleryEmbed />
  }
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RouterGate />
    </BrowserRouter>
  </React.StrictMode>,
)
