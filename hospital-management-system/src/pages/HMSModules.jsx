import { useState } from "react";
import { FaArrowRight, FaCheckCircle, FaSearch } from "react-icons/fa";

const modules = [
  ["Patient Management", "Registration, unique patient numbers, demographics, next-of-kin, duplicate detection, SHA and insurance, consent, portal, history, allergies, visits, communication and QR identification.", "Core"],
  ["Appointments & Queues", "Multi-clinic and provider calendars, walk-ins, digital queue numbers, triage queue, SMS reminders, waiting-time monitoring, availability, rescheduling and no-shows.", "Core"],
  ["Electronic Medical Records", "Clinical notes, SOAP, vitals, diagnosis, ICD-10, allergies, history, treatment plans, orders, nursing and progress notes, prescriptions, referrals and longitudinal timeline.", "Core"],
  ["OPD / Outpatient", "Triage, consultation, examination, procedures, prescriptions, laboratory and radiology requests, referrals, follow-ups and automatic billing from clinical services.", "Core"],
  ["Inpatient / Wards", "Admissions, bed allocation and availability, transfers, nursing documentation, rounds, MAR, care plans, discharge planning, mortality and occupancy reporting.", "Core"],
  ["Emergency / Casualty", "Emergency registration, priority triage, vitals, clinical notes, treatment, procedures, medication administration, investigations, admission, referral and billing.", "Core"],
  ["Laboratory (LIS)", "Test catalogue, ordering, barcode samples, tracking, rejection, workflow, results, verification, critical alerts, reports, patient access, inventory and quality control.", "Clinical"],
  ["Pharmacy", "Drug catalogue, prescriptions, dispensing, batch and expiry tracking, FEFO issuing, stock transfers, re-order levels, suppliers, returns, controlled drugs and sales.", "Clinical"],
  ["Radiology / Imaging", "Requests, scheduling, procedures, radiologist worklists, reporting, image storage, PACS and DICOM integration, structured reports linked to the EMR.", "Clinical"],
  ["Theatre / Operating Room", "Theatre and surgeon schedules, pre-operative assessment, surgical booking, anaesthesia, consumables, implants, post-operative notes, billing and utilization.", "Clinical"],
  ["Maternity & MCH", "Antenatal clinic, pregnancy history, EDD, risk assessment, ANC, ultrasound, delivery, labour monitoring, postnatal care, newborn records and immunization.", "Clinical"],
  ["SHA / Insurance", "SHA member and eligibility verification, pre-authorisation, electronic claims, rejection and resubmission, contracts, co-payments, benefits and reconciliation.", "Kenya"],
  ["Billing & Revenue Cycle", "Invoicing, service charging, cashier, credit and insurance billing, SHA billing, co-payments, discounts, deposits, refunds, credit notes and reconciliation.", "Finance"],
  ["M-Pesa Integration", "STK Push, Paybill and Till support, automatic payment confirmation, posting to patient accounts, reconciliation and transaction reporting.", "Kenya"],
  ["Finance & Accounting", "General ledger, receivables, payables, cash management, bank reconciliation, income statements, balance sheet, budgets, cost centres and audit trails.", "Finance"],
  ["Procurement & Inventory", "Suppliers, requisitions, purchase orders, goods received notes, invoices, medical supplies, transfers, stock counts, expiry tracking, approvals and valuation.", "Operations"],
  ["HR & Payroll", "Employee records, departments, roles, attendance, shifts, rostering, leave, payroll, PAYE, NSSF, SHIF requirements, allowances, deductions and payslips.", "Operations"],
  ["Assets & Equipment", "Medical equipment register, locations, depreciation, maintenance schedules, breakdowns, service history, warranties, calibration and disposal.", "Operations"],
  ["Reporting & Analytics", "Hospital KPIs, patient volumes, OPD, admissions, discharges, occupancy, length of stay, mortality, revenue, claims, pharmacy, lab, theatre and productivity.", "Insights"],
  ["Kenyan Integrations", "SHA, KHIS, DHIS2, KRA/eTIMS, HL7 FHIR, DICOM and other approved health-information exchange interfaces.", "Kenya"],
  ["Security & Compliance", "Role-based access, permissions, MFA, password policies, encryption, audit logs, consent, sessions, backups, disaster recovery, retention and secure APIs.", "Trust"],
  ["Interoperability & APIs", "REST APIs, FHIR, DICOM, laboratory, pharmacy, payment, SMS, email, mobile, insurance and government integrations with authentication and webhooks.", "Trust"],
  ["Mobile Applications", "Patient booking, records, results, prescriptions, payments, invoices, notifications, refills and communication, plus clinician scheduling and clinical workflows.", "Digital"],
  ["Offline Capability", "Continue registration, clinical, pharmacy and billing workflows during connectivity interruptions, then synchronize reliably when the connection returns.", "Kenya"],
  ["AI & Decision Support", "Assisted documentation, coding suggestions, interaction alerts, risk scoring, demand and bed forecasting, revenue-leak detection and predictive inventory.", "Future"]
];

const journey = ["Registration", "Triage", "Consultation", "Lab / Radiology", "Diagnosis", "Prescription", "Pharmacy", "Billing", "SHA / Insurance", "Discharge", "Follow-up"];
const filters = ["All", "Core", "Clinical", "Finance", "Operations", "Kenya", "Trust", "Digital", "Insights", "Future"];

function HMSModules() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const visibleModules = modules.filter(([title, description, category]) => {
    const matchesFilter = filter === "All" || category === filter;
    const text = `${title} ${description}`.toLowerCase();
    return matchesFilter && text.includes(query.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-slate-800 bg-slate-950 p-6 text-white shadow-xl sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Care Suite architecture</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">One patient journey. Every department connected.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">A Kenya-ready hospital management system spanning clinical care, revenue, operations, interoperability and patient access.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl font-semibold">25</p><p className="text-xs text-slate-300">Modules mapped</p></div>
            <div className="rounded-2xl bg-white/10 p-4"><p className="text-2xl font-semibold">5</p><p className="text-xs text-slate-300">Core priorities</p></div>
            <div className="rounded-2xl bg-cyan-400/20 p-4"><p className="text-2xl font-semibold text-cyan-200">FHIR</p><p className="text-xs text-cyan-100">Ready by design</p></div>
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Integrated care flow</p><h3 className="mt-1 text-lg font-semibold text-slate-800">The patient journey</h3></div><FaCheckCircle className="text-teal-500" /></div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">{journey.map((step, index) => <div key={step} className="flex shrink-0 items-center gap-2"><span className="rounded-full bg-teal-50 px-3 py-2 text-sm font-medium text-teal-800">{step}</span>{index < journey.length - 1 && <FaArrowRight className="text-slate-300" />}</div>)}</div>
      </section>

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div><h3 className="text-2xl font-semibold text-slate-800">Hospital capabilities</h3><p className="text-sm text-slate-500">The full operating model, organized for delivery in phases.</p></div>
        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-400 shadow-sm"><FaSearch /><input aria-label="Search modules" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search capabilities" className="w-full bg-transparent text-sm text-slate-700 outline-none sm:w-52" /></label>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">{filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${filter === item ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>{item}</button>)}</div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleModules.map(([title, description, category], index) => <article key={title} className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-start justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-500">{String(index + 1).padStart(2, "0")}</span><span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">{category}</span></div><h4 className="mt-4 text-lg font-semibold text-slate-800">{title}</h4><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></article>)}</div>
      {visibleModules.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">No capabilities match that search.</div>}
    </div>
  );
}

export default HMSModules;
