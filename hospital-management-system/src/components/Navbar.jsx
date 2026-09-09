function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200/80 bg-white/70 px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-medium text-blue-600">Hospital Management Panel</p>
        <h3 className="text-xl font-semibold text-slate-800">Good morning, Dr. Ada</h3>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            AD
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">Administrator</p>
            <p className="text-xs text-slate-500">Operations</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;