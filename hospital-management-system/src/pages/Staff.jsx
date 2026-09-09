import { FaCalendarAlt, FaUsers, FaUserClock } from "react-icons/fa";

const workforce = [
  ["Clinical workforce", "Doctors, nurses, clinicians and allied health", "48", FaUsers],
  ["On duty today", "Staff rostered across all departments", "31", FaUserClock],
  ["Open shifts", "Coverage gaps requiring assignment", "4", FaCalendarAlt]
];

function Staff() {
  return (
    <div className="space-y-6">
      <div><p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">People operations</p><h2 className="mt-1 text-2xl font-semibold text-slate-800">Staff & workforce</h2><p className="mt-1 text-sm text-slate-500">Employee records, roles, attendance, shifts, leave and payroll readiness.</p></div>
      <div className="grid gap-4 md:grid-cols-3">{workforce.map(([title, description, value, Icon]) => <div key={title} className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"><Icon className="text-blue-600" /><p className="mt-4 text-sm text-slate-500">{title}</p><p className="mt-1 text-3xl font-semibold text-slate-800">{value}</p><p className="mt-1 text-xs text-slate-400">{description}</p></div>)}</div>
      <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-lg font-semibold text-slate-800">Workforce controls</h3><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{["Employee records", "Departments & roles", "Attendance & shifts", "Leave management", "Payroll & payslips", "PAYE & NSSF", "SHIF requirements", "Performance management"].map((item) => <div key={item} className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">{item}</div>)}</div></div>
    </div>
  );
}

export default Staff;
