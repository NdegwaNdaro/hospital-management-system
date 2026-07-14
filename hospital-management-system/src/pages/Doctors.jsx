import { useEffect, useState } from "react";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("/api/doctors")
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch(() => setDoctors([]));
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800">Doctors</h2>
        <p className="text-sm text-slate-500">All registered doctors in the system.</p>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Specialty</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id || doctor.id} className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium text-slate-800">{doctor.name}</td>
                <td className="px-4 py-3">{doctor.specialty}</td>
                <td className="px-4 py-3">{doctor.phone || "—"}</td>
                <td className="px-4 py-3">{doctor.email || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Doctors;