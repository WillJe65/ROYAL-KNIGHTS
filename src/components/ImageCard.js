import React from 'react';

export default function ImageCard({ art }) {
  return (
    <div className="mb-4 break-inside-avoid bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <img 
        src={art.src} 
        alt={art.title}
        className="w-full rounded-t-lg object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x500/667eea/white?text=Image+Not+Available';
        }}
      />
      <div className="p-4">
        <h2 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
          {art.title}
        </h2>
        <p className="text-gray-600 text-sm">
          {art.artist}
        </p>
      </div>
    </div>
  );
}