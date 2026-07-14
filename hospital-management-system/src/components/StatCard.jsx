function StatCard({ title, value, icon, accent, chip }) {
  return (
    <div className="rounded-[22px] border border-slate-200/80 bg-white/95 p-5 shadow-[0_16px_45px_-24px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_rgba(15,23,42,0.35)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{title}</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-800">{value}</h2>
        </div>
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-xl text-white shadow-lg`}>
          <span aria-hidden="true">{icon}</span>
        </div>
      </div>
      {chip && (
        <div className="mt-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
          {chip}
        </div>
      )}
    </div>
  );
}

export default StatCard;