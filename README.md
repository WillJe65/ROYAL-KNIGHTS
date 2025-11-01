# Royal Knights 

**Royal Knights** itu aplikasi web keren yang dibikin pakai **React**. Kamu bisa jelajin ribuan karya seni dari koleksi **Met Museum** langsung dari API publiknya

![img1](https://github.com/WillJe65/ROYAL-KNIGHTS/blob/main/src/Screenshoot/1.png)

## Apa Aja Fiturnya?

**Jelajah Seni:** Lihat karya seni dari API Met Museum.

**Filter Departemen:** Filter berdasarkan Departemen dari API yang ada.

**Cari Langsung:** Ketik aja judul, artis, atau departemen jika ingin mencari lebih spesifik.

**Simpan Favorit:** Klik aja ikon hati! Nanti akan disimpan menggunakan local storage di browser.

**Loading & Error handling:** Akan memberikan feedback apabila terjadinya masalah.

![img2](https://github.com/WillJe65/ROYAL-KNIGHTS/blob/main/src/Screenshoot/2.png)

## Dibuat Pakai Apa Aja?

**React:** Buat bikin tampilannya.

**React Context API:** untuk mengatur data global (searchTerm, selectedDepartment, dan favorites).

**Tailwind CSS:** Modern dan Flexisibel.

**Met Museum Collection API:** API yang digunakan untuk menampilkan artwork.

## Struktur Proyeknya

Struktur folder pada Repository ini:

ROYAL-KNIGHTS/<br>
├── public/<br>
│   └── index.html       # HTML utama<br>
├── src/<br>
│   ├── components/      # Komponen React yang bisa dipakai ulang<br>
│   │   ├── DepartmentFilter.js # Dropdown untuk filter departemen<br>
│   │   ├── FilterTabs.js       # Tombol tab (All / Favorites)<br>
│   │   ├── Gallery.js          # Komponen utama untuk menampilkan seni<br>
│   │   ├── ImageCard.js        # Kartu buat tiap karya seni<br>
│   │   └── SearchBar.js        # untuk mencari lebih spesifik<br>
│   │<br>
│   ├── context/<br>
│   │   └── AppContext.js       # Data global (favorites, searchTerm, dll.)<br>
│   │<br>
│   ├── App.js           # Komponen utama aplikasi (layout)<br>
│   ├── index.js         # module start aplikasi
│   └── index.css        # Styling global (termasuk Tailwind)<br>
│<br>
├── .env                 # API key/URL<br>
├── package.json         # Info dependensi proyek<br>
└── README.md        <br>    

![img3](https://github.com/WillJe65/ROYAL-KNIGHTS/blob/main/src/Screenshoot/3.png)

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

![img4](https://github.com/WillJe65/ROYAL-KNIGHTS/blob/main/src/Screenshoot/4.png)

Nanti akan otomatis terbuka di browser dengan alamat http://localhost:3000.
