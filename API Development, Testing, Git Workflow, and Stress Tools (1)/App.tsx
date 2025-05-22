import { ItemsList } from './components/ItemsList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Gerenciador de Itens API</h1>
          <p className="mt-1 text-sm text-gray-500">
            Interface web para gerenciar itens através da API REST
          </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <ItemsList />
        </div>
      </main>
      <footer className="bg-white shadow-inner mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Projeto API - Interface Web © 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
