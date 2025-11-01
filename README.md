# Royal Knights 

**Royal Knights** itu aplikasi web keren yang dibikin pakai **React**. Kamu bisa jelajin ribuan karya seni dari koleksi **Met Museum** langsung dari API publiknya

![SCREENSHOOT](URL_UNTUK_SCREENSHOt)

## Apa Aja Fiturnya?

**Jelajah Seni:** Lihat karya seni dari API Met Museum.

**Filter Departemen:** Filter berdasarkan Departemen dari API yang ada.

**Cari Langsung:** Ketik aja judul, artis, atau departemen jika ingin mencari lebih spesifik.

**Simpan Favorit:** Klik aja ikon hati! Nanti akan disimpan menggunakan local storage di browser.

**Loading & Error handling:** Akan memberikan feedback apabila terjadinya masalah.

## Dibuat Pakai Apa Aja?

**React:** Buat bikin tampilannya.

**React Context API:** untuk mengatur data global (searchTerm, selectedDepartment, dan favorites).

**Tailwind CSS:** Modern dan Flexisibel.

**Met Museum Collection API:** API yang digunakan untuk menampilkan artwork.

## Struktur Proyeknya

Struktur folder pada Repository ini:

ROYAL-KNIGHTS/<br>
├── public/
│   └── index.html       # HTML utama
├── src/
│   ├── components/      # Komponen React yang bisa dipakai ulang
│   │   ├── DepartmentFilter.js # Dropdown untuk filter departemen
│   │   ├── FilterTabs.js       # Tombol tab (All / Favorites)
│   │   ├── Gallery.js          # Komponen utama untuk menampilkan seni
│   │   ├── ImageCard.js        # Kartu buat tiap karya seni
│   │   └── SearchBar.js        # untuk mencari lebih spesifik
│   │
│   ├── context/
│   │   └── AppContext.js       # Data global (favorites, searchTerm, dll.)
│   │
│   ├── App.js           # Komponen utama aplikasi (layout)
│   ├── index.js         # module start aplikasi
│   └── index.css        # Styling global (termasuk Tailwind)
│
├── .env                 # API key/URL
├── package.json         # Info dependensi proyek
└── README.md            


### HOW TO RUN

Kalau mau jalanin proyek ini di komputermu, gampang banget. Ikuti aja langkah-langkah ini:

**1. Clone Repo**

git clone [https://github.com/WillJe65/ROYAL-KNIGHTS.git](https://github.com/WillJe65/ROYAL-KNIGHTS.git)
cd ROYAL-KNIGHTS


**2. Install Semua Paketnya**

Jalankan perintah ini pada terminal untuk install semua module yang dibutuhkan:

npm install


**3. Atur File .env** 

Proyek ini menyimpan URL API untuk kemudahan pengubahan code jika diperlukan.

Bikin file baru namanya .env di folder root proyek.

Salin dan tempel baris ini ke file .env:

REACT_APP_MET_API_BASE_URL=[https://collectionapi.metmuseum.org](https://collectionapi.metmuseum.org)

**4. RUN**

Lakukan perintah command line seperti berikut:

npm start


Nanti akan otomatis terbuka di browser dengan alamat http://localhost:3000.
