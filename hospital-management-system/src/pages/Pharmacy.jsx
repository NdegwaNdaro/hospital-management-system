import { medicines } from "../data/inventory";

function Pharmacy() {
  const totalStock = medicines.reduce((sum, item) => sum + item.stock, 0);
  const lowStockItems = medicines.filter((item) => item.status !== "In stock").length;

  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-slate-200/80 bg-gradient-to-br from-emerald-700 to-teal-600 p-6 text-white shadow-lg shadow-emerald-700/20 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-100">Pharmacy</p>
            <h2 className="mt-2 text-3xl font-semibold">Medicine inventory overview</h2>
            <p className="mt-3 max-w-2xl text-sm text-emerald-50/90 sm:text-base">
              Monitor available medicines, stock levels, and items that need urgent restocking.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-sm text-emerald-100">Items in stock</p>
            <p className="text-xl font-semibold">{totalStock} units</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total medicines</p>
          <p className="mt-3 text-3xl font-semibold text-slate-800">{medicines.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Low stock items</p>
          <p className="mt-3 text-3xl font-semibold text-slate-800">{lowStockItems}</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Status</p>
          <p className="mt-3 text-3xl font-semibold text-slate-800">Healthy</p>
        </div>
      </div>

      <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-800">Available medicines</h3>
            <p className="text-sm text-slate-500">Current inventory and availability status.</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Medicine</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Expiry</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {medicines.map((medicine) => (
                <tr key={medicine.name} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{medicine.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{medicine.category}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{medicine.stock} {medicine.unit}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{medicine.expiry}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        medicine.status === "In stock"
                          ? "bg-emerald-100 text-emerald-700"
                          : medicine.status === "Low stock"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {medicine.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Pharmacy;
