import React from 'react';
import { useApp } from '../context/AppContext';

//TEMPLATE UNTUK KARTU GAMBAR YANG AKAN MUNCUL
export default function ImageCard({ art }) {
  const { favorites, toggleFavorite } = useApp();
  const isFavorited = favorites.includes(art.id);

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition relative group">
      {/* Like tombol jika ingin menambahkan ke favorites */}
      <button
        onClick={() => toggleFavorite(art.id)}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
          isFavorited
            ? 'bg-red-500 text-white shadow-lg'
            : 'bg-white/90 text-gray-400 hover:bg-white hover:text-red-500 shadow-md opacity-0 group-hover:opacity-100'
        }`}
        title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <svg
          className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`}
          fill={isFavorited ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Artwork Image */}
      <img 
        src={art.primaryImageSmall || art.src} 
        alt={art.title}
        className="w-full rounded-t-lg"
        loading="lazy"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x300/667eea/white?text=Image+Not+Available';
        }}
      />
      
      {/* Artwork metadata */}
      <div className="p-3 text-center">
        <h2 className="font-semibold text-gray-800 text-sm mb-1">
          {art.title}
        </h2>
        <p className="text-gray-500 text-xs">
          {art.artistDisplayName || art.artist || 'Unknown Artist'}
        </p>
        
        {/* Additional metadata */}
        {(art.department || art.objectDate) && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            {art.department && (
              <p className="text-gray-400 text-xs">
                {art.department}
              </p>
            )}
            {art.objectDate && (
              <p className="text-gray-400 text-xs">
                {art.objectDate}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}