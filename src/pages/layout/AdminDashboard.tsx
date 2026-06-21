import { useState, memo } from 'react';
import toast from 'react-hot-toast';
import Icon from '../../components/ui/Icon';

interface AlertItem {
  id: number;
  type: 'error' | 'warning' | 'success';
  icon: string;
  title: string;
  text: string;
  time: string;
  details: string;
}

export const AdminDashboard = memo(() => {
  // Metric states (with defaults)
  const [tps, setTps] = useState(2450);
  const [uptime, setUptime] = useState(99.99);
  const [activeNodes, setActiveNodes] = useState(14208);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Configuration states
  const [autoScaling, setAutoScaling] = useState(true);
  const [strictValidation, setStrictValidation] = useState(false);
  const [finalityTimeout, setFinalityTimeout] = useState('15 menit');
  const [computeTier, setComputeTier] = useState('Standar');

  // Chart range state and data
  const [chartRange, setChartRange] = useState<'1J' | '24J' | '7H'>('24J');
  const chartData = {
    '1J': {
      volumes: [450, 680, 890, 1100, 2450, 1300, 1600],
      heights: ['20%', '30%', '40%', '50%', '95%', '55%', '65%'],
      xAxis: ['00:10', '00:20', '00:30', '00:40', '00:50', 'Sekarang'],
    },
    '24J': {
      volumes: [1200, 1800, 1350, 2400, 2850, 2100, 1500],
      heights: ['40%', '60%', '45%', '80%', '95%', '70%', '50%'],
      xAxis: ['00:00', '06:00', '12:00', '18:00', 'Sekarang'],
    },
    '7H': {
      volumes: [8500, 12400, 9300, 14200, 16800, 11000, 13500],
      heights: ['50%', '75%', '55%', '85%', '95%', '65%', '80%'],
      xAxis: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    },
  };

  // Alerts state (translated)
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: 1,
      type: 'error',
      icon: 'gavel',
      title: 'Perselisihan Konsensus',
      text: 'Kluster node di wilayah Barat (EU-West) melaporkan perbedaan tanda tangan validasi blok.',
      time: '12 menit lalu',
      details: 'Penyimpangan tanda tangan blok terdeteksi pada kluster validator EU-West. Batas persetujuan konsensus (67%) turun menjadi 58%. Diperlukan intervensi manual atau reboot kluster validator.',
    },
    {
      id: 2,
      type: 'warning',
      icon: 'sync_problem',
      title: 'Spike Latensi',
      text: 'Waktu respons API gateway melebihi ambang batas 200ms secara global.',
      time: '45 menit lalu',
      details: 'Rata-rata respons API gateway melonjak ke 345ms karena beban filter mitigasi DDoS di wilayah Asia-Pasifik. Prosedur auto-scaling dinonaktifkan sementara.',
    },
    {
      id: 3,
      type: 'success',
      icon: 'update',
      title: 'Peningkatan Protokol',
      text: 'Pembaruan registri smart contract terjadwal menunggu persetujuan administrator.',
      time: '2 jam lalu',
      details: 'Proposal peningkatan registri smart contract (v1.4.2) sedang menunggu tanda tangan digital admin. Peningkatan mencakup optimasi biaya gas (gas fee) dan perbaikan keamanan pool staking validator.',
    },
  ]);

  // Alert detail drawer state
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

  // Handle refresh and slightly randomize values
  const handleRefresh = () => {
    setIsRefreshing(true);
    const loadToast = toast.loading('Memuat ulang metrik jaringan...');
    setTimeout(() => {
      setIsRefreshing(false);
      setTps(Math.floor(2300 + Math.random() * 300));
      setUptime(parseFloat((99.95 + Math.random() * 0.04).toFixed(2)));
      setActiveNodes(14208 + Math.floor(Math.random() * 20 - 10));
      
      toast.dismiss(loadToast);
      toast.success('Metrik berhasil diperbarui!');
    }, 800);
  };

  // Handle Export Report (triggers a text file download summarizing status)
  const handleExport = () => {
    const reportText = `=== LAPORAN JARINGAN EKOSISTEM ASRI ===
Dibuat Pada: ${new Date().toLocaleString()}
Status Jaringan: AKTIF - OPTIMAL
-------------------------------------
Throughput Jaringan: ${tps} TPS
Waktu Aktif Sistem: ${uptime}%
Total Node Aktif: ${activeNodes} Node
-------------------------------------
KONFIGURASI SISTEM:
- Auto-Scaling: ${autoScaling ? 'AKTIF' : 'NON-AKTIF'}
- Validasi Ketat (2FA): ${strictValidation ? 'AKTIF' : 'NON-AKTIF'}
- Batas Timeout Finalitas: ${finalityTimeout}
- Tier Komputasi: ${computeTier}
-------------------------------------
DAFTAR ALERT TERTUNDA: ${alerts.length}
${alerts.map((a, idx) => `[ALERT #${idx + 1}] ${a.title} (${a.time})\n- Detail: ${a.text}`).join('\n')}
=====================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan-Jaringan-ASRI-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Laporan berhasil diunduh!');
  };

  // Resolve alert
  const handleResolveAlert = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    setSelectedAlert(null);
    toast.success('Perselisihan berhasil diselesaikan!');
  };

  const activeChart = chartData[chartRange === '7H' ? '7H' : chartRange === '1J' ? '1J' : '24J'];

  return (
    <div className="w-full relative animate-fade-in">
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2">
            Dashboard Jaringan
          </h1>
          <p className="text-on-surface-variant text-body-md">
            Gambaran umum real-time dari node kepercayaan ekologis dan stabilitas sistem ASRI.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleExport}
            className="flex-1 sm:flex-initial px-4 py-2 border border-secondary text-secondary rounded-lg font-label-sm text-label-sm hover:bg-secondary/5 cursor-pointer font-bold active:scale-95"
          >
            Ekspor Laporan
          </button>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex-1 sm:flex-initial px-4 py-2 bg-primary text-white rounded-lg font-label-sm text-label-sm flex items-center justify-center gap-2 hover:bg-primary-hover cursor-pointer disabled:opacity-50 font-bold active:scale-95"
          >
            <Icon
              name="refresh"
              size={18}
              className={isRefreshing ? 'animate-spin' : ''}
            />{' '}
            Muat Ulang Data
          </button>
        </div>
      </div>

      {/* Core Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Metric 1: TPS */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-[0px_10px_30px_rgba(6,78,59,0.02)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 ">
            <Icon name="bolt" size={64} />
          </div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              Throughput Jaringan
            </h3>
            <span className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span> Optimal
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg-mobile text-display-lg-mobile text-primary">{tps.toLocaleString()}</span>
            <span className="text-on-surface-variant text-sm">TPS</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Icon name="trending_up" size={16} className="text-secondary" />
            <span className="text-secondary font-semibold">+12.4%</span>
            <span className="text-on-surface-variant opacity-70 ml-1">vs jam lalu</span>
          </div>
        </div>

        {/* Metric 2: Uptime */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-[0px_10px_30px_rgba(6,78,59,0.02)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 ">
            <Icon name="verified_user" size={64} />
          </div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              Waktu Aktif Sistem
            </h3>
            <span className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span> Stabil
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg-mobile text-display-lg-mobile text-primary">{uptime}</span>
            <span className="text-on-surface-variant text-sm">%</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Icon name="schedule" size={16} className="text-on-surface-variant" />
            <span className="text-on-surface-variant font-semibold">1,402 jam</span>
            <span className="text-on-surface-variant opacity-70 ml-1">non-stop</span>
          </div>
        </div>

        {/* Metric 3: Nodes */}
        <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-[0px_10px_30px_rgba(6,78,59,0.02)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 ">
            <Icon name="lan" size={64} />
          </div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              Node Aktif
            </h3>
            <span className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span> Sinkron
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg-mobile text-display-lg-mobile text-primary">{activeNodes.toLocaleString()}</span>
            <span className="text-on-surface-variant text-sm">Total</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Icon name="add_circle" size={16} className="text-secondary" />
            <span className="text-secondary font-semibold">+42</span>
            <span className="text-on-surface-variant opacity-70 ml-1">baru hari ini</span>
          </div>
        </div>
      </div>

      {/* Secondary Layout Area: Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-surface border border-outline-variant rounded-xl p-6 shadow-[0px_10px_30px_rgba(6,78,59,0.01)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6 border-b border-outline-variant pb-4">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Volume Transaksi ({chartRange === '7H' ? '7 Hari' : chartRange === '1J' ? '1 Jam' : '24 Jam'})
              </h2>
              <div className="flex bg-surface-container border border-outline-variant rounded-lg p-0.5">
                {([
                  { label: '1J', key: '1J' },
                  { label: '24J', key: '24J' },
                  { label: '7H', key: '7H' }
                ] as const).map((r) => (
                  <button
                    key={r.key}
                    onClick={() => setChartRange(r.key as '1J' | '24J' | '7H')}
                    className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                      chartRange === r.key
                        ? 'bg-secondary text-white shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Chart Placeholder Layout */}
            <div className="h-64 w-full relative flex items-end gap-2 pt-4">
              {/* Y Axis labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-on-surface-variant pb-6 pr-2">
                <span>{chartRange === '7H' ? '20k' : '3k'}</span>
                <span>{chartRange === '7H' ? '12k' : '2k'}</span>
                <span>{chartRange === '7H' ? '6k' : '1k'}</span>
                <span>0</span>
              </div>
              {/* Grid lines */}
              <div className="absolute left-8 right-0 top-0 h-full flex flex-col justify-between pb-6 z-0 pointer-events-none">
                <div className="w-full border-b border-outline-variant/30"></div>
                <div className="w-full border-b border-outline-variant/30"></div>
                <div className="w-full border-b border-outline-variant/30"></div>
                <div className="w-full border-b border-outline-variant/50"></div>
              </div>
              {/* Bar Data (Simulated) */}
              <div className="flex-grow flex items-end justify-between ml-10 mb-6 h-full z-10 gap-1 sm:gap-2">
                {activeChart.volumes.map((vol, i) => (
                  <div
                    key={i}
                    style={{ height: activeChart.heights[i] }}
                    className="w-full bg-secondary/40 hover:bg-secondary rounded-t-sm group relative cursor-pointer"
                  >
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-neutral text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100  whitespace-nowrap z-20 shadow-md font-semibold">
                      {vol.toLocaleString()} txn
                    </div>
                  </div>
                ))}
              </div>
              {/* X Axis labels */}
              <div className="absolute bottom-0 left-10 right-0 flex justify-between text-xs text-on-surface-variant pt-2 border-t border-outline-variant">
                {activeChart.xAxis.map((lbl, i) => (
                  <span key={i}>{lbl}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Alerts Side Panel */}
        <div className="bg-surface border border-outline-variant rounded-xl flex flex-col shadow-[0px_10px_30px_rgba(6,78,59,0.01)]">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center">
            <h2 className="font-headline-md text-headline-md text-on-surface">Peringatan Sistem</h2>
            {alerts.length > 0 && (
              <span className="w-6 h-6 rounded-full bg-error-container text-on-error-container flex items-center justify-center text-xs font-bold animate-pulse">
                {alerts.length}
              </span>
            )}
          </div>
          <div className="flex-grow overflow-y-auto p-2 min-h-[300px]">
            {alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center text-on-surface-variant/40">
                <Icon name="task_alt" size={40} className="text-on-surface-variant/40 mb-2" />
                <p className="mt-2 text-sm font-bold">Semua sistem aman</p>
              </div>
            ) : (
              alerts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedAlert(item)}
                  className="p-4 border-b border-outline-variant/50 hover:bg-surface-container-low cursor-pointer group rounded-lg m-2"
                >
                  <div className="flex gap-3">
                    <div
                      className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.type === 'error'
                          ? 'bg-error/10 text-error'
                          : item.type === 'warning'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-secondary-container/30 text-secondary'
                      }`}
                    >
                      <Icon name={item.icon} size={18} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-label-sm text-label-sm text-on-surface font-bold">{item.title}</h4>
                      <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{item.text}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] text-on-surface-variant">{item.time}</span>
                        <span className="text-[10px] font-bold text-primary group-hover:text-secondary flex items-center gap-1">
                          Tinjau <Icon name="arrow_forward" size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t border-outline-variant text-center">
            <button
              onClick={() => toast('Riwayat aktivitas sudah mutakhir.', { icon: 'ðŸ“Š' })}
              className="text-sm font-semibold text-secondary hover:text-primary cursor-pointer"
            >
              Lihat Semua Aktivitas
            </button>
          </div>
        </div>
      </div>

      {/* Configuration Controls */}
      <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-[0px_10px_30px_rgba(6,78,59,0.01)]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Konfigurasi Sistem</h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Atur parameter jaringan global dan batas toleransi konsensus.
            </p>
          </div>
          <button
            onClick={() => toast.success('Akses konfigurasi dibuka!')}
            className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-low cursor-pointer flex items-center justify-center"
          >
            <Icon name="tune" size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Config Item 1: Auto-scaling */}
          <div
            className={`p-4 rounded-lg bg-surface-container-lowest flex flex-col justify-between border ${
              autoScaling ? 'border-secondary shadow-sm' : 'border-outline-variant/50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <Icon name="speed" size={20} className="text-on-surface-variant" />
              <div
                onClick={() => {
                  setAutoScaling(!autoScaling);
                  toast.success(`Auto-Scaling ${!autoScaling ? 'Diaktifkan' : 'Dinonaktifkan'}`);
                }}
                className={`w-10 h-5 rounded-full relative cursor-pointer ${
                  autoScaling ? 'bg-secondary' : 'bg-outline-variant'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm ${
                    autoScaling ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </div>
            </div>
            <div>
              <h4 className="font-label-sm text-label-sm text-on-surface">Auto-Scaling</h4>
              <p className="text-xs text-on-surface-variant mt-1">Sediakan node dinamis</p>
            </div>
          </div>

          {/* Config Item 2: Finality Timeout */}
          <div className="p-4 rounded-lg bg-surface-container-lowest flex flex-col justify-between border border-outline-variant/50 hover:border-secondary">
            <div className="flex justify-between items-start mb-2">
              <Icon name="lock_clock" size={20} className="text-on-surface-variant" />
              <select
                value={finalityTimeout}
                onChange={(e) => {
                  setFinalityTimeout(e.target.value);
                  toast.success(`Timeout finalitas diatur ke ${e.target.value}`);
                }}
                className="bg-surface-container border border-outline-variant rounded px-1.5 py-0.5 text-xs font-semibold text-on-surface focus:outline-none focus:border-secondary cursor-pointer font-bold"
              >
                <option value="5 menit">5 menit</option>
                <option value="15 menit">15 menit</option>
                <option value="30 menit">30 menit</option>
              </select>
            </div>
            <div>
              <h4 className="font-label-sm text-label-sm text-on-surface">Timeout Finalitas</h4>
              <p className="text-xs text-on-surface-variant mt-1">Batas penerimaan blok</p>
            </div>
          </div>

          {/* Config Item 3: Compute Tier */}
          <div className="p-4 rounded-lg bg-surface-container-lowest flex flex-col justify-between border border-outline-variant/50 hover:border-secondary">
            <div className="flex justify-between items-start mb-2">
              <Icon name="memory" size={20} className="text-on-surface-variant" />
              <select
                value={computeTier}
                onChange={(e) => {
                  setComputeTier(e.target.value);
                  toast.success(`Tier komputasi diubah ke ${e.target.value}`);
                }}
                className="bg-surface-container border border-outline-variant rounded px-1.5 py-0.5 text-xs font-semibold text-on-surface focus:outline-none focus:border-secondary cursor-pointer font-bold"
              >
                <option value="Standar">Standar</option>
                <option value="Premium">Premium</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div>
              <h4 className="font-label-sm text-label-sm text-on-surface">Tier Komputasi</h4>
              <p className="text-xs text-on-surface-variant mt-1">Lingkungan eksekusi node</p>
            </div>
          </div>

          {/* Config Item 4: Strict Validation */}
          <div
            className={`p-4 rounded-lg bg-surface-container-lowest flex flex-col justify-between border ${
              strictValidation ? 'border-secondary shadow-sm' : 'border-outline-variant/50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <Icon name="security" size={20} className="text-on-surface-variant" />
              <div
                onClick={() => {
                  setStrictValidation(!strictValidation);
                  toast.success(`Validasi Ketat (2FA) ${!strictValidation ? 'Diaktifkan' : 'Dinonaktifkan'}`);
                }}
                className={`w-10 h-5 rounded-full relative cursor-pointer ${
                  strictValidation ? 'bg-secondary' : 'bg-outline-variant'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm ${
                    strictValidation ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </div>
            </div>
            <div>
              <h4 className="font-label-sm text-label-sm text-on-surface">Validasi Ketat</h4>
              <p className="text-xs text-on-surface-variant mt-1">Wajibkan 2FA untuk semua operasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Review Sidebar Drawer */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop overlay (Optimized solid color transition) */}
          <div
            onClick={() => setSelectedAlert(null)}
            className="absolute inset-0 bg-black/40 "
          />
          {/* Drawer container */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between border-l border-outline-variant animate-slide-left z-10">
            <div>
              <div className="flex justify-between items-center border-b border-outline-variant pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selectedAlert.type === 'error'
                        ? 'bg-error/10 text-error'
                        : selectedAlert.type === 'warning'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-secondary-container/30 text-secondary'
                    }`}
                  >
                    <Icon name={selectedAlert.icon} size={18} />
                  </div>
                  <h3 className="font-headline-md text-lg text-on-surface font-bold">{selectedAlert.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-slate-100 cursor-pointer"
                >
                  <Icon name="close" size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Stempel Waktu</span>
                  <p className="text-sm font-bold text-on-surface mt-0.5">{selectedAlert.time}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Ringkasan</span>
                  <p className="text-sm text-on-surface mt-0.5 font-medium">{selectedAlert.text}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Log Teknis Jaringan</span>
                  <div className="bg-slate-50 p-4 border border-outline-variant rounded-lg mt-1 font-mono text-xs text-on-surface-variant leading-relaxed">
                    {selectedAlert.details}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-t border-outline-variant pt-4 mt-6">
              <button
                onClick={() => setSelectedAlert(null)}
                className="flex-1 py-2.5 border border-outline-variant text-on-surface-variant rounded-lg text-sm font-bold hover:bg-slate-50 cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => handleResolveAlert(selectedAlert.id)}
                className={`flex-1 py-2.5 text-white rounded-lg text-sm font-bold cursor-pointer active:scale-[0.98] ${
                  selectedAlert.type === 'error'
                    ? 'bg-error hover:bg-red-700'
                    : selectedAlert.type === 'warning'
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-secondary hover:bg-secondary-hover'
                }`}
              >
                {selectedAlert.type === 'success' ? 'Setujui & Hapus' : 'Selesaikan Masalah'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

AdminDashboard.displayName = 'AdminDashboard';

export default AdminDashboard;
