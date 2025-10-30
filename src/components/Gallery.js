import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import ImageCard from './ImageCard';

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, searchTerm, activeFilter } = useApp();

  useEffect(() => {
    let mounted = true;

    async function loadArtworks() {
      try {
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
              primaryImageSmall: art.primaryImageSmall,
              title: art.title || "Untitled",
              artist: art.artistDisplayName || "Unknown Artist",
              artistDisplayName: art.artistDisplayName,
              department: art.department,
              objectDate: art.objectDate,
              culture: art.culture,
              medium: art.medium
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

  // Filter artworks based on active filter, search term, and favorites
  const filteredArtworks = artworks.filter(art => {
    if (activeFilter === 'favorites' && !favorites.includes(art.id)) {
      return false;
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        art.title?.toLowerCase().includes(searchLower) ||
        art.artistDisplayName?.toLowerCase().includes(searchLower) ||
        art.artist?.toLowerCase().includes(searchLower) ||
        art.department?.toLowerCase().includes(searchLower) ||
        art.culture?.toLowerCase().includes(searchLower) ||
        art.medium?.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

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
    <div>
      {/* Results Count */}
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          Showing {filteredArtworks.length} of {artworks.length} artworks
          {searchTerm && ` for "${searchTerm}"`}
          {activeFilter === 'favorites' && ' in your favorites'}
        </p>
      </div>

      {/* Your Original Column Layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {filteredArtworks.map(art => (
          <div key={art.id} className="mb-4 break-inside-avoid">
            <ImageCard art={art} />
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredArtworks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No artworks found</h3>
          <p className="text-gray-500">
            {searchTerm 
              ? `No artworks match "${searchTerm}". Try different search terms.`
              : activeFilter === 'favorites'
              ? "You haven't added any favorites yet. Click the heart icon on artworks to save them!"
              : "No artworks available."
            }
          </p>
        </div>
      )}
    </div>
  );
}