import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackgroundBlobs from '../components/BackgroundBlobs';
import AdminLoginModal from '../components/AdminLoginModal';
import LoadingScreen from '../components/LoadingScreen';
import useStore from '../store/useStore';
import { useState, useEffect } from 'react';

export default function PublicLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = useStore((state) => state.fetchData);
  const isLoaded = useStore((state) => state.isLoaded);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      <LoadingScreen isLoading={isLoading} />
      
      {/* Renders behind all content */}
      <BackgroundBlobs />

      {/* Main Content wrapped in a relative div so it stays above the blobs */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {isLoaded && !isLoading && <Outlet />}
        </main>
        <Footer />
        <AdminLoginModal />
      </div>
    </div>
  );
}
