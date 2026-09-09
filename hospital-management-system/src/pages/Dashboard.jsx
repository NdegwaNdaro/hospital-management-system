import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";

function BarChartCard({ title, description, data }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{item.label}</span>
              <span className="text-slate-500">{item.value}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{ width: `${(item.value / maxValue) * 100}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalNurses: 0,
    appointmentsToday: 0,
    revenue: 0
  });
  const [dateTime, setDateTime] = useState(new Date());
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [staff, setStaff] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const [dashboardResponse, patientsResponse, doctorsResponse, nursesResponse, staffResponse, appointmentsResponse] = await Promise.all([
          fetch("/api/dashboard"),
          fetch("/api/patients"),
          fetch("/api/doctors"),
          fetch("/api/nurses"),
          fetch("/api/staff"),
          fetch("/api/appointments")
        ]);

        const [dashboardData, patientsData, doctorsData, nursesData, staffData, appointmentsData] = await Promise.all([
          dashboardResponse.json(),
          patientsResponse.json(),
          doctorsResponse.json(),
          nursesResponse.json(),
          staffResponse.json(),
          appointmentsResponse.json()
        ]);

        if (isMounted) {
          setStats(dashboardData);
          setPatients(patientsData);
          setDoctors(doctorsData);
          setNurses(nursesData);
          setStaff(staffData);
          setAppointments(appointmentsData);
        }
      } catch {
        if (isMounted) {
          setStats({
            totalPatients: 0,
            totalDoctors: 0,
            totalNurses: 0,
            appointmentsToday: 0,
            revenue: 0
          });
          setPatients([]);
          setDoctors([]);
          setNurses([]);
          setStaff([]);
          setAppointments([]);
        }
      }
    };

    loadDashboard();
    const intervalId = window.setInterval(loadDashboard, 10000);
    const clockInterval = window.setInterval(() => setDateTime(new Date()), 1000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      window.clearInterval(clockInterval);
    };
  }, []);

  const dashboardStats = [
    { title: "Total Patients", value: stats.totalPatients },
    { title: "Doctors", value: stats.totalDoctors },
    { title: "Nurses", value: stats.totalNurses },
    { title: "Appointments Today", value: stats.appointmentsToday },
    { title: "Available Ambulances", value: "14" },
    { title: "Emergency Cases", value: "18" },
    { title: "Laboratory Tests", value: "76" },
    { title: "Today's Revenue", value: `$${stats.revenue.toLocaleString()}` }
  ];

  const resourceData = [
    { label: "Patients", value: patients.length || stats.totalPatients, color: "#2563eb" },
    { label: "Doctors", value: doctors.length || stats.totalDoctors, color: "#0f766e" },
    { label: "Nurses", value: nurses.length || stats.totalNurses, color: "#7c3aed" },
    { label: "Staff", value: staff.length, color: "#ea580c" }
  ];

  const patientStatusData = Object.entries(
    patients.reduce((acc, patient) => {
      const key = patient.status || "Registered";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).map(([label, value]) => ({ label, value, color: "#38bdf8" }));

  const appointmentStatusData = Object.entries(
    appointments.reduce((acc, appointment) => {
      const key = appointment.status || "Pending";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).map(([label, value]) => ({ label, value, color: "#14b8a6" }));

  const specialtyData = Object.entries(
    doctors.reduce((acc, doctor) => {
      const key = doctor.specialty || "General";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).map(([label, value]) => ({ label, value, color: "#8b5cf6" }));

  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-slate-200/80 bg-gradient-to-br from-blue-600 to-sky-500 p-6 text-white shadow-lg shadow-blue-600/20 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-blue-100">Care Command Center</p>
            <h2 className="mt-2 text-3xl font-semibold">Welcome back to your hospital dashboard</h2>
            <p className="mt-3 max-w-2xl text-sm text-blue-50/90 sm:text-base">
              Monitor patients, doctors, services, and operations from a single polished view.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-sm text-blue-100">Live updates</p>
            <p className="text-xl font-semibold"></p>
            <p className="mt-2 text-sm text-blue-100/90">
              {dateTime.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>
            <p className="text-lg font-semibold">
              {dateTime.toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit"
              })}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <BarChartCard
          title="Resource overview"
          description="Live counts for patients, doctors, nurses, and staff"
          data={resourceData}
        />

        <BarChartCard
          title="Patient status"
          description="Changes instantly as new patients are added"
          data={patientStatusData}
        />

        <BarChartCard
          title="Appointment status"
          description="Tracks confirmation and pending appointments"
          data={appointmentStatusData}
        />

        <BarChartCard
          title="Doctor specialties"
          description="Breakdown of doctor expertise across the hospital"
          data={specialtyData}
        />
      </div>
    </div>
  );
}

export default Dashboard;