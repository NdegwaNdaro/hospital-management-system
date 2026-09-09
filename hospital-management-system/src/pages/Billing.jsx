import { useEffect, useMemo, useState } from "react";

function Billing() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState(null);
  const [message, setMessage] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadBilling = async () => {
      try {
        const response = await fetch("/api/billing");
        const data = await response.json();
        if (isMounted) {
          setBills(data);
          if (!selectedBill && data[0]) {
            setSelectedBill(data[0]);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBilling();
    const intervalId = window.setInterval(loadBilling, 5000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [selectedBill]);

  useEffect(() => {
    if (!selectedBill && bills[0]) {
      setSelectedBill(bills[0]);
    }
  }, [bills, selectedBill]);

  const summary = useMemo(() => {
    const pending = bills.filter((bill) => bill.status !== "Paid");
    const totalPending = pending.reduce((sum, bill) => sum + (bill.amount || 0), 0);
    const totalPaid = bills.filter((bill) => bill.status === "Paid").reduce((sum, bill) => sum + (bill.amount || 0), 0);

    return { pending, totalPending, totalPaid };
  }, [bills]);

  const handleMarkPaid = async (billId) => {
    try {
      const response = await fetch(`/api/billing/${billId}/pay`, {
        method: "POST"
      });
      const updatedBill = await response.json();

      if (response.ok) {
        setBills((currentBills) =>
          currentBills.map((bill) => (bill._id === billId ? updatedBill : bill))
        );
        setSelectedBill(updatedBill);
        setMessage(`${updatedBill.patientName}'s bill has been marked as paid.`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to update the payment status right now.");
    }
  };

  const handlePrint = (bill) => {
    setSelectedBill(bill);
    setContactNumber(bill.contactNumber || "");
    setMessage(`Preparing a payment request for ${bill.patientName}.`);
    window.setTimeout(() => window.print(), 200);
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0
    }).format(amount || 0);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Billing Desk</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-800">Manage invoices and collect payments live</h2>
            <p className="mt-2 text-sm text-slate-600">
              Billing data refreshes every few seconds, and each customer can receive a printable payment request.
            </p>
          </div>
          <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
            Live updates enabled
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Pending bills</p>
            <p className="mt-2 text-2xl font-semibold text-slate-800">{summary.pending.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Pending amount</p>
            <p className="mt-2 text-2xl font-semibold text-slate-800">{formatCurrency(summary.totalPending)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Paid amount</p>
            <p className="mt-2 text-2xl font-semibold text-slate-800">{formatCurrency(summary.totalPaid)}</p>
          </div>
        </div>
      </section>

      {message ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Recent billing records</h3>
            {loading ? <span className="text-sm text-slate-500">Loading...</span> : null}
          </div>

          <div className="mt-4 space-y-3">
            {bills.map((bill) => (
              <div key={bill._id} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-slate-800">{bill.patientName}</p>
                  <p className="text-sm text-slate-500">{formatCurrency(bill.amount)} • {bill.status}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handlePrint(bill)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Print request
                  </button>
                  {bill.status !== "Paid" ? (
                    <button
                      onClick={() => handleMarkPaid(bill._id)}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      Mark paid
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">Customer payment slip</h3>
          {selectedBill ? (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Invoice</p>
              <h4 className="mt-2 text-xl font-semibold text-slate-800">{selectedBill.patientName}</h4>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Amount due</span>
                  <span className="font-semibold text-slate-800">{formatCurrency(selectedBill.amount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <span className="font-semibold text-slate-800">{selectedBill.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Reference</span>
                  <span className="font-semibold text-slate-800">#{selectedBill._id?.slice(-6).toUpperCase()}</span>
                </div>
              </div>
              <div className="mt-4 space-y-3 rounded-lg border border-dashed border-slate-300 bg-white p-3 text-sm text-slate-600">
                <label className="block text-sm font-medium text-slate-700">
                  Customer phone number
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(event) => setContactNumber(event.target.value)}
                    placeholder="e.g. 0712 345 678"
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
                  />
                </label>
                <div className="rounded-lg bg-slate-50 p-3">
                  Please pay this bill at the front desk or through the hospital payment channel.
                </div>
              </div>
              <button
                onClick={() => handlePrint(selectedBill)}
                className="mt-4 rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
              >
                Print payment request
              </button>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No billing record selected.</p>
          )}
        </div>
      </div>

      <div className="hidden rounded-2xl border border-slate-200 bg-white p-8 print:block">
        {selectedBill ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Hospital payment request</p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-800">{selectedBill.patientName}</h2>
              </div>
              <div className="text-right text-sm text-slate-500">
                <p>Reference #{selectedBill._id?.slice(-6).toUpperCase()}</p>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Amount due</p>
              <p className="mt-2 text-3xl font-semibold text-slate-800">{formatCurrency(selectedBill.amount)}</p>
            </div>
            <p className="text-sm text-slate-600">
              Kindly settle this bill at the reception desk or through the hospital payment portal before the due date.
            </p>
            <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Payment instructions</p>
              <p className="mt-2">Present this slip to the billing desk or send proof of payment to support@hospital.local.</p>
              {contactNumber ? (
                <p className="mt-2 font-medium text-slate-800">Contact number: {contactNumber}</p>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Billing;