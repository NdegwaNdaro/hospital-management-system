import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";

function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalNurses: 0,
    appointmentsToday: 0,
    revenue: 0
  });

  useEffect(() => {
    fetch("/api/dashboard")
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch(() => setStats({
        totalPatients: 0,
        totalDoctors: 0,
        totalNurses: 0,
        appointmentsToday: 0,
        revenue: 0
      }));
  }, []);

  const dashboardStats = [
    { title: "Total Patients", value: stats.totalPatients, icon: "🧑‍⚕️", accent: "from-cyan-500 to-blue-600", chip: "Admissions" },
    { title: "Doctors", value: stats.totalDoctors, icon: "🩺", accent: "from-emerald-500 to-teal-600", chip: "On shift" },
    { title: "Nurses", value: stats.totalNurses, icon: "👩‍⚕️", accent: "from-violet-500 to-indigo-600", chip: "Care team" },
    { title: "Appointments Today", value: stats.appointmentsToday, icon: "🗓️", accent: "from-amber-500 to-orange-600", chip: "Scheduled" },
    { title: "Available Ambulances", value: "14", icon: "🚑", accent: "from-rose-500 to-red-600", chip: "Ready" },
    { title: "Emergency Cases", value: "18", icon: "🚨", accent: "from-fuchsia-500 to-pink-600", chip: "Critical" },
    { title: "Laboratory Tests", value: "76", icon: "🧪", accent: "from-sky-500 to-cyan-600", chip: "Processed" },
    { title: "Today's Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: "💰", accent: "from-lime-500 to-green-600", chip: "Collected" }
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-[linear-gradient(135deg,#0f4c81_0%,#1d78b5_45%,#2ec5d3_100%)] p-6 text-white shadow-[0_24px_60px_-25px_rgba(15,76,129,0.45)] sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_38%)]" />
        <div className="absolute -right-8 top-6 h-28 w-28 rounded-full border border-white/20 bg-white/10 blur-2xl" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-50">
                Care Command Center
              </span>
              <span className="rounded-full border border-emerald-200/40 bg-emerald-400/20 px-3 py-1 text-xs font-medium text-emerald-50">
                24/7 monitoring
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Welcome back to your hospital dashboard</h2>
            <p className="mt-3 text-sm text-blue-50/90 sm:text-base">
              Track patients, clinicians, diagnostics, and operations from one calm, professional view.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-slate-950/20 p-4 backdrop-blur-sm">
            <p className="text-sm text-blue-100">Critical alerts</p>
            <div className="mt-2 flex items-end gap-2">
              <p className="text-3xl font-semibold">3</p>
              <p className="text-sm text-blue-50/80">pending actions</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs">ER queue</span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs">Lab pending</span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs">ICU review</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            accent={stat.accent}
            chip={stat.chip}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;