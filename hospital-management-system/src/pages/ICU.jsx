import ResponsiveManagementForm from "../components/ResponsiveManagementForm";

export default function ICU() {
  return <ResponsiveManagementForm title="ICU Management" description="Record ICU admissions and bed allocation." buttonLabel="Save ICU admission" fields={[{ name: "patient", label: "Patient name", required: true, placeholder: "Enter patient name" }, { name: "bed", label: "ICU bed", options: ["ICU-01", "ICU-02", "ICU-03"] }, { name: "admissionDate", label: "Admission date", type: "date", required: true }, { name: "doctor", label: "Attending doctor", placeholder: "Enter doctor name" }, { name: "status", label: "Status", options: ["Critical", "Stable", "Discharged"] }]} />;
}
