import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ManageHeader from './pages/admin/ManageHeader.jsx'
import ManageHero from './pages/admin/ManageHero.jsx'
import ManageRecentVideos from './pages/admin/ManageRecentVideos.jsx'

// Placeholder for other pages
function Placeholder({ title }) {
  return (
    <div>
      <h1 className="text-3xl font-black mb-2">{title}</h1>
      <p className="text-gray-400">Página em desenvolvimento para a demonstração.</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="header" element={<ManageHeader />} />
          <Route path="hero" element={<ManageHero />} />
          <Route path="featured" element={<Placeholder title="Último Lançamento" />} />
          <Route path="videos" element={<ManageRecentVideos />} />
          <Route path="categories" element={<Placeholder title="Categorias" />} />
          <Route path="about" element={<Placeholder title="Sobre" />} />
          <Route path="community" element={<Placeholder title="Comunidade" />} />
          <Route path="social" element={<Placeholder title="Redes Sociais" />} />
          <Route path="footer" element={<Placeholder title="Footer" />} />
          <Route path="settings" element={<Placeholder title="Configurações e SEO" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
