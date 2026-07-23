import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedVideo from './components/FeaturedVideo'
import RecentVideos from './components/RecentVideos'
import Categories from './components/Categories'
import AboutCommunity from './components/AboutCommunity'
import SocialMedia from './components/SocialMedia'
import Footer from './components/Footer'
import AdminLoginModal from './components/AdminLoginModal'
import LoadingScreen from './components/LoadingScreen'
import BackgroundBlobs from './components/BackgroundBlobs'
import useStore from './store/useStore'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = useStore((state) => state.fetchData)
  const isLoaded = useStore((state) => state.isLoaded)

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      <LoadingScreen isLoading={isLoading} />
      
      {/* Renders behind all content */}
      <BackgroundBlobs />

      {/* Main Content wrapped in a relative div so it stays above the blobs */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <FeaturedVideo />
          <RecentVideos />
          <Categories />
          <AboutCommunity />
          <SocialMedia />
        </main>
        <Footer />
        <AdminLoginModal />
      </div>
    </div>
  )
}

export default App
