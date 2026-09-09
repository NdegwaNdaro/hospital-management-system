const bloodUnits = [
  { group: 'O+', units: 18, status: 'Available', lastDonation: '21 Jul 2026' },
  { group: 'A+', units: 12, status: 'Available', lastDonation: '20 Jul 2026' },
  { group: 'B+', units: 7, status: 'Low stock', lastDonation: '19 Jul 2026' },
  { group: 'AB+', units: 3, status: 'Critical', lastDonation: '18 Jul 2026' },
  { group: 'O-', units: 5, status: 'Low stock', lastDonation: '21 Jul 2026' }
];

function BloodBank() {
  return <div className="space-y-6"><div><h2 className="text-2xl font-semibold text-slate-800">Blood Bank</h2><p className="mt-1 text-sm text-slate-500">Available blood samples ready for matching and issue.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{bloodUnits.map((item) => <div key={item.group} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Blood group</p><p className="mt-1 text-3xl font-semibold text-rose-700">{item.group}</p><p className="mt-3 text-sm text-slate-600">{item.units} units</p><span className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${item.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : item.status === 'Low stock' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>{item.status}</span></div>)}</div><div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="min-w-[500px] w-full text-left text-sm"><thead className="bg-slate-50 text-slate-600"><tr><th className="px-4 py-3">Blood group</th><th className="px-4 py-3">Samples / units</th><th className="px-4 py-3">Last donation</th><th className="px-4 py-3">Availability</th></tr></thead><tbody>{bloodUnits.map((item) => <tr key={item.group} className="border-t border-slate-200"><td className="px-4 py-3 font-semibold text-slate-800">{item.group}</td><td className="px-4 py-3">{item.units}</td><td className="px-4 py-3">{item.lastDonation}</td><td className="px-4 py-3">{item.status}</td></tr>)}</tbody></table></div></div>;
}

export default BloodBank;
