import React from 'react';
import { useApp } from '../context/AppContext';

export default function FilterTabs() {
  const { activeFilter, setActiveFilter, favorites } = useApp();

  const filters = [
    { id: 'all', name: 'All Artworks', count: null },
    { id: 'favorites', name: 'My Favorites', count: favorites.length }
  ];

  return (
    <div className="flex justify-center space-x-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            activeFilter === filter.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter.name}
          {filter.count !== null && (
            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
              activeFilter === filter.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}>
              {filter.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}