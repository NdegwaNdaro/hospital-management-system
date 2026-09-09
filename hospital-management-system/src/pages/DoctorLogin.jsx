import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DoctorLogin() {
  const [name, setName] = useState("");
  const [biometricCode, setBiometricCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginDoctor } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/doctors");
      const doctors = await response.json();

      const matched = doctors.find(
        (doctor) =>
          doctor.name?.toLowerCase().trim() === name.toLowerCase().trim() &&
          doctor.password === biometricCode
      );

      if (!matched) {
        setMessage("Doctor credentials not recognized. Please try again.");
        setLoading(false);
        return;
      }

      loginDoctor(matched);
      navigate("/doctor-dashboard");
    } catch (error) {
      setMessage("Unable to verify doctor details. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-[28px] border border-slate-200/80 bg-white/90 p-8 shadow-xl shadow-slate-300/20">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Doctor access only</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Fingerprint-style doctor login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Scan your biometric code and unlock your doctor dashboard securely.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-4xl text-white shadow-lg shadow-blue-500/30">
            🌀
          </div>
          <p className="text-sm font-semibold text-slate-900">Fingerprint login</p>
          <p className="mt-2 text-sm text-slate-600">
            Enter your secure biometric code to verify your identity and access your doctor workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <label className="block text-sm text-slate-600">
            <span className="mb-1 block font-medium text-slate-900">Doctor name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Dr. Amina"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block text-sm text-slate-600">
            <span className="mb-1 block font-medium text-slate-900">Biometric code</span>
            <input
              type="password"
              value={biometricCode}
              onChange={(e) => setBiometricCode(e.target.value)}
              required
              placeholder="Enter your secure code"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "Verifying..." : "Unlock my dashboard"}
          </button>

          {message ? <p className="text-sm text-red-600">{message}</p> : null}
        </form>
      </div>
    </div>
  );
}

export default DoctorLogin;
