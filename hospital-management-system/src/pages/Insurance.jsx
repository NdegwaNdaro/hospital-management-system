import ResponsiveManagementForm from "../components/ResponsiveManagementForm";

export default function Insurance() {
  return <ResponsiveManagementForm title="Insurance Management" description="Capture insurance provider and claim details." buttonLabel="Save claim" fields={[{ name: "patient", label: "Patient name", required: true, placeholder: "Enter patient name" }, { name: "provider", label: "Insurance provider", required: true, placeholder: "Enter provider" }, { name: "policy", label: "Policy number", required: true, placeholder: "Enter policy number" }, { name: "claim", label: "Claim number", placeholder: "Enter claim number" }, { name: "status", label: "Claim status", options: ["Pending", "Approved", "Rejected"] }]} />;
}
