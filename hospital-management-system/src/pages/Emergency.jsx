import { FaExclamationTriangle, FaHeartbeat } from "react-icons/fa";

const cases = [
	["EM-2041", "High", "Chest pain", "Triage room 2"],
	["EM-2042", "Medium", "Road traffic injury", "Treatment bay 4"],
	["EM-2043", "Low", "Fever and dehydration", "Waiting area"]
];

function Emergency() {
	return (
		<div className="space-y-6">
			<div><p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-600">Emergency care</p><h2 className="mt-1 text-2xl font-semibold text-slate-800">Casualty command</h2><p className="mt-1 text-sm text-slate-500">Priority triage, treatment tracking, investigations and admission handoffs.</p></div>
			<div className="grid gap-4 md:grid-cols-3"><div className="rounded-[20px] bg-rose-600 p-5 text-white shadow-lg shadow-rose-600/20"><FaExclamationTriangle /><p className="mt-4 text-sm text-rose-100">Critical cases</p><p className="text-3xl font-semibold">3</p></div><div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"><FaHeartbeat className="text-teal-600" /><p className="mt-4 text-sm text-slate-500">Patients in care</p><p className="text-3xl font-semibold text-slate-800">18</p></div><div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Average wait</p><p className="mt-2 text-3xl font-semibold text-slate-800">12 min</p><p className="mt-1 text-xs text-teal-600">Within target</p></div></div>
			<div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4"><h3 className="font-semibold text-slate-800">Live emergency queue</h3></div><div className="divide-y divide-slate-100">{cases.map(([id, priority, complaint, location]) => <div key={id} className="grid gap-2 px-5 py-4 sm:grid-cols-4 sm:items-center"><span className="font-medium text-slate-800">{id}</span><span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${priority === "High" ? "bg-rose-50 text-rose-700" : priority === "Medium" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{priority} priority</span><span className="text-sm text-slate-600">{complaint}</span><span className="text-sm text-slate-400">{location}</span></div>)}</div></div>
		</div>
	);
}

export default Emergency;
