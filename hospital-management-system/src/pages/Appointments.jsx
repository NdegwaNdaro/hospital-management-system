import { useEffect, useState } from "react";

const initialForm = { patientName: "", doctor: "", time: "", status: "Pending" };

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/appointments").then((response) => response.json()),
      fetch("/api/doctors").then((response) => response.json()),
      fetch("/api/patients").then((response) => response.json())
    ])
      .then(([appointmentData, doctorData, patientData]) => {
        setAppointments(appointmentData);
        setDoctors(doctorData);
        setPatients(patientData);
      })
      .catch(() => setMessage("Unable to load appointment information."));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const appointment = await response.json();

      if (!response.ok) throw new Error(appointment.error);

      setAppointments((current) => [appointment, ...current]);
      setForm(initialForm);
      setMessage("Appointment saved successfully.");
    } catch (error) {
      setMessage(error.message || "Unable to save the appointment.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800">Appointments</h2>
        <p className="text-sm text-slate-500">Book patients with an available doctor.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="text-sm text-slate-600">
            <span className="mb-1 block">Patient</span>
            <select
              required
              value={form.patientName}
              onChange={(event) => setForm({ ...form, patientName: event.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            >
              <option value="">Select patient</option>
              {patients.map((patient) => <option key={patient._id || patient.id} value={patient.name}>{patient.name}</option>)}
            </select>
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-1 block">Doctor</span>
            <select
              required
              value={form.doctor}
              onChange={(event) => setForm({ ...form, doctor: event.target.value })}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            >
              <option value="">Select doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id || doctor.id} value={doctor.name}>
                  {doctor.name} — {doctor.specialty}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-1 block">Time</span>
            <input
              required
              type="time"
              value={form.time}
              onChange={(event) => setForm({ ...form, time: event.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>

          <div className="flex items-end">
            <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
              Book appointment
            </button>
          </div>
        </div>
        {message ? <p className="mt-3 text-sm text-slate-600">{message}</p> : null}
      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr><th className="px-4 py-3">Patient</th><th className="px-4 py-3">Doctor</th><th className="px-4 py-3">Time</th><th className="px-4 py-3">Status</th></tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id || appointment.id} className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium text-slate-800">{appointment.patientName}</td>
                <td className="px-4 py-3">{appointment.doctor}</td>
                <td className="px-4 py-3">{appointment.time}</td>
                <td className="px-4 py-3">{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;
