import React from 'react';
import { AppProvider } from './context/AppContext';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Your Original Header */}
        <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="logo">
                <h1 className="text-2xl font-bold">Royal Knights</h1>
              </div>

              <nav>
                <ul className="flex space-x-6">
                  <li><a href="#" className="text-white hover:text-blue-200 transition-colors">Home</a></li>
                  <li><a href="#" className="text-white hover:text-blue-200 transition-colors">Gallery</a></li>
                  <li><a href="#" className="text-white hover:text-blue-200 transition-colors">About</a></li>
                  <li><a href="#" className="text-white hover:text-blue-200 transition-colors">Contact</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow py-8">
          <div className="max-w-7xl mx-auto px-4">
            {/* Search and Filter Section */}
            <div className="mb-8 space-y-4">
              <SearchBar />
              <FilterTabs />
            </div>
            
            <Gallery />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2025 Dzaky Pramadhani</p>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;