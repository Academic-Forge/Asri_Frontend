import React from 'react';
import toast from 'react-hot-toast';
import Icon from '../../components/ui/Icon';

interface PlaceholderPageProps {
  name: string;
  icon: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ name, icon }) => {
  const handleAction = () => {
    toast(`Menyimulasikan panggilan API untuk layanan ${name} ASRI...`, { icon: '⚡' });
  };

  // Dynamic details based on page name (fully translated)
  const getPageInfo = () => {
    switch (name.toLowerCase()) {
      case 'analisis':
        return {
          title: 'Modul Analisis',
          subtitle: 'Evaluasi statistik dinamika skor kepercayaan jaringan dan latensi node.',
          desc: 'Modul ini menganalisis riwayat pendapatan epoch, rasio performa validator, dan latensi tanda tangan konsensus di kluster EU-West dan ASEAN.',
        };
      case 'inventori':
        return {
          title: 'Modul Inventori',
          subtitle: 'Registrasi aset ekologis dan audit persediaan stok karbon tersertifikasi.',
          desc: 'Modul ini mencatat dan menampilkan batch ekologis terverifikasi, termasuk Borneo Reserve Sustainable Timber (#882) dan audit Mineral Fairtrade.',
        };
      case 'transaksi':
        return {
          title: 'Modul Transaksi',
          subtitle: 'Buku besar perdagangan eco-credits dan pembayaran imbalan validator.',
          desc: 'Modul ini memantau transfer token, pembayaran verifikasi blok epoch (hadiah ASRI), dan aktivitas buku besar staking smart contract.',
        };
      case 'laporan':
        return {
          title: 'Modul Laporan',
          subtitle: 'Audit kepatuhan, laporan dampak lingkungan, dan riwayat node.',
          desc: 'Modul ini menyusun laporan konsensus kepercayaan, waktu aktif jaringan (uptime), dan jejak audit pemasok bersertifikasi menjadi dokumen kepatuhan yang dapat diunduh.',
        };
      default:
        return {
          title: `Modul ${name}`,
          subtitle: 'Konfigurasi parameter modul dan register jaringan.',
          desc: 'Atur parameter global dan aturan kepatuhan audit untuk node ekosistem ASRI.',
        };
    }
  };

  const info = getPageInfo();

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2">
          {info.title}
        </h1>
        <p className="text-on-surface-variant text-body-md">
          {info.subtitle}
        </p>
      </div>

      {/* Main Content Area */}
      <div className="bg-surface border border-outline-variant rounded-xl p-8 shadow-[0px_10px_30px_rgba(6,78,59,0.01)] flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-16 animate-scale-up">
        <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
          <Icon name={icon} size={36} className="text-secondary" />
        </div>
        
        <h3 className="text-xl font-headline-md text-on-surface font-bold mb-3">
          Integrasi Data Modul {name} Tertunda
        </h3>
        
        <p className="text-sm text-on-surface-variant leading-relaxed mb-8 max-w-md">
          {info.desc} Sinkronisasi data langsung akan berjalan setelah API registri smart contract aktif secara resmi.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-lg font-label-sm text-label-sm hover:bg-slate-50 cursor-pointer"
          >
            Kembali
          </button>
          <button
            onClick={handleAction}
            className="px-4 py-2 bg-secondary text-white rounded-lg font-label-sm text-label-sm hover:bg-secondary-hover cursor-pointer shadow-sm"
          >
            Uji Sinkronisasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
