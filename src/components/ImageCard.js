import React from 'react';
import { useApp } from '../context/AppContext';

export default function ImageCard({ art }) {
  const { favorites, toggleFavorite } = useApp();
  const isFavorited = favorites.includes(art.id);

  return (
    <div className="mb-4 break-inside-avoid bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative group">
      {/* Like Button */}
      <button
        onClick={() => toggleFavorite(art.id)}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
          isFavorited
            ? 'bg-red-500 text-white shadow-lg'
            : 'bg-white/90 text-gray-400 hover:bg-white hover:text-red-500 shadow-md'
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
        className="w-full rounded-t-lg object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x500/667eea/white?text=Image+Not+Available';
        }}
      />
      
      {/* Artwork Info */}
      <div className="p-4">
        <h2 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
          {art.title}
        </h2>
        <p className="text-gray-600 text-sm mb-1">
          <span className="font-medium">Artist:</span> {art.artistDisplayName || art.artist || 'Unknown'}
        </p>
        {art.department && (
          <p className="text-gray-500 text-xs mb-2">
            <span className="font-medium">Department:</span> {art.department}
          </p>
        )}
        {art.objectDate && (
          <p className="text-gray-500 text-xs">
            <span className="font-medium">Date:</span> {art.objectDate}
          </p>
        )}
      </div>
    </div>
  );
}