# ASRI - Frontend Dashboard Admin & Validator

Repository ini berisi kode frontend untuk platform perdagangan digital terintegrasi **ASRI**, dengan fokus pengembangan pada implementasi **Dashboard Admin** dan **Dashboard Validator** yang interaktif, berkinerja tinggi, dan responsif (Mobile First).

---

## 🛠️ Tech Stack & Pustaka Utama

* **Core Framework**: React 19 + TypeScript
* **Build Tool**: Vite 8
* **Styling**: Tailwind CSS v4 (Desain modern menggunakan skema warna alam *primary green*, *emerald*, dan *tertiary light green*)
* **Routing**: React Router DOM v7 (`createBrowserRouter`)
* **State & Form**: React Hook Form, Zod Schema Validation
* **Notifikasi**: React Hot Toast
* **Ikonografi**: Lucide React (SVG) untuk rendering performa tinggi

---

## 📁 Struktur Direktori Penting

```bash
src/
├── assets/                  # Aset gambar & logo terkompresi
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx # Route Guard / Keamanan rute berbasis Token
│   ├── layout/
│   │   ├── DashboardLayout.tsx # Layout kerangka dashboard
│   │   ├── Navbar.tsx         # Area navigasi atas
│   │   ├── Sidebar.tsx        # Menu navigasi kiri (mobile/desktop responsive)
│   │   └── ProfileDropdown.tsx # Dropdown akun & aksi Logout
│   └── ui/
│       └── Icon.tsx           # Komponen Icon SVG universal berbasis Lucide
├── pages/
│   ├── auth/
│   │   ├── Login.tsx          # Autentikasi Masuk dengan fallback demo offline
│   │   └── Register.tsx       # Autentikasi Pendaftaran
│   └── layout/
│       ├── dashboard.tsx      # Entrypoint Dashboard (Autodetect Role)
│       ├── AdminDashboard.tsx # Halaman Utama Portal Admin
│       ├── ValidatorDashboard.tsx # Halaman Utama Pusat Validator
│       └── PlaceholderPage.tsx # Modul Penampung (Analisis, Inventori, Transaksi, Laporan)
├── routes/
│   └── AppRoutes.tsx          # Konfigurasi perutean & Lazy Loading Auth
├── schemas/                   # Skema validasi Zod untuk form
├── services/                  # Integrasi API (axios) & Mock authService
└── types/                     # Definisi tipe TypeScript
```

---

## 🌟 Fitur & Interaktivitas yang Diimplementasikan (Branch: Ari)

### 1. Dashboard Admin (`AdminDashboard.tsx`)
* **Dynamic Chart Swapping**: Klik tombol rentang waktu (`1J`, `24J`, `7H`) untuk menukar data visual grafik batang transaksi secara instan beserta tooltip volume transaksinya.
* **Interactive Alerts Drawer**: Klik item peringatan sistem (seperti *Perselisihan Konsensus*, *Spike Latensi*, dsb) untuk membuka laci detail teknis, dilengkapi tombol penanganan langsung yang memperbarui state peringatan secara real-time.
* **Sistem Konfigurasi Aktif**: Dropdown interaktif untuk penyesuaian *Finality Timeout* dan *Compute Tier* global, serta tombol sakelar toggle untuk *Auto-Scaling* dan *Validasi Ketat*.
* **Ekspor Laporan**: Mengunduh berkas laporan berformat teks secara langsung yang menyimpulkan metrik throughput jaringan aktif.
* **Pemuatan Ulang Data**: Simulasi tombol segarkan metrik jaringan dengan animasi putaran ikon dan toast pemberitahuan.

### 2. Dashboard Validator (`ValidatorDashboard.tsx`)
* **Simulasi Konsensus Blok**: Penggunaan interval non-blocking untuk menambah tinggi blok secara otomatis setiap 3 detik dan mencetak log audit real-time langsung ke konsol terminal validator.
* **Audit Trail Export**: Tombol ekspor untuk mengunduh log audit terminal konsensus sesi berjalan menjadi berkas `.log`.
* **Modul Verifikasi Batch Produk**: Antrean verifikasi interaktif. Mengeklik batch (seperti *Kayu Borneo*, *Mineral Fairtrade*) akan membuka modal berisi checklist verifikasi otomatis (signature matching, geolokasi) dengan aksi *Verifikasi Batch* atau *Tolak*.
* **Propose Protocol Update**: Formulir modal untuk mengirimkan usulan parameter konsensus baru yang akan langsung tercatat di konsol log sistem.
* **Epoch Claim Wallet**: Aksi klaim untuk mencairkan hasil pendapatan Epoch ASRI ke dompet digital secara interaktif.

---

## ⚡ Optimasi Performa Utama (LCP & INP Tuning)

Untuk memastikan performa halaman tetap sangat ringan (LCP < 1.5s dan INP responsif):
1. **Pemuatan Ikon SVG Terpadu**: Mengganti font eksternal Google `material-icons-outlined` dengan komponen [Icon.tsx](src/components/ui/Icon.tsx) berbasis SVG Lucide React. Ini membebaskan utas utama browser dari proses *font shaping* yang berat dan menghemat penundaan paint (*presentation delay*).
2. **Kompresi Aset Logo 70 Megapiksel**: Menemukan logo asli `logo-asri-1.webp` yang berukuran 9716x7296 piksel (283MB di RAM saat didekompresi) dan meresizenya menjadi berkas teroptimasi [logo-asri-optimized.webp](src/assets/img/logo-asri-optimized.webp) berdimensi **159x120 piksel** (hanya berukuran **3.5 KB** dari sebelumnya **611 KB**). Ini memangkas waktu tunda interaksi secara masif.
3. **Pemberantasan Double Rendering**: Memperbaiki pengenalan peran (*activeRole*) di `dashboard.tsx` agar langsung terdeteksi dari `localStorage` saat inisialisasi state pertama, menghindarkan render berulang dari dashboard yang berbeda.
4. **Overlay Transisi Berbasis GPU**: Mengubah overlay seluler dari conditional React mounting (`{isOpen && ...}`) menjadi elemen DOM statis dengan kendali kelas CSS `opacity` dan `pointer-events` untuk mengalihkan beban animasi langsung ke GPU.

---

## 🚀 Cara Menjalankan & Membangun Proyek

### Instalasi Dependensi
```bash
npm install
```

### Jalankan Server Pengembangan (Dev Mode)
```bash
npm run dev
```
Buka [http://localhost:5173](http://localhost:5173) di browser Anda.

### Uji Pemeriksaan Tipe TypeScript
```bash
npx tsc --noEmit
```

### Build Bundel Produksi (Kompilasi)
```bash
npm run build
```

### Jalankan Preview Hasil Build Produksi
```bash
npm run preview
```
