import { create } from 'zustand';

// Initial empty/fallback data structure
const initialData = {
  header: { logo: '', brandName: '', menu: [], socials: [], buttonText: '' },
  hero: { background: '', smallText: '', titleHTML: '', description: '', primaryButton: {}, secondaryButton: {}, stats: [] },
  featuredVideo: { image: '', smallTitle: '', title: '', category: '', info: '', description: '', duration: '', button: {} },
  recentVideos: [],
  categories: [],
  about: { titleHTML: '', description: '', buttonText: '', image: '' },
  community: { titleHTML: '', description: '', buttonText: '', url: '' },
  socialMediaCards: [],
  footer: { description: '', copyright: '' },
  auth: { isAuthenticated: false }
};

const useStore = create((set, get) => ({
  data: initialData,
  isLoaded: false,
  
  // Load data from public/data.json
  fetchData: async () => {
    try {
      const timestamp = new Date().getTime(); // Prevent caching
      const response = await fetch(`/data.json?t=${timestamp}`);
      if (response.ok) {
        const jsonData = await response.json();
        set({ data: { ...jsonData, auth: get().data.auth }, isLoaded: true });
      }
    } catch (error) {
      console.error('Error fetching data.json:', error);
    }
  },
  
  // Authentication
  login: () => set((state) => ({ data: { ...state.data, auth: { isAuthenticated: true } } })),
  logout: () => set((state) => ({ data: { ...state.data, auth: { isAuthenticated: false } } })),

  // Update specific sections
  updateHeader: (newHeader) => set((state) => ({ data: { ...state.data, header: { ...state.data.header, ...newHeader } } })),
  updateHero: (newHero) => set((state) => ({ data: { ...state.data, hero: { ...state.data.hero, ...newHero } } })),
  updateFeaturedVideo: (newVideo) => set((state) => ({ data: { ...state.data, featuredVideo: { ...state.data.featuredVideo, ...newVideo } } })),
  
  setRecentVideos: (videos) => set((state) => ({ data: { ...state.data, recentVideos: videos } })),
  setCategories: (categories) => set((state) => ({ data: { ...state.data, categories: categories } })),
  setSocialMediaCards: (cards) => set((state) => ({ data: { ...state.data, socialMediaCards: cards } })),

  updateAbout: (newAbout) => set((state) => ({ data: { ...state.data, about: { ...state.data.about, ...newAbout } } })),
  updateCommunity: (newComm) => set((state) => ({ data: { ...state.data, community: { ...state.data.community, ...newComm } } })),
  updateFooter: (newFooter) => set((state) => ({ data: { ...state.data, footer: { ...state.data.footer, ...newFooter } } })),
}));

export default useStore;
