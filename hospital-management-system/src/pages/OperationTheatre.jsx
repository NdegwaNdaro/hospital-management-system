import ResponsiveManagementForm from "../components/ResponsiveManagementForm";

export default function OperationTheatre() {
  return <ResponsiveManagementForm title="Operation Theatre" description="Schedule procedures and theatre teams." buttonLabel="Schedule surgery" fields={[{ name: "patient", label: "Patient name", required: true, placeholder: "Enter patient name" }, { name: "procedure", label: "Procedure", required: true, placeholder: "Enter procedure" }, { name: "surgeon", label: "Lead surgeon", required: true, placeholder: "Enter surgeon name" }, { name: "date", label: "Surgery date", type: "date", required: true }, { name: "theatre", label: "Theatre", options: ["Theatre 1", "Theatre 2", "Theatre 3"] }]} />;
}
