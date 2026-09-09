import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DoctorDashboard() {
  const { doctor, logout } = useAuth();
  const [liveClock, setLiveClock] = useState(() => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }));
  const navigate = useNavigate();

  useEffect(() => {
    if (!doctor) {
      navigate("/doctor-login");
      return;
    }
  }, [doctor, navigate]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLiveClock(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  if (!doctor) {
    return null;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white shadow-xl shadow-slate-700/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Doctor dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold">Welcome back, {doctor.name}</h1>
            <p className="mt-2 text-sm text-slate-200">
              This space is reserved for authenticated doctors only. Your profile and shift details are displayed here.
            </p>
          </div>
          <div className="rounded-3xl bg-white/10 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Current time</p>
            <p className="mt-1 text-xl font-semibold text-white">{liveClock}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Specialty</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">{doctor.specialty || "General"}</p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Shift start</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">{doctor.shiftStart || liveClock}</p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Shift end</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">{doctor.shiftEnd || "Not set"}</p>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Access details</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Email</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{doctor.email || "—"}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Phone</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{doctor.phone || "—"}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Report time</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{doctor.reportTime || "—"}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Role</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">Doctor</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          onClick={() => navigate("/doctor-login")}
          className="rounded-2xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900"
        >
          Return to login
        </button>
        <button
          onClick={() => {
            logout();
            navigate("/doctor-login");
          }}
          className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default DoctorDashboard;
