import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Store, Landmark, CreditCard, Phone, FileText, X, Edit, AlertCircle } from 'lucide-react';
import { FormInput } from '../../../components/ui/FormInput';
import { TextAreaInput } from '../../../components/ui/TextAreaInput';
import { FileUpload } from '../../../components/ui/FileUpload';
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs';
import { sellerRegisterSchema } from '../../../schemas/authSchema';
import type { SellerRegisterInput } from '../../../schemas/authSchema';

interface StoreData {
  businessName: string;
  phone: string;
  businessAddress: string;
  bankName: string;
  bankAccount: string;
  logo?: string;
  certification?: string;
  status: 'active' | 'pending' | 'draft';
}

export const CreateStore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [store, setStore] = useState<StoreData | null>({
    businessName: 'Tani Makmur Utama',
    phone: '081234567891',
    businessAddress: 'Jl. Pertanian Raya No. 45, Kecamatan Cisarua, Bogor',
    bankName: 'Bank Mandiri',
    bankAccount: '1330099887766',
    status: 'pending',
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<SellerRegisterInput>({
    resolver: zodResolver(sellerRegisterSchema),
    defaultValues: {
      name: 'Verified User',
      email: 'verified@user.com',
      password: 'password123',
      confirmPassword: 'password123',
    }
  });

  const onSubmit = async (data: SellerRegisterInput) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStore({
        businessName: data.businessName,
        phone: data.phone,
        businessAddress: data.businessAddress,
        bankName: data.bankName,
        bankAccount: data.bankAccount,
        status: 'pending',
      });
      toast.success('Pembaruan data toko berhasil disimpan! Status: Menunggu Verifikasi.');
      setIsModalOpen(false);
    } catch {
      toast.error('Gagal menyimpan data toko. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      
      {/* Header Title */}
      <div>
        <Breadcrumbs items={[{ label: 'Buat Toko' }]} />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Kelola Toko</h1>
            <p className="text-slate-500 text-sm">Kelola profil usaha tani dan rekening pencairan dana toko Anda.</p>
          </div>
        </div>
      </div>

      {/* Verification Warning Alert */}
      {store && store.status === 'pending' && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-800 shadow-sm">
          <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="text-sm font-bold">Menunggu Verifikasi Administrasi</h4>
            <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
              Tim admin ASRI sedang meninjau dokumen pendaftaran dan rekening bank Anda. Proses verifikasi biasanya memakan waktu maksimal 1x24 jam. Anda masih dapat mengelola stok produk selagi menunggu verifikasi.
            </p>
          </div>
        </div>
      )}

      {/* Main Table Card (Reference Style) */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Table Header Bar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
              Data Usaha Toko
            </h2>
          </div>
          <button
            onClick={() => {
              if (store) {
                setValue('businessName', store.businessName);
                setValue('phone', store.phone);
                setValue('businessAddress', store.businessAddress);
                setValue('bankName', store.bankName);
                setValue('bankAccount', store.bankAccount);
              }
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-xl font-bold text-sm sm:text-base shadow-md shadow-primary/10 transition-all duration-200 cursor-pointer self-start sm:self-auto active:scale-[0.98]"
          >
            <Edit size={16} />
            {store ? 'Edit Detail Toko' : 'Daftarkan Toko'}
          </button>
        </div>

        {/* Table Details */}
        {store ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-100 text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="py-5 px-6 w-1/3">Informasi</th>
                  <th className="py-5 px-6">Detail Toko</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-6 text-slate-400 font-extrabold uppercase text-xs sm:text-sm tracking-wider">Nama Toko</td>
                  <td className="py-5 px-6 font-extrabold text-slate-900 text-sm sm:text-base">{store.businessName}</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-6 text-slate-400 font-extrabold uppercase text-xs sm:text-sm tracking-wider">Nomor Telepon</td>
                  <td className="py-5 px-6 text-slate-800 text-sm sm:text-base font-bold">{store.phone}</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-6 text-slate-400 font-extrabold uppercase text-xs sm:text-sm tracking-wider">Alamat Lengkap</td>
                  <td className="py-5 px-6 text-slate-600 text-sm sm:text-base font-semibold leading-relaxed">{store.businessAddress}</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-6 text-slate-400 font-extrabold uppercase text-xs sm:text-sm tracking-wider">Rekening Pencairan</td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3.5 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-xs sm:text-sm font-bold border border-slate-200">
                        {store.bankName}
                      </span>
                      <span className="font-extrabold text-slate-850 text-sm sm:text-base">{store.bankAccount}</span>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-6 text-slate-400 font-extrabold uppercase text-xs sm:text-sm tracking-wider">Status Akun</td>
                  <td className="py-5 px-6">
                    <span
                      className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold border uppercase tracking-wider ${
                        store.status === 'active'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                          : store.status === 'pending'
                          ? 'bg-amber-50 border-amber-200 text-amber-600 animate-pulse'
                          : 'bg-slate-50 border-slate-200 text-slate-500'
                      }`}
                    >
                      {store.status === 'active'
                        ? 'Aktif'
                        : store.status === 'pending'
                        ? 'Menunggu Verifikasi'
                        : 'Draft'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center bg-white">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Store size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-700">Belum Ada Toko Terdaftar</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Anda harus mendaftarkan identitas usaha tani Anda terlebih dahulu sebelum dapat mengunggah katalog produk dan menerima pesanan pembeli.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* EDIT STORE FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] z-10 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Edit Informasi Usaha</h2>
                <p className="text-xs text-slate-500">Perbarui identitas usaha tani dan rekening penampungan.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 text-slate-500 rounded-xl transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Form Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              <form id="edit-store-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Shop details */}
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-1.5">
                    <h3 className="text-xs font-extrabold text-primary flex items-center gap-1.5 uppercase tracking-wider">
                      <Store size={14} />
                      Detail Toko
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Nama Toko *"
                      id="businessName"
                      placeholder="Contoh: Tani Makmur Utama"
                      register={register('businessName')}
                      error={errors.businessName?.message}
                    />

                    <FormInput
                      label="Nomor Telepon Toko *"
                      id="phone"
                      placeholder="Contoh: 081234567890"
                      icon={<Phone size={14} className="text-slate-400" />}
                      register={register('phone')}
                      error={errors.phone?.message}
                    />
                  </div>

                  <TextAreaInput
                    label="Alamat Toko Lengkap *"
                    id="businessAddress"
                    placeholder="Masukkan alamat toko fisik atau perkebunan Anda secara lengkap..."
                    register={register('businessAddress')}
                    error={errors.businessAddress?.message}
                  />
                </div>

                {/* Payment info */}
                <div className="space-y-4 pt-2">
                  <div className="border-b border-slate-100 pb-1.5">
                    <h3 className="text-xs font-extrabold text-primary flex items-center gap-1.5 uppercase tracking-wider">
                      <Landmark size={14} />
                      Rekening Pembayaran
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormInput
                      label="Nama Bank *"
                      id="bankName"
                      placeholder="Contoh: Bank Mandiri / BCA"
                      icon={<Landmark size={14} className="text-slate-400" />}
                      register={register('bankName')}
                      error={errors.bankName?.message}
                    />

                    <FormInput
                      label="Nomor Rekening *"
                      id="bankAccount"
                      placeholder="Contoh: 1234567890"
                      icon={<CreditCard size={14} className="text-slate-400" />}
                      register={register('bankAccount')}
                      error={errors.bankAccount?.message}
                    />
                  </div>
                </div>

                {/* Optional uploads */}
                <div className="space-y-4 pt-2">
                  <div className="border-b border-slate-100 pb-1.5">
                    <h3 className="text-xs font-extrabold text-primary flex items-center gap-1.5 uppercase tracking-wider">
                      <FileText size={14} />
                      Dokumen Verifikasi (Opsional)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Controller
                      name="name"
                      control={control}
                      render={() => (
                        <FileUpload
                          label="Logo Toko / Profil Foto"
                          id="logo"
                          accept="image/*"
                          onChange={(file) => console.log('Logo selected:', file)}
                        />
                      )}
                    />

                    <Controller
                      name="email"
                      control={control}
                      render={() => (
                        <FileUpload
                          label="Foto Sertifikat Tani / NIB (Jika Ada)"
                          id="certification"
                          accept="image/*,application/pdf"
                          onChange={(file) => console.log('Cert selected:', file)}
                        />
                      )}
                    />
                  </div>
                </div>

              </form>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-3xl">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-xl text-sm font-bold transition-colors cursor-pointer"
              >
                Batalkan
              </button>
              <button
                type="submit"
                form="edit-store-form"
                disabled={isLoading}
                className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-bold shadow-md shadow-primary/10 transition-colors cursor-pointer"
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CreateStore;
