export default function Forbidden() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-5 bg-light">
      <div className="flex gap-5 items-center justify-center">
        <img
          src="/src/assets/EF_icon.svg"
          alt="EF Icon"
          className="w-24 h-24 mb-4"
        />
        <p className="text-6xl lg:text-7xl font-serif text-dark mb-4">403</p>
      </div>
      <h1 className="text-2xl font-medium text-dark mb-3">Akses Ditolak</h1>
      <p className="text-sm text-dark max-w-xs lg:max-w-sm leading-relaxed">
        Maaf, undangan ini bersifat personal. Silakan gunakan link undangan yang
        telah dikirimkan kepada Anda.
      </p>
    </div>
  );
}
