const tests = [
  { patient: "John Doe", test: "Full Blood Count", requestedBy: "Dr. Amina", collected: "22 Jul, 09:10", status: "Completed", result: "Normal" },
  { patient: "Mary Smith", test: "Malaria Test", requestedBy: "Dr. Kamau", collected: "22 Jul, 10:00", status: "In progress", result: "Pending" },
  { patient: "Keino", test: "HIV Screening", requestedBy: "Dr. Wanjiku", collected: "22 Jul, 10:35", status: "Completed", result: "Review required" },
  { patient: "Peter", test: "Blood Glucose", requestedBy: "Dr. Otieno", collected: "22 Jul, 11:15", status: "Pending", result: "Not available" }
];

function Laboratory() {
  return <div className="space-y-6">
    <div><h2 className="text-2xl font-semibold text-slate-800">Laboratory</h2><p className="mt-1 text-sm text-slate-500">Registered patients and their laboratory test requests.</p></div>
    <div className="grid gap-4 sm:grid-cols-3">
      {[['Registered tests', tests.length], ['Completed', tests.filter((item) => item.status === 'Completed').length], ['Awaiting results', tests.filter((item) => item.status !== 'Completed').length]].map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-semibold text-slate-800">{value}</p></div>)}
    </div>
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="min-w-[720px] w-full text-left text-sm"><thead className="bg-slate-50 text-slate-600"><tr>{['Patient', 'Test', 'Requested by', 'Collected', 'Status', 'Result'].map((label) => <th key={label} className="px-4 py-3">{label}</th>)}</tr></thead><tbody>{tests.map((item) => <tr key={`${item.patient}-${item.test}`} className="border-t border-slate-200"><td className="px-4 py-3 font-medium text-slate-800">{item.patient}</td><td className="px-4 py-3">{item.test}</td><td className="px-4 py-3">{item.requestedBy}</td><td className="px-4 py-3">{item.collected}</td><td className="px-4 py-3">{item.status}</td><td className="px-4 py-3">{item.result}</td></tr>)}</tbody></table></div>
  </div>;
}

export default Laboratory;
