import { useEffect, useState } from "react";

function Nurses() {
  const [nurses, setNurses] = useState([]);

  useEffect(() => {
    fetch("/api/nurses")
      .then((response) => response.json())
      .then((data) => setNurses(data))
      .catch(() => setNurses([]));
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800">Nurse Management</h2>
        <p className="text-sm text-slate-500">All nurses and support staff on duty.</p>
      </div>

      <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Shift</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {nurses.map((nurse) => (
              <tr key={nurse._id || nurse.id} className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium text-slate-800">{nurse.name}</td>
                <td className="px-4 py-3">{nurse.shift}</td>
                <td className="px-4 py-3">Active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Nurses;