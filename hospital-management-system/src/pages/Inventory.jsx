import { medicalSupplies, medicines } from "../data/inventory";

const statusStyle = (status) => status === "In stock" ? "bg-emerald-100 text-emerald-700" : status === "Low stock" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700";

function InventoryTable({ title, items }) { return <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"><h3 className="text-lg font-semibold text-slate-800">{title}</h3><div className="mt-4 overflow-x-auto"><table className="min-w-[620px] w-full text-left text-sm"><thead className="border-b border-slate-200 text-slate-500"><tr><th className="pb-3">Item</th><th className="pb-3">Category</th><th className="pb-3">Stock</th><th className="pb-3">Status</th></tr></thead><tbody>{items.map((item) => <tr key={item.name} className="border-b border-slate-100"><td className="py-3 font-medium text-slate-800">{item.name}</td><td className="py-3">{item.category}</td><td className="py-3">{item.stock} {item.unit}</td><td className="py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle(item.status)}`}>{item.status}</span></td></tr>)}</tbody></table></div></section>; }

function Inventory() { return <div className="space-y-6"><div><h2 className="text-2xl font-semibold text-slate-800">Inventory</h2><p className="mt-1 text-sm text-slate-500">Medicine and medical material stock needed by the hospital.</p></div><InventoryTable title="Medicines" items={medicines} /><InventoryTable title="Medical supplies and materials" items={medicalSupplies} /></div>; }

export default Inventory;
