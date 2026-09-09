import ResponsiveManagementForm from "../components/ResponsiveManagementForm";

export default function Wards() {
  return <ResponsiveManagementForm title="Ward Management" description="Allocate beds and track ward occupancy." buttonLabel="Assign bed" fields={[{ name: "patient", label: "Patient name", required: true, placeholder: "Enter patient name" }, { name: "ward", label: "Ward", options: ["General Ward", "Maternity Ward", "Pediatric Ward"] }, { name: "bed", label: "Bed number", required: true, placeholder: "e.g. G-12" }, { name: "admissionDate", label: "Admission date", type: "date", required: true }, { name: "status", label: "Admission status", options: ["Admitted", "Transferred", "Discharged"] }]} />;
}
