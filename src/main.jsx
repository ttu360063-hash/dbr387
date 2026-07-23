import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ManageHeader from './pages/admin/ManageHeader.jsx'
import ManageHero from './pages/admin/ManageHero.jsx'
import ManageFeaturedVideo from './pages/admin/ManageFeaturedVideo.jsx'
import ManageRecentVideos from './pages/admin/ManageRecentVideos.jsx'
import ManageCategories from './pages/admin/ManageCategories.jsx'
import ManageAbout from './pages/admin/ManageAbout.jsx'
import ManageCommunity from './pages/admin/ManageCommunity.jsx'
import ManageSocialMedia from './pages/admin/ManageSocialMedia.jsx'
import ManageFooter from './pages/admin/ManageFooter.jsx'
import ManageSettings from './pages/admin/ManageSettings.jsx'
import MediaLibrary from './pages/admin/MediaLibrary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="header" element={<ManageHeader />} />
          <Route path="hero" element={<ManageHero />} />
          <Route path="featured" element={<ManageFeaturedVideo />} />
          <Route path="videos" element={<ManageRecentVideos />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="about" element={<ManageAbout />} />
          <Route path="community" element={<ManageCommunity />} />
          <Route path="social" element={<ManageSocialMedia />} />
          <Route path="footer" element={<ManageFooter />} />
          <Route path="settings" element={<ManageSettings />} />
          <Route path="media" element={<MediaLibrary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
