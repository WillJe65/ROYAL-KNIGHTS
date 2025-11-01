import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext'; 
const API_BASE_URL = process.env.REACT_APP_MET_API_BASE_URL || 'https://collectionapi.metmuseum.org';

export default function DepartmentFilter() {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mengambil state dan setter dari context
  const { selectedDepartment, setSelectedDepartment } = useApp();

  // Mengambil daftar departemen dari API saat komponen dimuat
  useEffect(() => {
    async function fetchDepartments() {
      setIsLoading(true);
      try {
        // Menggunakan API_BASE_URL
        const response = await fetch(`${API_BASE_URL}/public/collection/v1/departments`);
        if (!response.ok) {
          throw new Error('Gagal mengambil daftar departemen');
        }
        const data = await response.json();
        
        // Memastikan data.departments adalah array sebelum di-set
        if (data && Array.isArray(data.departments)) {
          setDepartments(data.departments);
        } else {
          setDepartments([]); // Set ke array kosong jika data tidak valid
        }
      } catch (error) {
        console.error("Error mengambil departemen:", error);
        setDepartments([]); // Set ke array kosong jika terjadi error
      } finally {
        setIsLoading(false);
      }
    }

    fetchDepartments();
  }, []); // Array dependensi kosong berarti ini hanya berjalan sekali saat mount

  // Fungsi untuk mengubah departemen di context
  const handleChange = (e) => {
    // Set departmen kembali menjadi all 
    setSelectedDepartment(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-xs mx-auto">
        <label htmlFor="department-select" className="sr-only">Filter by Department</label>
        <select
          id="department-select"
          value={selectedDepartment}
          onChange={handleChange}
          disabled={isLoading} // Nonaktifkan saat sedang loading
          className="block w-full px-4 py-3 pr-8 text-base text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {/* Opsi default berdasarkan status loading yang sedang terjadi*/}
          <option value="">
            {isLoading ? 'Loading departments...' : 'All Departments'}
          </option>
          
          {/* Menampilkan daftar departemen dari API yang ada*/}
          {!isLoading && departments.map(dept => (
            <option key={dept.departmentId} value={dept.departmentId}>
              {dept.displayName}
            </option>
          ))}
        </select>
        
        {/*dropdown */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}
