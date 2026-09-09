import { FaFileMedical, FaXRay } from "react-icons/fa";

const worklist = [
	["RAD-118", "Mary Wanjiku", "Chest X-ray", "Awaiting report"],
	["RAD-119", "John Kamau", "Abdominal ultrasound", "In progress"],
	["RAD-120", "Amina Hassan", "CT head", "Verified"]
];

function Radiology() {
	return (
		<div className="space-y-6">
			<div><p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Imaging services</p><h2 className="mt-1 text-2xl font-semibold text-slate-800">Radiology worklist</h2><p className="mt-1 text-sm text-slate-500">Coordinate requests, imaging procedures, reporting and EMR-linked results.</p></div>
			<div className="grid gap-4 md:grid-cols-3"><div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"><FaXRay className="text-indigo-600" /><p className="mt-4 text-sm text-slate-500">Today&apos;s requests</p><p className="text-3xl font-semibold text-slate-800">24</p></div><div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"><FaFileMedical className="text-teal-600" /><p className="mt-4 text-sm text-slate-500">Reports to verify</p><p className="text-3xl font-semibold text-slate-800">7</p></div><div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">PACS status</p><p className="mt-2 text-3xl font-semibold text-teal-700">Online</p><p className="mt-1 text-xs text-slate-400">DICOM gateway connected</p></div></div>
			<div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4"><h3 className="font-semibold text-slate-800">Imaging worklist</h3></div><div className="divide-y divide-slate-100">{worklist.map(([id, patient, procedure, status]) => <div key={id} className="grid gap-2 px-5 py-4 sm:grid-cols-4 sm:items-center"><span className="font-medium text-slate-800">{id}</span><span className="text-sm text-slate-700">{patient}</span><span className="text-sm text-slate-600">{procedure}</span><span className="text-sm text-indigo-600">{status}</span></div>)}</div></div>
		</div>
	);
}

export default Radiology;
