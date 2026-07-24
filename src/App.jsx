import Hero from './components/Hero'
import FeaturedVideo from './components/FeaturedVideo'
import RecentVideos from './components/RecentVideos'
import Categories from './components/Categories'
import AboutCommunity from './components/AboutCommunity'
import SocialMedia from './components/SocialMedia'

export default function App() {
  return (
    <div className="pt-16">
      <Hero />
      <FeaturedVideo />
      <RecentVideos />
      <Categories />
      <AboutCommunity />
      <SocialMedia />
    </div>
  )
}
