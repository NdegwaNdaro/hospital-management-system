import { useEffect, useState } from "react";

const getCurrentTimeValue = () => {
  const now = new Date();
  return now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
};

const getShiftEndValue = (startTime) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  const endDate = new Date();
  endDate.setHours(hours, minutes, 0, 0);
  endDate.setHours(endDate.getHours() + 8);

  return endDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
};

const initialForm = {
  name: "",
  specialty: "",
  phone: "",
  email: "",
  password: "",
  shiftStart: "",
  shiftEnd: "",
  reportTime: ""
};

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [liveClock, setLiveClock] = useState(getCurrentTimeValue());
  const [accessForm, setAccessForm] = useState({ name: "", biometricCode: "" });
  const [authenticatedDoctor, setAuthenticatedDoctor] = useState(null);
  const [accessMessage, setAccessMessage] = useState("");

  useEffect(() => {
    fetch("/api/doctors")
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch(() => setDoctors([]));
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLiveClock(getCurrentTimeValue());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleAccessChange = (event) => {
    const { name, value } = event.target;
    setAccessForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleAccessSubmit = (event) => {
    event.preventDefault();

    const matchedDoctor = doctors.find(
      (doctor) =>
        doctor.name?.toLowerCase() === accessForm.name.trim().toLowerCase() &&
        doctor.password === accessForm.biometricCode
    );

    if (matchedDoctor) {
      setAuthenticatedDoctor(matchedDoctor);
      setAccessMessage("Access granted. Doctor profile unlocked.");
    } else {
      setAuthenticatedDoctor(null);
      setAccessMessage("Access denied. Please use the correct doctor credentials.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        ...formData,
        shiftStart: formData.shiftStart || liveClock,
        shiftEnd: formData.shiftEnd || getShiftEndValue(liveClock),
        reportTime: formData.reportTime || liveClock
      };

      const response = await fetch("/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Unable to save doctor");
      }

      const createdDoctor = await response.json();
      setDoctors((previous) => [createdDoctor, ...previous]);
      setFormData(initialForm);
      setMessage(`Doctor access saved for ${createdDoctor.name}.`);
    } catch {
      setMessage("Doctor access could not be saved. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800">Doctors</h2>
        <p className="text-sm text-slate-500">Manage doctor access, shift timing, and work-report tracking.</p>
      </div>

      <section className="rounded-[20px] border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Doctor biometric access</h3>
            <p className="text-sm text-slate-600">
              Doctors use their secure code to unlock their profile and access the system.
            </p>
          </div>
          <div className="rounded-full bg-white px-3 py-1 text-sm font-medium text-emerald-700">
            Secure access
          </div>
        </div>

        <form onSubmit={handleAccessSubmit} className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="text-sm text-slate-600">
            <span className="mb-1 block">Doctor name</span>
            <input
              name="name"
              value={accessForm.name}
              onChange={handleAccessChange}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Enter doctor name"
            />
          </label>
          <label className="text-sm text-slate-600">
            <span className="mb-1 block">Biometric code / password</span>
            <input
              name="biometricCode"
              value={accessForm.biometricCode}
              onChange={handleAccessChange}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Enter saved password"
            />
          </label>
          <div className="flex items-end">
            <button type="submit" className="w-full rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white">
              Unlock profile
            </button>
          </div>
        </form>

        {accessMessage ? <p className="mt-3 text-sm text-slate-700">{accessMessage}</p> : null}

        {authenticatedDoctor ? (
          <div className="mt-4 rounded-[16px] border border-emerald-200 bg-white p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Access granted</p>
                <h4 className="text-xl font-semibold text-slate-800">{authenticatedDoctor.name}</h4>
              </div>
              <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                Active doctor profile
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Specialty</p>
                <p className="mt-1 font-semibold text-slate-800">{authenticatedDoctor.specialty || "—"}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Phone</p>
                <p className="mt-1 font-semibold text-slate-800">{authenticatedDoctor.phone || "—"}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
                <p className="mt-1 font-semibold text-slate-800">{authenticatedDoctor.email || "—"}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Password</p>
                <p className="mt-1 font-semibold text-slate-800">{authenticatedDoctor.password || "—"}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Shift Start</p>
                <p className="mt-1 font-semibold text-slate-800">{authenticatedDoctor.shiftStart || liveClock}</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Shift End</p>
                <p className="mt-1 font-semibold text-slate-800">{authenticatedDoctor.shiftEnd || getShiftEndValue(liveClock)}</p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Report Time</p>
                <p className="mt-1 font-semibold text-slate-800">{authenticatedDoctor.reportTime || liveClock}</p>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <form onSubmit={handleSubmit} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="text-sm text-slate-600">
            <span className="mb-1 block">Name</span>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Dr. Jane"
            />
          </label>
          <label className="text-sm text-slate-600">
            <span className="mb-1 block">Specialty</span>
            <input
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Cardiology"
            />
          </label>
          <label className="text-sm text-slate-600">
            <span className="mb-1 block">Phone</span>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="0712 345 678"
            />
          </label>
          <label className="text-sm text-slate-600">
            <span className="mb-1 block">Email</span>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="doctor@hospital.com"
            />
          </label>
          <label className="text-sm text-slate-600">
            <span className="mb-1 block">Password</span>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Set access password"
            />
          </label>
          <label className="text-sm text-slate-600">
            <span className="mb-1 block">Shift Start</span>
            <input
              name="shiftStart"
              type="time"
              value={formData.shiftStart}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="text-sm text-slate-600">
            <span className="mb-1 block">Shift End</span>
            <input
              name="shiftEnd"
              type="time"
              value={formData.shiftEnd}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="text-sm text-slate-600">
            <span className="mb-1 block">Report Time</span>
            <input
              name="reportTime"
              type="time"
              value={formData.reportTime}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white">
            Save doctor access
          </button>
          {message ? <p className="text-sm text-slate-600">{message}</p> : null}
        </div>
      </form>

      <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Specialty</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Password</th>
              <th className="px-4 py-3">Shift Start</th>
              <th className="px-4 py-3">Shift End</th>
              <th className="px-4 py-3">Report Time</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id || doctor.id} className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium text-slate-800">{doctor.name}</td>
                <td className="px-4 py-3">{doctor.specialty}</td>
                <td className="px-4 py-3">{doctor.phone || "—"}</td>
                <td className="px-4 py-3">{doctor.password || "—"}</td>
                <td className="px-4 py-3">{liveClock}</td>
                <td className="px-4 py-3">{getShiftEndValue(liveClock)}</td>
                <td className="px-4 py-3">{liveClock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Doctors;