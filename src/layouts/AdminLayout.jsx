import { Outlet, Navigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import useStore from '../store/useStore';
import { Toaster } from 'react-hot-toast';
import { Save, Eye, RotateCcw, X, Upload } from 'lucide-react';

export default function AdminLayout() {
  const { auth } = useStore((state) => state.data);

  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-2xl font-black mb-4">Acesso Negado</h1>
        <p className="text-gray-400 mb-8">Volte para o site e use o atalho CTRL + SHIFT + ALT + M para fazer login.</p>
        <Link to="/" className="btn-primary px-6 py-3 rounded-lg text-sm font-bold">
          Voltar para o Site
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }} />
      
      <Sidebar />
      
      <main className="ml-64 p-8 min-h-screen pb-24">
        <Outlet />
      </main>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 right-0 left-64 bg-[#111] border-t border-white/10 p-4 px-8 flex items-center justify-between z-40">
        <div className="flex items-center gap-4">
          <button className="btn-primary px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            <Save className="w-4 h-4" />
            Salvar Alterações
          </button>
          <button className="btn-secondary px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Publicar
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/" target="_blank" className="btn-secondary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Visualizar Site
          </Link>
          <button className="text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
            <RotateCcw className="w-4 h-4" />
            Restaurar
          </button>
          <button className="text-gray-400 hover:text-red-500 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
            <X className="w-4 h-4" />
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
