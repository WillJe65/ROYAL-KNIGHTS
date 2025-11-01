import React from 'react';
import { AppProvider } from './context/AppContext';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import DepartmentFilter from './components/DepartmentFilter';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Main Content */}
        <main className="flex-grow py-8">
          <div className="max-w-7xl mx-auto px-4">
            {/* Search and Filter Section */}
            <div className="mb-8 space-y-4">
              <br /><br /><br />
              <h2 class="text-3xl font-bold text-center mb-12">ART SEARCH</h2>
              <SearchBar />
              <FilterTabs />
              <DepartmentFilter />
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