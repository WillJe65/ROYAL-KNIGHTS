import React, { useEffect, useState, useRef } from 'react';
import ImageCard from './ImageCard';

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function loadArtworks() {
      try {
        // Use MET API as in your original code
        const searchResponse = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?q=portrait");
        const searchData = await searchResponse.json();

        const ids = searchData.objectIDs?.slice(0, 25) || [];
        const items = [];

        for (const id of ids) {
          try {
            const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
            const art = await res.json();
            
            if (!art || !art.primaryImageSmall) continue;
            
            items.push({
              id: art.objectID,
              src: art.primaryImageSmall,
              title: art.title || "Untitled",
              artist: art.artistDisplayName || "Unknown Artist"
            });
          } catch (e) {
            console.error(`Error loading artwork ${id}:`, e);
          }
        }

        if (mounted) {
          setArtworks(items);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Failed to load artworks');
          setLoading(false);
        }
      }
    }

    loadArtworks();
    return () => { mounted = false; };
  }, []);

  // Initialize masonry after images load
  useEffect(() => {
    if (artworks.length > 0 && galleryRef.current) {
      const grid = galleryRef.current;
      
      imagesLoaded(grid, function() {
        new Masonry(grid, {
          itemSelector: '.masonry-item',
          columnWidth: '.masonry-item',
          percentPosition: true,
          gutter: 16
        });
      });
    }
  }, [artworks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading artworks from Royal Knights collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error: {error}</p>
        <p className="text-gray-600 mt-2">Failed to load artworks 😢</p>
      </div>
    );
  }

  return (
    <div 
      ref={galleryRef}
      className="masonry-grid"
      style={{ 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
      }}
    >
      {artworks.map(art => (
        <div key={art.id} className="masonry-item">
          <ImageCard art={art} />
        </div>
      ))}
    </div>
  );
}