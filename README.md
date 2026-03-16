# Smartseum 🏛️📱

**Smartseum** (Singkatan dari: **Smart** = Pintar/Cerdas, **Seum** = Museum) adalah sebuah aplikasi perangkat lunak inovatif berbasis interaksi _QR Code_ untuk menghadirkan pengalaman **Simulasi Museum Interaktif secara 3D**. Proyek ini bertujuan untuk membawa artefak dan peninggalan bersejarah maupun budaya, (seperti _Topeng Rangda_ dari Mitologi Bali), langsung ke layar perangkat pengunjung museum dibantu dengan teknologi web.

## ✨ Fitur Utama

- **🖼️ Interaktif 3D Model Viewer**: Menggunakan library `@google/model-viewer` untuk menampilkan model 3D (seperti file format `.glb`). Fitur responsif ini memungkinkan pengguna merotasi, menggeser, serta melakukan _zoom_ melihat detail artefak dengan kontrol mulus secara leluasa.
- **✨ Animasi & UI Dinamis (Premium Look)**: Menyorot antarmuka pengguna modern (_dark theme_, warna kontras, _glassmorphism_, dan efek _glow_) yang diimplementasikan menggunakan **Tailwind CSS v4** berkolaborasi dengan **Framer Motion** untuk efek masuk yang mulus.
- **📱 QR Code Integration (Dalam Pengembangan)**: Fondasi fitur utama sebagai pemindai di lokasi pameran yang dapat mendeteksi spesifik karya lalu mendisplai model interaktif terkait.
- **⚡ Kinerja Performa Ultra Cepat**: Dibangun dengan _framework_ **Next.js 16** (App Router) beserta **React 19** terbaru yang memastikan rendering data dilakukan secara mutakhir agar meminimalisir lag pada simulasi web 3D.

## 🛠️ Teknologi yang Digunakan (Tech Stack)

- **Framework Utama**: [Next.js (v16.1.6)](https://nextjs.org/)
- **Library UI**: [React (v19)](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animasi & Transisi UI**: [Framer Motion](https://www.framer.com/motion/)
- **Render Engine 3D**: [@google/model-viewer](https://modelviewer.dev/)
- **Bahasa Pemrograman**: TypeScript

## 🚀 Cara Menjalankan Proyek Secara Lokal

Pastikan perangkat Anda telah ter-instal [Node.js](https://nodejs.org/), kemudian jalankan serangkaian perintah ini:

1. **Unduh/Install semua dependensi**:

   ```bash
   npm install
   ```

2. **Mulai server pengembangan (development server)**:

   ```bash
   npm run dev
   ```

3. Buka web browser dan akses [http://localhost:3000](http://localhost:3000) untuk mengeksplorasi antarmuka proyek.

## 🎯 Rencana Masa Depan (Roadmap)

- [ ] Membuat **Landing Page** yang menampilkan daftar koleksi pameran (Galeri Card).
- [ ] Membuat halaman **Detail Koleksi** yang mendisplai deskripsi singkat, gambar, beserta fitur _Generate QR Code_.
- [ ] Membuat halaman khusus **3D Viewer** (Hasil dari proses _Scan QR_) yang berisi model 3D (seperti interaktif objek) dan kartu penjelasan detail karya tersebut.
- [ ] Mengumpulkan aset pendukung museum (gambar referensi dan model `.glb`) tambahan.
- [ ] Optimalisasi performa web (SEO, responsivitas seluler, dan efisiensi load model 3D).
