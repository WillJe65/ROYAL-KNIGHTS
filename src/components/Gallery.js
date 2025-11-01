import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

//IMAGE CARD UNTUK MENAMPILKAN KARTU GAMBAR DARI API
//IMAGE CARD INI SAYA MENGGUNAKAN MISONARY DALAM MENGATUR TATA LETAK SEPERTI DI PINTEREST
function ImageCard({ art }) {
  if (!art) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={art.src} alt={art.title} className="w-full h-auto object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-sm text-gray-800 truncate">{art.title}</h3>
        <p className="text-xs text-gray-600 truncate">{art.artist}</p>
      </div>
    </div>
  );
}


export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Ambil 'selectedDepartment' dari context
  const { favorites, searchTerm, activeFilter, selectedDepartment } = useApp();

  // Tambahkan 'selectedDepartment' ke dependency array useEffect
  useEffect(() => {
    let mounted = true;
    setLoading(true); // Tampilkan loading setiap kali filter berubah
    setError(null);

    async function loadArtworks() {
      try {
        let searchResponse;

        // RENDER SESUAI DENGAN DEPARTEMEN YANG DIPILIH
        if (selectedDepartment) {
          // Jika departemen dipilih, ambil ID objek dari departemen itu
          searchResponse = await fetch(`${API_BASE_URL}/public/collection/v1/objects?departmentIds=${selectedDepartment}`);
        } else {
          // Jika tidak ada departemen dipilih, gunakan logika default edngan mencari potrait
          searchResponse = await fetch(`${API_BASE_URL}/public/collection/v1/search?q=portrait`);
        }
        
        if (!searchResponse.ok) {
          throw new Error('Gagal mengambil data karya seni');
        }

        const searchData = await searchResponse.json();

        // Ambil 25 ID pertama (atau lebih sedikit dikarenakan dibatasi 80 request)
        const ids = searchData.objectIDs?.slice(0, 25) || [];
        
        if (ids.length === 0) {
          if (mounted) {
            setArtworks([]);
            setLoading(false);
          }
          return;
        }

        const items = [];

        for (const id of ids) {
          try {
            const res = await fetch(`${API_BASE_URL}/public/collection/v1/objects/${id}`);
            if (!res.ok) continue; // Lewati jika objek tidak ditemukan (seperti misalnya: 404)
            
            const art = await res.json();
            
            // Lewati jika gambar tidak tersedia
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
            console.error(`Error memuat artwork ${id}:`, e);
            // Lanjutkan loop meskipun satu objek gagal
          }
        }

        if (mounted) {
          setArtworks(items);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Gagal memuat karya seni');
        }
      } finally {
        if (mounted) {
          // Hentikan loading jika semua selesai
          setLoading(false); 
        }
      }
    }

    loadArtworks();
    return () => { mounted = false; };
  }, [selectedDepartment]); // useEffect ini akan berjalan lagi saat 'selectedDepartment' berubah

  // Filter artworks berdasarkan active filter, search term, dan favorites
  // Logika ini (client-side filtering) tetap sama dan akan berjalan PADA HASIL yang sudah di-fetch
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
      {/* Jumlah Results  */}
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          Showing {filteredArtworks.length} of {artworks.length} artworks
          {selectedDepartment && ` in selected department`}
          {searchTerm && ` for "${searchTerm}"`}
          {activeFilter === 'favorites' && ' in your favorites'}
        </p>
      </div>

      {/* Column Layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {filteredArtworks.map(art => (
          <div key={art.id} className="mb-4 break-inside-avoid">
            <ImageCard art={art} />
          </div>
        ))}
      </div>

      {/* Message Tidak ada hasil */}
      {(filteredArtworks.length === 0 && artworks.length > 0) && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No artworks found</h3>
          <p className="text-gray-500">
            {searchTerm 
              ? `No artworks match "${searchTerm}" in this department.`
              : activeFilter === 'favorites'
              ? "You haven't added any favorites from this department yet."
              : "No artworks available matching filters."
            }
          </p>
        </div>
      )}

      {/* Jika tidak ada hasil sama sekali*/}
      {(artworks.length === 0 && !loading) && (
         <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🖼️</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No artworks found</h3>
          <p className="text-gray-500">
            {selectedDepartment
              ? "This department may be empty or data is unavailable."
              : "No artworks available."
            }
          </p>
        </div>
      )}
    </div>
  );
}
