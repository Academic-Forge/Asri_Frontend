import { useState, useEffect, useRef, memo } from 'react';
import toast from 'react-hot-toast';
import Icon from '../../components/ui/Icon';

interface QueueItem {
  id: number;
  title: string;
  details: string;
  icon: string;
  iconColor: string;
  badgeText: string;
  badgeClass: string;
  supplier: string;
  hash: string;
  docs: number;
  consensusScore: number;
}

export const ValidatorDashboard = memo(() => {
  // Epoch rewards and pool state
  const [earnings, setEarnings] = useState(1240);
  const [poolCapacity, setPoolCapacity] = useState(82);

  // Blockchain Consensus live state
  const [blockHeight, setBlockHeight] = useState(4092118);
  const blockRef = useRef(4092118);

  const [logs, setLogs] = useState<string[]>([
    `> INFO [${new Date(Date.now() - 10000).toLocaleTimeString()}] Sinkronisasi header: 100% selesai`,
    `> OK [${new Date(Date.now() - 5000).toLocaleTimeString()}] Blok #4092118 berhasil diverifikasi oleh node konsensus`,
  ]);

  // validation queue state (translated)
  const [queue, setQueue] = useState<QueueItem[]>([
    {
      id: 1,
      title: 'Kayu Berkelanjutan Batch #882',
      details: 'Asal: Cagar Alam Borneo â€¢ Protokol A2',
      icon: 'eco',
      iconColor: 'text-secondary',
      badgeText: 'Menunggu Konsensus',
      badgeClass: 'bg-secondary/15 text-secondary border-secondary/20',
      supplier: 'Borneo Rainforest Forestry Ltd',
      hash: '0x8f7c6b5a4d3c2b1a',
      docs: 5,
      consensusScore: 92,
    },
    {
      id: 2,
      title: 'Audit Mineral Fairtrade',
      details: 'Pemasok: Vertex Min â€¢ 12 Dokumen',
      icon: 'diamond',
      iconColor: 'text-amber-600',
      badgeText: 'Butuh Peninjauan',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      supplier: 'Vertex Mineral Group',
      hash: '0x3d9e8f7a6b5c4d3e',
      docs: 12,
      consensusScore: 45,
    },
    {
      id: 3,
      title: 'Log Output Desalinasi Air',
      details: 'Fasilitas: AquaPrime â€¢ Verifikasi Otomatis',
      icon: 'water_drop',
      iconColor: 'text-blue-600',
      badgeText: 'Memvalidasi...',
      badgeClass: 'bg-blue-50 text-blue-600 border-blue-200',
      supplier: 'AquaPrime Desalination Inc',
      hash: '0x7e2d1c4b5a6f8e9d',
      docs: 3,
      consensusScore: 78,
    },
  ]);

  // Selected queue item for detail modal
  const [selectedItem, setSelectedItem] = useState<QueueItem | null>(null);

  // Protocol proposal modal state
  const [proposalOpen, setProposalOpen] = useState(false);
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDesc, setProposalDesc] = useState('');
  const [proposalThreshold, setProposalThreshold] = useState(67);

  // Terminal scroll helper
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal on new log lines
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Blockchain Live Block height Simulator (optimized using useRef to avoid state dependency re-triggering)
  useEffect(() => {
    const interval = setInterval(() => {
      blockRef.current += 1;
      setBlockHeight(blockRef.current);
      setLogs((prevLogs) => [
        ...prevLogs,
        `> OK [${new Date().toLocaleTimeString()}] Blok #${blockRef.current} diverifikasi oleh validator konsensus`,
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Claim Earnings
  const handleClaim = () => {
    if (earnings === 0) {
      toast.error('Tidak ada pendapatan yang tersedia untuk diklaim.');
      return;
    }
    const claimedAmount = earnings;
    setEarnings(0);
    setPoolCapacity(0);
    setLogs((prev) => [
      ...prev,
      `> INFO [${new Date().toLocaleTimeString()}] Mengklaim hasil imbalan pool sebesar ${claimedAmount.toLocaleString()} ASRI ke Dompet`,
    ]);
    toast.success(`Berhasil mengklaim ${claimedAmount.toLocaleString()} ASRI ke dompet Anda!`);
  };

  // Verify queue item
  const handleVerifyItem = (id: number, verified: boolean) => {
    const item = queue.find((q) => q.id === id);
    if (!item) return;

    setQueue((prev) => prev.filter((q) => q.id !== id));
    setSelectedItem(null);

    const timeString = new Date().toLocaleTimeString();
    if (verified) {
      setLogs((prev) => [
        ...prev,
        `> SUKSES [${timeString}] Verifikasi selesai & data dicatat: ${item.title} dimasukkan ke Registri Mainnet`,
      ]);
      toast.success(`${item.title} berhasil diverifikasi!`);
    } else {
      setLogs((prev) => [
        ...prev,
        `> PERINGATAN [${timeString}] Audit ditolak untuk: ${item.title} karena kredensial dokumen tidak lengkap`,
      ]);
      toast.error(`${item.title} ditolak dan ditandai!`);
    }
  };

  // Submit protocol proposal
  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalTitle || !proposalDesc) {
      toast.error('Mohon isi semua bidang usulan proposal.');
      return;
    }

    const timeString = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      `> PROPOSAL [${timeString}] Proposal Protokol baru diajukan: "${proposalTitle}" (Batas Persetujuan: ${proposalThreshold}%)`,
    ]);

    toast.success('Proposal protokol berhasil dikirim!');
    setProposalTitle('');
    setProposalDesc('');
    setProposalOpen(false);
  };

  // Export audit trail log file
  const handleExportLogs = () => {
    const logHeader = `=== LOG VALIDATOR SISTEM ASRI ===
Tanggal Sesi: ${new Date().toLocaleString()}
Validator ID: ASRI-VAL-9840
Status Konsensus: Sinkron (Synchronized)
Tinggi Blok Terakhir: ${blockHeight}
----------------------------------\n`;
    
    const fileContent = logHeader + logs.join('\n') + '\n==================================';

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AuditTrail-Validator-ASRI-${blockHeight}.log`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Audit trail berhasil diunduh!');
  };

  return (
    <div className="w-full relative animate-fade-in">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
            Pusat Validator
          </h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Status jaringan dan gambaran umum konsensus verifikasi ekosistem ASRI.
          </p>
        </div>
        <div className="flex items-center gap-2 text-label-sm font-label-sm text-secondary bg-secondary/10 px-3 py-1.5 rounded-full border border-secondary/20 font-semibold self-start md:self-auto">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
          Mainnet Aktif
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-8">
        {/* Node Trust Score */}
        <div className="col-span-1 md:col-span-4 bg-surface rounded-xl border border-outline-variant p-6 shadow-[0px_10px_30px_rgba(6,78,59,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Skor Reputasi Node
              </h3>
              <Icon name="verified_user" size={20} className="text-secondary" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-primary">98.4</span>
              <span className="font-body-md text-secondary/60 font-semibold">/ 100</span>
            </div>
            <p className="text-sm text-on-surface-variant mt-2 font-medium">Top 5% validator aktif</p>
          </div>
          <div className="mt-6 h-16 bg-surface-container rounded flex items-end p-2 gap-1 opacity-80">
            <div className="w-1/6 bg-secondary/40 rounded-t h-[60%]"></div>
            <div className="w-1/6 bg-secondary/60 rounded-t h-[80%]"></div>
            <div className="w-1/6 bg-secondary/50 rounded-t h-[75%]"></div>
            <div className="w-1/6 bg-secondary/80 rounded-t h-full"></div>
            <div className="w-1/6 bg-secondary/70 rounded-t h-[85%]"></div>
            <div className="w-1/6 bg-secondary rounded-t h-[95%]"></div>
          </div>
        </div>

        {/* Reward Pool Earnings */}
        <div className="col-span-1 md:col-span-4 bg-surface rounded-xl border border-outline-variant p-6 shadow-[0px_10px_30px_rgba(6,78,59,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Pendapatan Epoch
              </h3>
              <button
                onClick={handleClaim}
                className="px-2.5 py-1 text-[11px] font-bold bg-secondary text-white rounded hover:bg-secondary-hover cursor-pointer active:scale-95"
              >
                Klaim Dompet
              </button>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-primary">{earnings.toLocaleString()}</span>
              <span className="font-body-md text-on-surface-variant font-semibold">ASRI</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-secondary font-semibold">
              <Icon name="trending_up" size={14} className="text-secondary" />
              <span>+12.5% vs epoch lalu</span>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-xs text-on-surface-variant mb-1 font-semibold">
              <span>Kapasitas Pool</span>
              <span>{poolCapacity}%</span>
            </div>
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
              <div
                className="bg-secondary h-full rounded-full duration-500"
                style={{ width: `${poolCapacity}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Network Consensus */}
        <div className="col-span-1 md:col-span-4 bg-surface rounded-xl border border-outline-variant p-6 shadow-[0px_10px_30px_rgba(6,78,59,0.02)] flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Status Konsensus
              </h3>
              <Icon name="hub" size={20} className="text-secondary" />
            </div>
            <p className="font-body-lg text-primary text-lg font-bold mb-1">Sinkron</p>
            <p className="text-sm text-on-surface-variant font-semibold">Tinggi Blok: {blockHeight.toLocaleString()}</p>
          </div>
          {/* Decorative Graphic */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/5 rounded-full border border-secondary/10 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 bg-secondary/10 rounded-full border border-secondary/20 flex items-center justify-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Queue & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Validation Queue (Product Verification) */}
        <div className="col-span-1 md:col-span-8 bg-surface rounded-xl border border-outline-variant overflow-hidden flex flex-col shadow-[0px_10px_30px_rgba(6,78,59,0.01)]">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <h3 className="font-headline-md text-lg text-primary font-bold">Antrean Verifikasi</h3>
            <button
              onClick={() => toast('Semua antrean sinkron.', { icon: 'ðŸ“‹' })}
              className="text-secondary font-label-sm text-sm hover:underline cursor-pointer font-semibold animate-pulse"
            >
              Lihat Semua
            </button>
          </div>
          <div className="flex-grow flex flex-col divide-y divide-outline-variant min-h-[300px]">
            {queue.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center text-on-surface-variant/40">
                <Icon name="inventory" size={40} className="text-on-surface-variant/40 mb-2" />
                <p className="mt-2 text-sm font-bold">Antrean verifikasi kosong</p>
              </div>
            ) : (
              queue.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="p-4 px-6 flex items-center justify-between hover:bg-surface-container-low cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-on-surface-variant">
                      <Icon name={item.icon} size={20} className={item.iconColor} />
                    </div>
                    <div>
                      <p className="font-body-md text-on-surface font-bold group-hover:text-secondary ">
                        {item.title}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5 font-medium">
                        {item.details}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 text-xs rounded font-semibold border ${item.badgeClass}`}>
                      {item.badgeText}
                    </span>
                    <Icon name="chevron_right" size={20} className="text-outline group-hover:text-secondary" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* System Logs / Quick Actions */}
        <div className="col-span-1 md:col-span-4 bg-surface rounded-xl border border-outline-variant p-6 flex flex-col shadow-[0px_10px_30px_rgba(6,78,59,0.01)]">
          <h3 className="font-headline-md text-lg text-primary font-bold mb-4 border-b border-outline-variant pb-2">
            Aksi Validator
          </h3>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setProposalOpen(true)}
              className="w-full text-left px-4 py-3 rounded border border-outline-variant hover:border-secondary hover:bg-secondary/5 flex items-center justify-between group cursor-pointer"
            >
              <span className="font-body-md font-bold text-on-surface group-hover:text-primary ">
                Usulkan Pembaruan Protokol
              </span>
              <Icon name="arrow_forward" size={20} className="text-on-surface-variant group-hover:text-secondary" />
            </button>
            <button
              onClick={handleExportLogs}
              className="w-full text-left px-4 py-3 rounded border border-outline-variant hover:border-secondary hover:bg-secondary/5 flex items-center justify-between group cursor-pointer"
            >
              <span className="font-body-md font-bold text-on-surface group-hover:text-primary ">
                Ekspor Audit Trail (.log)
              </span>
              <Icon name="download" size={20} className="text-on-surface-variant group-hover:text-secondary" />
            </button>
          </div>
          <div className="mt-8 md:mt-auto pt-6 border-t border-outline-variant">
            <p className="text-xs text-on-surface-variant mb-2 font-bold uppercase tracking-wide">
              Log Konsensus Terbaru (Sinkron)
            </p>
            <div className="bg-neutral p-3 rounded text-xs font-mono text-tertiary h-32 overflow-y-auto flex flex-col gap-1 shadow-inner scrollbar-thin">
              {logs.map((log, index) => (
                <div key={index} className="truncate select-all leading-normal whitespace-pre-wrap">
                  {log}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Verification Details Checklist Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay (Optimized solid color transition) */}
          <div
            onClick={() => setSelectedItem(null)}
            className="absolute inset-0 bg-black/50 "
          />
          {/* Modal Container */}
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 flex flex-col justify-between border border-outline-variant animate-scale-up z-10">
            <div>
              <div className="flex justify-between items-center border-b border-outline-variant pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                    <Icon name={selectedItem.icon} size={20} className="text-secondary" />
                  </div>
                  <h3 className="font-headline-md text-lg text-on-surface font-bold">
                    Checklist Verifikasi
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-slate-100 cursor-pointer"
                >
                  <Icon name="close" size={20} />
                </button>
              </div>

              {/* Checklist details */}
              <div className="space-y-4">
                <div className="p-3 bg-surface-container rounded-lg border border-outline-variant/50">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Batch Produk</p>
                  <p className="text-sm font-bold text-primary mt-0.5">{selectedItem.title}</p>
                  <p className="text-xs text-on-surface-variant mt-1 font-semibold">Pemasok Asal: {selectedItem.supplier}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border border-outline-variant/60 rounded-lg">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Kredensial Dokumen</span>
                    <p className="text-sm font-bold text-on-surface mt-0.5">{selectedItem.docs} berkas diunggah</p>
                  </div>
                  <div className="p-3 border border-outline-variant/60 rounded-lg">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Hash Blockchain</span>
                    <p className="text-xs font-mono font-bold text-secondary mt-1">{selectedItem.hash}</p>
                  </div>
                </div>

                {/* Consensus Score Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-on-surface-variant uppercase">Skor Kepatuhan Validasi</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedItem.consensusScore >= 80
                          ? 'bg-secondary/10 text-secondary'
                          : selectedItem.consensusScore >= 60
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-error-container text-on-error-container'
                      }`}
                    >
                      {selectedItem.consensusScore}% Integritas
                    </span>
                  </div>
                  <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden border border-outline-variant/40">
                    <div
                      className={`h-full rounded-full ${
                        selectedItem.consensusScore >= 80
                          ? 'bg-secondary'
                          : selectedItem.consensusScore >= 60
                          ? 'bg-blue-600'
                          : 'bg-error'
                      }`}
                      style={{ width: `${selectedItem.consensusScore}%` }}
                    />
                  </div>
                </div>

                {/* Validation Checklist points */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wide">
                    Poin Pemeriksaan Audit Otomatis
                  </span>
                  <div className="space-y-1.5 text-xs text-on-surface font-bold">
                    <div className="flex items-center gap-2">
                      <Icon name="check_circle" size={14} className="text-secondary" />
                      Tanda Tangan Kriptografi Digital Cocok
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="check_circle" size={14} className="text-secondary" />
                      Bukti Koordinat Geolokasi Asal Sesuai
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        name={selectedItem.consensusScore >= 70 ? 'check_circle' : 'warning'}
                        size={14}
                        className={selectedItem.consensusScore >= 70 ? 'text-secondary' : 'text-amber-500'}
                      />
                      Kepatuhan Aturan Smart Contract Rantai Blok
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-t border-outline-variant pt-4 mt-6">
              <button
                onClick={() => handleVerifyItem(selectedItem.id, false)}
                className="flex-1 py-2.5 border border-error text-error rounded-lg text-sm font-bold hover:bg-error/5 cursor-pointer active:scale-95"
              >
                Tolak Audit
              </button>
              <button
                onClick={() => handleVerifyItem(selectedItem.id, true)}
                className="flex-1 py-2.5 bg-secondary hover:bg-secondary-hover text-white rounded-lg text-sm font-bold cursor-pointer active:scale-95 shadow-sm"
              >
                Verifikasi Batch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Propose Protocol Update Form Modal */}
      {proposalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay (Optimized solid color transition) */}
          <div
            onClick={() => setProposalOpen(false)}
            className="absolute inset-0 bg-black/50 "
          />
          <form
            onSubmit={handleSubmitProposal}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 flex flex-col justify-between border border-outline-variant animate-scale-up z-10"
          >
            <div>
              <div className="flex justify-between items-center border-b border-outline-variant pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center">
                    <Icon name="note_add" size={20} className="text-secondary" />
                  </div>
                  <h3 className="font-headline-md text-lg text-on-surface font-bold">
                    Usulan Pembaruan Protokol
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setProposalOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-slate-100 cursor-pointer"
                >
                  <Icon name="close" size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="title" className="text-xs font-bold text-on-surface-variant uppercase">
                    Judul Usulan
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Contoh: Tingkatkan parameter finalitas blok A3"
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-secondary font-bold"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="desc" className="text-xs font-bold text-on-surface-variant uppercase">
                    Deskripsi / Penjelasan
                  </label>
                  <textarea
                    id="desc"
                    placeholder="Jelaskan parameter yang ingin diubah, optimasi gas, atau ambang batas persetujuan baru."
                    value={proposalDesc}
                    onChange={(e) => setProposalDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-outline-variant rounded-lg text-sm text-on-surface focus:outline-none focus:border-secondary min-h-[80px]"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-on-surface-variant uppercase">Batas Konsensus</span>
                    <span className="text-secondary">{proposalThreshold}% Persetujuan</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={proposalThreshold}
                    onChange={(e) => setProposalThreshold(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-on-surface-variant/60">
                    <span>Mayoritas Biasa (50%)</span>
                    <span>Bulat (100%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-t border-outline-variant pt-4 mt-6">
              <button
                type="button"
                onClick={() => setProposalOpen(false)}
                className="flex-1 py-2.5 border border-outline-variant text-on-surface-variant rounded-lg text-sm font-bold hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-bold cursor-pointer active:scale-95 shadow-sm"
              >
                Kirim Usulan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
});

ValidatorDashboard.displayName = 'ValidatorDashboard';

export default ValidatorDashboard;
