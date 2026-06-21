import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Camera } from 'lucide-react';
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs';
import type { User } from '../../../types/user';

const getStoredUser = (): User => {
  const stored = localStorage.getItem('user');
  return stored
    ? (JSON.parse(stored) as User)
    : { id: 'USR-8021', name: 'Seller', email: 'Seller1@asrii.com', role: 'seller' };
};

export const UserData = () => {
  const [user, setUser] = useState<User>(getStoredUser);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('File harus berupa gambar!');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Ukuran gambar maksimal 2MB!');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const updatedUser: User = {
        ...user,
        name: fullName,
        email: emailAddress,
        avatar: base64,
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success('Foto profil berhasil diperbarui!');

      setTimeout(() => {
        window.location.reload();
      }, 800);
    };
    reader.readAsDataURL(file);
  };

  // Form Field States
  const [fullName, setFullName] = useState(user.name);
  const [emailAddress, setEmailAddress] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState('081234567891');
  
  // Security Password States
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !emailAddress || !phoneNumber) {
      toast.error('Nama Lengkap, Email, dan Nomor Telepon wajib diisi!');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      toast.error('Kata sandi baru minimal 6 karakter!');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      toast.error('Konfirmasi kata sandi baru tidak cocok!');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const updatedUser: User = {
        ...user,
        name: fullName,
        email: emailAddress,
      };

      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsLoading(false);
      
      toast.success('Perubahan profil berhasil disimpan!');
      
      // Refresh after short delay so Navbar updates instantly
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }, 1200);
  };

  // Get Initials for Avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="space-y-6 w-full">
      
      {/* Header and Breadcrumbs */}
      <div>
        <Breadcrumbs items={[{ label: 'Profil Saya' }]} />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Pengaturan Profil</h1>
            <p className="text-slate-500 text-sm">Perbarui informasi data diri dan kata sandi Anda.</p>
          </div>
        </div>
      </div>

      {/* Two-Card Profile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT CARD: Profile Summary Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col items-center text-center space-y-4">
          {/* Large Initials Avatar Circle */}
          <div
            onClick={handleTriggerUpload}
            className="w-28 h-28 rounded-full bg-gradient-to-br from-secondary to-primary text-white flex items-center justify-center font-bold text-3xl shadow-lg border-4 border-slate-50 shrink-0 cursor-pointer group relative overflow-hidden transition-all hover:scale-105 active:scale-98"
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
            ) : (
              getInitials(user.name)
            )}
            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold">
              <Camera size={18} className="mb-1 text-secondary" />
              Ubah Foto
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />
          
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-800 text-lg">{user.name}</h3>
            <p className="text-slate-400 text-xs font-medium">{user.email}</p>
          </div>

          <span className="inline-flex items-center px-3.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider bg-emerald-50 border-emerald-200 text-emerald-600">
            {user.role || 'seller'}
          </span>

          <div className="w-full border-t border-slate-50 pt-4 flex justify-between text-xs font-bold text-slate-400">
            <span>Terdaftar Sejak</span>
            <span className="text-slate-600">21 Jun 2026</span>
          </div>
        </div>

        {/* RIGHT CARD: Profile Details Form Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:col-span-2">
          <form onSubmit={handleSaveChanges} className="space-y-6">
            
            {/* PERSONAL DETAILS SECTION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                <div className="w-1 h-4 bg-primary rounded-full" />
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Informasi Data Diri
                </h4>
              </div>

              {/* Full Name input (full width) */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama Lengkap"
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-primary transition-all font-semibold text-slate-700"
                />
              </div>

              {/* Email and Phone input (side by side) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="Alamat Email"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-primary transition-all font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Nomor Telepon"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-primary transition-all font-semibold text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* SECURITY & PASSWORD SECTION */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                <div className="w-1 h-4 bg-primary rounded-full" />
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Keamanan & Kata Sandi
                </h4>
              </div>

              {/* Old Password (full width) */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Kata Sandi Lama
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Masukkan kata sandi lama jika ingin diubah"
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-primary transition-all font-semibold text-slate-700"
                />
              </div>

              {/* New Password & Confirm New Password (side by side) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-primary transition-all font-semibold text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Konfirmasi Kata Sandi Baru
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi baru"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-primary transition-all font-semibold text-slate-700"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-5 border-t border-slate-100">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-md shadow-primary/10 transition-all duration-200 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
};

export default UserData;
