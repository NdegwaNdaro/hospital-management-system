function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-800">{value}</h2>
    </div>
  );
}

export default StatCard;